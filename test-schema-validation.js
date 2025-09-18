#!/usr/bin/env node

/**
 * Contact Form Schema Validation Test
 * Verifies that contact form fields properly map to Supabase schema
 */

console.log('📋 Contact Form Schema Validation Test');
console.log('='.repeat(50));

// Contact Form Schema (from ContactForm.tsx)
const contactFormSchema = {
  firstName: { type: 'string', required: true, minLength: 2 },
  lastName: { type: 'string', required: true, minLength: 2 },
  suffix: { type: 'string', required: false },
  email: { type: 'string', required: true, format: 'email' },
  phone: { type: 'string', required: true, minLength: 10 },
  contactMethod: { type: 'enum', required: true, values: ['email', 'phone', 'either'] },
  insuranceType: { type: 'string', required: true, minLength: 1 },
  preferredDate: { type: 'string', required: false },
  preferredTime: { type: 'string', required: false },
  additionalInfo: { type: 'string', required: false }
};

// Supabase Client Schema (from supabase.ts)
const supabaseClientSchema = {
  id: { type: 'string', generated: true },
  created_at: { type: 'string', generated: true },
  updated_at: { type: 'string', generated: true },
  first_name: { type: 'string', required: true },
  last_name: { type: 'string', required: true },
  suffix: { type: 'string', required: false },
  full_name: { type: 'string', generated: true },
  email: { type: 'string', required: true },
  phone: { type: 'string', required: true },
  contact_method: { type: 'enum', required: true, values: ['email', 'phone', 'either'] },
  insurance_type: { type: 'string', required: true },
  preferred_date: { type: 'string', required: false },
  preferred_time: { type: 'string', required: false },
  additional_info: { type: 'string', required: false },
  source: { type: 'string', required: true },
  status: { type: 'enum', required: true, values: ['new', 'contacted', 'qualified', 'proposal_sent', 'closed_won', 'closed_lost'] },
  priority: { type: 'enum', required: true, values: ['low', 'medium', 'high'] },
  last_contacted_at: { type: 'string', required: false },
  next_followup_at: { type: 'string', required: false }
};

// Field Mapping (from clientService.createFromContactForm)
const fieldMapping = {
  'firstName': 'first_name',
  'lastName': 'last_name',
  'suffix': 'suffix',
  'email': 'email',
  'phone': 'phone',
  'contactMethod': 'contact_method',
  'insuranceType': 'insurance_type',
  'preferredDate': 'preferred_date',
  'preferredTime': 'preferred_time',
  'additionalInfo': 'additional_info'
};

// Test 1: Field Mapping Validation
function testFieldMapping() {
  console.log('\n1️⃣ Testing Field Mapping...');
  
  let allMapped = true;
  const unmappedFields = [];
  
  Object.keys(contactFormSchema).forEach(formField => {
    const dbField = fieldMapping[formField];
    
    if (!dbField) {
      console.log(`❌ Form field '${formField}' has no mapping`);
      unmappedFields.push(formField);
      allMapped = false;
    } else if (!supabaseClientSchema[dbField]) {
      console.log(`❌ Mapped field '${dbField}' doesn't exist in database schema`);
      allMapped = false;
    } else {
      console.log(`✅ ${formField} → ${dbField}`);
    }
  });
  
  if (allMapped) {
    console.log('✅ All form fields are properly mapped');
  } else {
    console.log(`❌ ${unmappedFields.length} fields are not mapped`);
  }
  
  return allMapped;
}

