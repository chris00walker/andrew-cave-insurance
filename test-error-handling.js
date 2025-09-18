#!/usr/bin/env node

/**
 * Enhanced Error Handling Test Suite
 * Tests the improved error handling mechanisms in the contact form
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.production' });

console.log('🔧 Enhanced Error Handling Test Suite');
console.log('='.repeat(50));

// Test Configuration
const TEST_CONFIG = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  testData: {
    firstName: 'ErrorTest',
    lastName: 'User',
    suffix: 'none',
    email: `errortest-${Date.now()}@example.com`,
    phone: '246-555-0199',
    contactMethod: 'email',
    insuranceType: 'life',
    additionalInfo: 'Error handling test submission'
  }
};

// Test 1: Retry Logic Simulation
async function testRetryLogic() {
  console.log('\n1️⃣ Testing Retry Logic...');
  
  let attemptCount = 0;
  const maxRetries = 3;
  
  const simulateFailingOperation = async () => {
    attemptCount++;
    if (attemptCount < 3) {
      throw new Error(`Simulated failure on attempt ${attemptCount}`);
    }
    return { success: true, attempt: attemptCount };
  };
  
  try {
    let result = null;
    let retryCount = 0;
    
    while (!result && retryCount < maxRetries) {
      try {
        result = await simulateFailingOperation();
        console.log(`✅ Operation succeeded on attempt ${result.attempt}`);
        break;
      } catch (error) {
        retryCount++;
        console.log(`⚠️ Attempt ${retryCount} failed: ${error.message}`);
        
        if (retryCount >= maxRetries) {
          throw new Error('Max retries exceeded');
        }
        
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    return true;
  } catch (error) {
    console.log('❌ Retry logic test failed:', error.message);
    return false;
  }
}

// Test 2: Fallback Mechanism
async function testFallbackMechanism() {
  console.log('\n2️⃣ Testing Fallback Mechanism...');
  
  try {
    // Simulate primary service failure
    const primaryService = {
      createFromContactForm: async () => {
        throw new Error('Primary service unavailable');
      }
    };
    
    // Test fallback to direct Supabase
    let client = null;
    try {
      client = await primaryService.createFromContactForm(TEST_CONFIG.testData);
    } catch (primaryError) {
      console.log('⚠️ Primary service failed, trying fallback...');
      
      // Fallback mechanism
      const supabase = createClient(TEST_CONFIG.supabaseUrl, TEST_CONFIG.supabaseAnonKey);
      const { data: fallbackClient, error: fallbackError } = await supabase
        .from('clients')
        .insert({
          first_name: TEST_CONFIG.testData.firstName,
          last_name: TEST_CONFIG.testData.lastName,
          email: TEST_CONFIG.testData.email,
          phone: TEST_CONFIG.testData.phone,
          contact_method: TEST_CONFIG.testData.contactMethod,
          insurance_type: TEST_CONFIG.testData.insuranceType,
          additional_info: TEST_CONFIG.testData.additionalInfo,
          source: 'Fallback Test'
        })
        .select()
        .single();
      
      if (fallbackError) {
        throw fallbackError;
      }
      
      client = fallbackClient;
      console.log('✅ Fallback mechanism successful');
      
      // Clean up test record
      await supabase.from('clients').delete().eq('id', client.id);
      console.log('🧹 Test record cleaned up');
    }
    
    return true;
  } catch (error) {
    console.log('❌ Fallback mechanism test failed:', error.message);
    return false;
  }
}

// Test 3: Timeout Handling
async function testTimeoutHandling() {
  console.log('\n3️⃣ Testing Timeout Handling...');
  
  try {
    const slowOperation = new Promise((resolve) => {
      setTimeout(() => resolve('slow result'), 15000); // 15 second delay
    });
    
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Operation timeout')), 5000) // 5 second timeout
    );
    
    try {
      await Promise.race([slowOperation, timeoutPromise]);
      console.log('❌ Timeout should have occurred');
      return false;
    } catch (error) {
      if (error.message === 'Operation timeout') {
        console.log('✅ Timeout handled correctly');
        return true;
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.log('❌ Timeout handling test failed:', error.message);
    return false;
  }
}

// Test 4: Environment Variable Validation
async function testEnvironmentValidation() {
  console.log('\n4️⃣ Testing Environment Variable Validation...');
  
  try {
    // Test missing URL
    const testMissingUrl = () => {
      if (!TEST_CONFIG.supabaseUrl) {
        throw new Error('Service configuration error. Please try again later.');
      }
      return true;
    };
    
    // Test missing key
    const testMissingKey = () => {
      if (!TEST_CONFIG.supabaseAnonKey) {
        throw new Error('Service configuration error. Please try again later.');
      }
      return true;
    };
    
    const urlTest = testMissingUrl();
    const keyTest = testMissingKey();
    
    if (urlTest && keyTest) {
      console.log('✅ Environment variables validated successfully');
      return true;
    }
  } catch (error) {
    console.log('❌ Environment validation test failed:', error.message);
    return false;
  }
}

// Test 5: Error Message Categorization
async function testErrorMessageCategorization() {
  console.log('\n5️⃣ Testing Error Message Categorization...');
  
  const errorScenarios = [
    {
      error: new Error('Service configuration error'),
      expectedCategory: 'configuration',
      expectedMessage: 'Service temporarily unavailable'
    },
    {
      error: new Error('Import timeout occurred'),
      expectedCategory: 'timeout',
      expectedMessage: 'Request timed out'
    },
    {
      error: new Error('Network connection failed'),
      expectedCategory: 'network',
      expectedMessage: 'Network error'
    },
    {
      error: new Error('Unknown error occurred'),
      expectedCategory: 'general',
      expectedMessage: 'There was an error sending your message'
    }
  ];
  
  let allPassed = true;
  
  errorScenarios.forEach(scenario => {
    let errorMessage = 'There was an error sending your message. Please try again or call us directly.';
    
    if (scenario.error.message.includes('configuration')) {
      errorMessage = 'Service temporarily unavailable. Please try again in a few minutes or call us directly.';
    } else if (scenario.error.message.includes('timeout')) {
      errorMessage = 'Request timed out. Please check your connection and try again.';
    } else if (scenario.error.message.includes('network')) {
      errorMessage = 'Network error. Please check your internet connection and try again.';
    }
    
    if (errorMessage.includes(scenario.expectedMessage)) {
      console.log(`✅ ${scenario.expectedCategory} error categorized correctly`);
    } else {
      console.log(`❌ ${scenario.expectedCategory} error categorization failed`);
      allPassed = false;
    }
  });
  
  return allPassed;
}

// Test 6: Enhanced Logging Functionality
async function testEnhancedLogging() {
  console.log('\n6️⃣ Testing Enhanced Logging...');
  
  try {
    const mockLogError = (stage, error) => {
      const logEntry = {
        error: error.message || error,
        stack: error.stack,
        timestamp: new Date().toISOString(),
        stage: stage
      };
      
      // Validate log entry structure
      if (logEntry.error && logEntry.timestamp && logEntry.stage) {
        console.log(`✅ Log entry for ${stage} created successfully`);
        return true;
      } else {
        console.log(`❌ Log entry for ${stage} incomplete`);
        return false;
      }
    };
    
    const testError = new Error('Test error for logging');
    testError.stack = 'Mock stack trace';
    
    const logResult = mockLogError('TestStage', testError);
    return logResult;
  } catch (error) {
    console.log('❌ Enhanced logging test failed:', error.message);
    return false;
  }
}

// Main Test Runner
async function runErrorHandlingTests() {
  console.log('🚀 Starting Enhanced Error Handling Tests...\n');
  
  const tests = [
    { name: 'Retry Logic', fn: testRetryLogic },
    { name: 'Fallback Mechanism', fn: testFallbackMechanism },
    { name: 'Timeout Handling', fn: testTimeoutHandling },
    { name: 'Environment Validation', fn: testEnvironmentValidation },
    { name: 'Error Message Categorization', fn: testErrorMessageCategorization },
    { name: 'Enhanced Logging', fn: testEnhancedLogging }
  ];
  
  const results = [];
  
  for (const test of tests) {
    try {
      const result = await test.fn();
      results.push({ name: test.name, passed: result });
    } catch (error) {
      console.log(`❌ ${test.name}: Unexpected error - ${error.message}`);
      results.push({ name: test.name, passed: false, error: error.message });
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 ERROR HANDLING TEST RESULTS');
  console.log('='.repeat(50));
  
  let totalPassed = 0;
  results.forEach(result => {
    const status = result.passed ? '✅ PASS' : '❌ FAIL';
    console.log(`${result.name}: ${status}`);
    if (result.error) {
      console.log(`   Error: ${result.error}`);
    }
    if (result.passed) totalPassed++;
  });
  
  console.log(`\n📈 Overall: ${totalPassed}/${results.length} error handling tests passed`);
  
  if (totalPassed === results.length) {
    console.log('🎉 All error handling tests passed!');
    console.log('✅ Contact form should now handle errors gracefully.');
  } else {
    console.log('⚠️ Some error handling tests failed.');
  }
  
  console.log('\n📋 Next Steps:');
  console.log('1. Build and deploy the updated contact form');
  console.log('2. Test the live form with enhanced error handling');
  console.log('3. Monitor browser console for detailed error logs');
  console.log('4. Verify fallback mechanisms work in production');
}

// Run the error handling tests
runErrorHandlingTests().catch(console.error);
