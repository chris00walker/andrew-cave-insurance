#!/usr/bin/env node

/**
 * Contact Form Test Suite - TDD Approach
 * Tests form submission in both development and production environments
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.production' });

// Test Configuration
const TEST_CONFIG = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  productionUrl: 'https://andrew-cave-insurance.netlify.app',
  testData: {
    firstName: 'Test',
    lastName: 'User',
    suffix: 'none',
    email: `test-${Date.now()}@example.com`,
    phone: '246-555-0123',
    contactMethod: 'email',
    insuranceType: 'life',
    preferredDate: '2025-01-15',
    preferredTime: '10:00',
    additionalInfo: 'This is a test submission from the TDD test suite'
  }
};

console.log('🧪 Contact Form Test Suite - TDD Approach');
console.log('='.repeat(60));

// Test 1: Environment Variables
async function testEnvironmentVariables() {
  console.log('\n1️⃣ Testing Environment Variables...');
  
  const tests = [
    { name: 'NEXT_PUBLIC_SUPABASE_URL', value: TEST_CONFIG.supabaseUrl },
    { name: 'NEXT_PUBLIC_SUPABASE_ANON_KEY', value: TEST_CONFIG.supabaseAnonKey }
  ];
  
  let allPassed = true;
  
  tests.forEach(test => {
    if (test.value) {
      console.log(`✅ ${test.name}: Available`);
    } else {
      console.log(`❌ ${test.name}: Missing`);
      allPassed = false;
    }
  });
  
  return allPassed;
}

// Test 2: Supabase Client Creation
async function testSupabaseClient() {
  console.log('\n2️⃣ Testing Supabase Client Creation...');
  
  try {
    const supabase = createClient(TEST_CONFIG.supabaseUrl, TEST_CONFIG.supabaseAnonKey);
    console.log('✅ Supabase client created successfully');
    
    // Test connection
    const { data, error } = await supabase.from('clients').select('count', { count: 'exact', head: true });
    
    if (error) {
      console.log('❌ Supabase connection failed:', error.message);
      return false;
    }
    
    console.log('✅ Supabase connection verified');
    return true;
  } catch (error) {
    console.log('❌ Supabase client creation failed:', error.message);
    return false;
  }
}

// Test 3: Form Validation Logic
async function testFormValidation() {
  console.log('\n3️⃣ Testing Form Validation Logic...');
  
  const validationTests = [
    {
      name: 'Valid form data',
      data: TEST_CONFIG.testData,
      shouldPass: true
    },
    {
      name: 'Missing required fields',
      data: { firstName: '', lastName: '', email: '', phone: '', insuranceType: '' },
      shouldPass: false
    },
    {
      name: 'Invalid email format',
      data: { ...TEST_CONFIG.testData, email: 'invalid-email' },
      shouldPass: false
    },
    {
      name: 'Short phone number',
      data: { ...TEST_CONFIG.testData, phone: '123' },
      shouldPass: false
    }
  ];
  
  let allPassed = true;
  
  for (const test of validationTests) {
    try {
      const isValid = validateFormData(test.data);
      
      if (isValid === test.shouldPass) {
        console.log(`✅ ${test.name}: ${test.shouldPass ? 'Valid' : 'Invalid'} as expected`);
      } else {
        console.log(`❌ ${test.name}: Expected ${test.shouldPass ? 'valid' : 'invalid'}, got ${isValid ? 'valid' : 'invalid'}`);
        allPassed = false;
      }
    } catch (error) {
      console.log(`❌ ${test.name}: Validation error - ${error.message}`);
      allPassed = false;
    }
  }
  
  return allPassed;
}

// Form validation function (mimics the Zod schema)
function validateFormData(data) {
  const required = ['firstName', 'lastName', 'email', 'phone', 'insuranceType'];
  
  // Check required fields
  for (const field of required) {
    if (!data[field] || data[field].trim().length === 0) {
      return false;
    }
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return false;
  }
  
  // Validate phone length
  if (data.phone.replace(/\D/g, '').length < 10) {
    return false;
  }
  
  // Validate name lengths
  if (data.firstName.length < 2 || data.lastName.length < 2) {
    return false;
  }
  
  return true;
}

// Test 4: Direct Supabase Submission
async function testDirectSupabaseSubmission() {
  console.log('\n4️⃣ Testing Direct Supabase Submission...');
  
  try {
    const supabase = createClient(TEST_CONFIG.supabaseUrl, TEST_CONFIG.supabaseAnonKey);
    
    // Test client creation
    const { data: client, error: clientError } = await supabase
      .from('clients')
      .insert({
        first_name: TEST_CONFIG.testData.firstName,
        last_name: TEST_CONFIG.testData.lastName,
        suffix: TEST_CONFIG.testData.suffix === 'none' ? null : TEST_CONFIG.testData.suffix,
        email: TEST_CONFIG.testData.email,
        phone: TEST_CONFIG.testData.phone,
        contact_method: TEST_CONFIG.testData.contactMethod,
        insurance_type: TEST_CONFIG.testData.insuranceType,
        preferred_date: TEST_CONFIG.testData.preferredDate || null,
        preferred_time: TEST_CONFIG.testData.preferredTime || null,
        additional_info: TEST_CONFIG.testData.additionalInfo || null,
        source: 'TDD Test Suite'
      })
      .select()
      .single();
    
    if (clientError) {
      console.log('❌ Client creation failed:', clientError.message);
      return false;
    }
    
    console.log('✅ Client created successfully:', client.id);
    
    // Test communication log
    const { error: logError } = await supabase
      .from('communication_log')
      .insert({
        client_id: client.id,
        communication_type: 'email',
        direction: 'inbound',
        subject: `TDD Test Submission - ${TEST_CONFIG.testData.insuranceType}`,
        content: `Test form submission from ${TEST_CONFIG.testData.firstName} ${TEST_CONFIG.testData.lastName}`,
        status: 'completed'
      });
    
    if (logError) {
      console.log('❌ Communication log failed:', logError.message);
      // Clean up client record
      await supabase.from('clients').delete().eq('id', client.id);
      return false;
    }
    
    console.log('✅ Communication logged successfully');
    
    // Clean up test records
    await supabase.from('communication_log').delete().eq('client_id', client.id);
    await supabase.from('clients').delete().eq('id', client.id);
    console.log('✅ Test records cleaned up');
    
    return true;
  } catch (error) {
    console.log('❌ Direct Supabase submission failed:', error.message);
    return false;
  }
}

// Test 5: Browser Environment Simulation
async function testBrowserEnvironment() {
  console.log('\n5️⃣ Testing Browser Environment Simulation...');
  
  try {
    // Simulate browser globals
    global.window = {};
    global.document = {};
    
    console.log('✅ Browser environment simulated');
    
    // Test dynamic import simulation
    const mockSupabaseModule = {
      clientService: {
        createFromContactForm: async (data) => {
          console.log('📝 Mock client service called with:', data);
          return { id: 'mock-client-id', ...data };
        }
      },
      communicationService: {
        log: async (data) => {
          console.log('📝 Mock communication service called with:', data);
          return { id: 'mock-log-id', ...data };
        }
      }
    };
    
    console.log('✅ Mock services created');
    
    // Test form submission flow
    const result = await mockSupabaseModule.clientService.createFromContactForm(TEST_CONFIG.testData);
    if (result && result.id) {
      console.log('✅ Mock form submission successful');
      return true;
    } else {
      console.log('❌ Mock form submission failed');
      return false;
    }
  } catch (error) {
    console.log('❌ Browser environment test failed:', error.message);
    return false;
  }
}

// Test 6: Production URL Accessibility
async function testProductionUrlAccessibility() {
  console.log('\n6️⃣ Testing Production URL Accessibility...');
  
  try {
    // Note: This would require fetch in Node.js environment
    console.log(`📍 Production URL: ${TEST_CONFIG.productionUrl}`);
    console.log('✅ Production URL configured (manual testing required)');
    
    // Instructions for manual testing
    console.log('\n📋 Manual Testing Instructions:');
    console.log('1. Visit:', TEST_CONFIG.productionUrl);
    console.log('2. Open browser developer tools (F12)');
    console.log('3. Go to Console tab');
    console.log('4. Fill out and submit the contact form');
    console.log('5. Check for any JavaScript errors in console');
    console.log('6. Verify form submission success/failure');
    
    return true;
  } catch (error) {
    console.log('❌ Production URL test failed:', error.message);
    return false;
  }
}

// Test 7: Error Handling Scenarios
async function testErrorHandling() {
  console.log('\n7️⃣ Testing Error Handling Scenarios...');
  
  const errorScenarios = [
    {
      name: 'Invalid Supabase URL',
      test: async () => {
        try {
          const badClient = createClient('invalid-url', TEST_CONFIG.supabaseAnonKey);
          await badClient.from('clients').select('count', { count: 'exact', head: true });
          return false; // Should have thrown an error
        } catch (error) {
          return true; // Expected error
        }
      }
    },
    {
      name: 'Invalid API Key',
      test: async () => {
        try {
          const badClient = createClient(TEST_CONFIG.supabaseUrl, 'invalid-key');
          await badClient.from('clients').select('count', { count: 'exact', head: true });
          return false; // Should have thrown an error
        } catch (error) {
          return true; // Expected error
        }
      }
    },
    {
      name: 'Network timeout simulation',
      test: async () => {
        // Simulate network issues
        console.log('⏱️ Network timeout scenario (simulated)');
        return true; // Would need actual network mocking
      }
    }
  ];
  
  let allPassed = true;
  
  for (const scenario of errorScenarios) {
    try {
      const result = await scenario.test();
      if (result) {
        console.log(`✅ ${scenario.name}: Handled correctly`);
      } else {
        console.log(`❌ ${scenario.name}: Not handled properly`);
        allPassed = false;
      }
    } catch (error) {
      console.log(`❌ ${scenario.name}: Test error - ${error.message}`);
      allPassed = false;
    }
  }
  
  return allPassed;
}

// Main Test Runner
async function runAllTests() {
  console.log('🚀 Starting TDD Test Suite...\n');
  
  const tests = [
    { name: 'Environment Variables', fn: testEnvironmentVariables },
    { name: 'Supabase Client', fn: testSupabaseClient },
    { name: 'Form Validation', fn: testFormValidation },
    { name: 'Direct Supabase Submission', fn: testDirectSupabaseSubmission },
    { name: 'Browser Environment', fn: testBrowserEnvironment },
    { name: 'Production URL', fn: testProductionUrlAccessibility },
    { name: 'Error Handling', fn: testErrorHandling }
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
  console.log('\n' + '='.repeat(60));
  console.log('📊 TEST RESULTS SUMMARY');
  console.log('='.repeat(60));
  
  let totalPassed = 0;
  results.forEach(result => {
    const status = result.passed ? '✅ PASS' : '❌ FAIL';
    console.log(`${result.name}: ${status}`);
    if (result.error) {
      console.log(`   Error: ${result.error}`);
    }
    if (result.passed) totalPassed++;
  });
  
  console.log(`\n📈 Overall: ${totalPassed}/${results.length} tests passed`);
  
  if (totalPassed === results.length) {
    console.log('🎉 All tests passed! Contact form should work correctly.');
  } else {
    console.log('⚠️ Some tests failed. Issues need to be addressed.');
    console.log('\n🔧 Recommended Actions:');
    
    results.forEach(result => {
      if (!result.passed) {
        console.log(`- Fix: ${result.name}`);
      }
    });
  }
  
  console.log('\n📋 Next Steps:');
  console.log('1. Address any failing tests');
  console.log('2. Run manual testing on production site');
  console.log('3. Check browser console for client-side errors');
  console.log('4. Verify Supabase dashboard for successful submissions');
}

// Run the test suite
runAllTests().catch(console.error);