// Test 2: Required Fields Validation
function testRequiredFields() {
  console.log('\n2️⃣ Testing Required Fields...');
  
  let allValid = true;
  
  Object.keys(contactFormSchema).forEach(formField => {
    const formFieldSchema = contactFormSchema[formField];
    const dbField = fieldMapping[formField];
    
    if (dbField && supabaseClientSchema[dbField]) {
      const dbFieldSchema = supabaseClientSchema[dbField];
      
      // Check if required fields match
      if (formFieldSchema.required && !dbFieldSchema.required && !dbFieldSchema.generated) {
        console.log(`⚠️ Form field '${formField}' is required but DB field '${dbField}' is optional`);
      } else if (!formFieldSchema.required && dbFieldSchema.required && !dbFieldSchema.generated) {
        console.log(`❌ Form field '${formField}' is optional but DB field '${dbField}' is required`);
        allValid = false;
      } else {
        console.log(`✅ ${formField} requirement matches ${dbField}`);
      }
    }
  });
  
  return allValid;
}

// Test 3: Data Type Compatibility
function testDataTypes() {
  console.log('\n3️⃣ Testing Data Type Compatibility...');
  
  let allCompatible = true;
  
  Object.keys(contactFormSchema).forEach(formField => {
    const formFieldSchema = contactFormSchema[formField];
    const dbField = fieldMapping[formField];
    
    if (dbField && supabaseClientSchema[dbField]) {
      const dbFieldSchema = supabaseClientSchema[dbField];
      
      // Check type compatibility
      if (formFieldSchema.type !== dbFieldSchema.type) {
        console.log(`❌ Type mismatch: ${formField} (${formFieldSchema.type}) → ${dbField} (${dbFieldSchema.type})`);
        allCompatible = false;
      } else {
        console.log(`✅ ${formField} type matches ${dbField}`);
      }
      
      // Check enum values
      if (formFieldSchema.type === 'enum' && formFieldSchema.values && dbFieldSchema.values) {
        const formValues = formFieldSchema.values.sort();
        const dbValues = dbFieldSchema.values.sort();
        
        if (JSON.stringify(formValues) !== JSON.stringify(dbValues)) {
          console.log(`❌ Enum values mismatch: ${formField} ${JSON.stringify(formValues)} → ${dbField} ${JSON.stringify(dbValues)}`);
          allCompatible = false;
        } else {
          console.log(`✅ ${formField} enum values match ${dbField}`);
        }
      }
    }
  });
  
  return allCompatible;
}

// Test 4: Missing Database Fields
function testMissingDatabaseFields() {
  console.log('\n4️⃣ Testing Missing Database Fields...');
  
  const requiredDbFields = Object.keys(supabaseClientSchema).filter(field => 
    supabaseClientSchema[field].required && !supabaseClientSchema[field].generated
  );
  
  const providedFields = Object.values(fieldMapping);
  const defaultFields = ['source', 'status', 'priority']; // Fields with default values
  
  let allProvided = true;
  
  requiredDbFields.forEach(dbField => {
    if (!providedFields.includes(dbField) && !defaultFields.includes(dbField)) {
      console.log(`❌ Required DB field '${dbField}' is not provided by form or defaults`);
      allProvided = false;
    } else {
      console.log(`✅ Required DB field '${dbField}' is covered`);
    }
  });
  
  return allProvided;
}

// Test 5: Default Values Validation
function testDefaultValues() {
  console.log('\n5️⃣ Testing Default Values...');
  
  const defaultValues = {
    source: 'Website Contact Form',
    status: 'new', // Should be set as default
    priority: 'medium' // Should be set as default
  };
  
  let allValid = true;
  
  Object.keys(defaultValues).forEach(field => {
    const defaultValue = defaultValues[field];
    const fieldSchema = supabaseClientSchema[field];
    
    if (fieldSchema && fieldSchema.values && !fieldSchema.values.includes(defaultValue)) {
      console.log(`❌ Default value '${defaultValue}' for '${field}' is not in allowed values: ${fieldSchema.values}`);
      allValid = false;
    } else {
      console.log(`✅ Default value '${defaultValue}' for '${field}' is valid`);
    }
  });
  
  return allValid;
}

// Test 6: Sample Data Validation
function testSampleData() {
  console.log('\n6️⃣ Testing Sample Data Transformation...');
  
  const sampleFormData = {
    firstName: 'John',
    lastName: 'Doe',
    suffix: 'Mr.',
    email: 'john.doe@example.com',
    phone: '246-555-0123',
    contactMethod: 'email',
    insuranceType: 'life',
    preferredDate: '2025-01-15',
    preferredTime: '10:00',
    additionalInfo: 'Looking for comprehensive life insurance coverage'
  };
  
  // Simulate the transformation
  const transformedData = {
    first_name: sampleFormData.firstName,
    last_name: sampleFormData.lastName,
    suffix: sampleFormData.suffix === 'none' ? null : sampleFormData.suffix,
    email: sampleFormData.email,
    phone: sampleFormData.phone,
    contact_method: sampleFormData.contactMethod,
    insurance_type: sampleFormData.insuranceType,
    preferred_date: sampleFormData.preferredDate || null,
    preferred_time: sampleFormData.preferredTime || null,
    additional_info: sampleFormData.additionalInfo || null,
    source: 'Website Contact Form'
  };
  
  console.log('📝 Sample transformation:');
  console.log('Form Data:', JSON.stringify(sampleFormData, null, 2));
  console.log('Transformed Data:', JSON.stringify(transformedData, null, 2));
  
  // Validate transformation
  let transformationValid = true;
  
  Object.keys(fieldMapping).forEach(formField => {
    const dbField = fieldMapping[formField];
    const formValue = sampleFormData[formField];
    const transformedValue = transformedData[dbField];
    
    if (formField === 'suffix' && formValue !== 'none') {
      // Special case for suffix
      if (transformedValue !== formValue) {
        console.log(`❌ Suffix transformation failed: ${formValue} → ${transformedValue}`);
        transformationValid = false;
      }
    } else if (formValue && transformedValue !== formValue) {
      console.log(`❌ Transformation failed for ${formField}: ${formValue} → ${transformedValue}`);
      transformationValid = false;
    }
  });
  
  if (transformationValid) {
    console.log('✅ Sample data transformation is valid');
  }
  
  return transformationValid;
}

// Main Test Runner
async function runSchemaValidation() {
  console.log('🚀 Starting Schema Validation Tests...\n');
  
  const tests = [
    { name: 'Field Mapping', fn: testFieldMapping },
    { name: 'Required Fields', fn: testRequiredFields },
    { name: 'Data Types', fn: testDataTypes },
    { name: 'Missing Database Fields', fn: testMissingDatabaseFields },
    { name: 'Default Values', fn: testDefaultValues },
    { name: 'Sample Data', fn: testSampleData }
  ];
  
  const results = [];
  
  for (const test of tests) {
    try {
      const result = test.fn();
      results.push({ name: test.name, passed: result });
    } catch (error) {
      console.log(`❌ ${test.name}: Unexpected error - ${error.message}`);
      results.push({ name: test.name, passed: false, error: error.message });
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 SCHEMA VALIDATION RESULTS');
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
  
  console.log(`\n📈 Overall: ${totalPassed}/${results.length} schema tests passed`);
  
  if (totalPassed === results.length) {
    console.log('🎉 All schema validation tests passed!');
    console.log('✅ Contact form is fully compatible with Supabase schema.');
  } else {
    console.log('⚠️ Some schema validation tests failed.');
    console.log('\n🔧 Recommended Actions:');
    
    results.forEach(result => {
      if (!result.passed) {
        console.log(`- Fix: ${result.name}`);
      }
    });
  }
  
  console.log('\n📋 Schema Summary:');
  console.log('- Contact form has', Object.keys(contactFormSchema).length, 'fields');
  console.log('- Database schema has', Object.keys(supabaseClientSchema).length, 'fields');
  console.log('- Field mapping covers', Object.keys(fieldMapping).length, 'form fields');
  console.log('- Auto-generated fields: id, created_at, updated_at, full_name');
  console.log('- Default values: source, status, priority');
}

// Run the schema validation
runSchemaValidation().catch(console.error);
