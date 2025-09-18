#!/usr/bin/env node

/**
 * Supabase Connection Test Script
 * Tests database connectivity and basic operations for Andrew Cave Insurance
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.production' });

// Configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('🔍 Andrew Cave Insurance - Supabase Connection Test');
console.log('='.repeat(60));

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Missing Supabase environment variables');
    console.log('Required variables:');
    console.log('- NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
    console.log('- NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ Set' : '❌ Missing');
    process.exit(1);
}

console.log('✅ Environment variables loaded');
console.log(`📍 Supabase URL: ${supabaseUrl}`);
console.log(`🔑 Anon Key: ${supabaseAnonKey.substring(0, 20)}...`);
console.log('');

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
    console.log('🔌 Testing Supabase Connection...');

    try {
        // Test 1: Basic connection test
        console.log('1️⃣ Testing basic connection...');
        const { data, error } = await supabase
            .from('clients')
            .select('count', { count: 'exact', head: true });

        if (error) {
            console.error('❌ Connection failed:', error.message);
            return false;
        }

        console.log('✅ Connection successful!');
        console.log(`📊 Total clients in database: ${data || 0}`);

        // Test 2: Check table structure
        console.log('\n2️⃣ Checking table structure...');
        const tables = ['clients', 'client_questionnaires', 'appointments', 'communication_log'];

        for (const table of tables) {
            try {
                const { error: tableError } = await supabase
                    .from(table)
                    .select('*', { count: 'exact', head: true });

                if (tableError) {
                    console.log(`❌ Table '${table}': ${tableError.message}`);
                } else {
                    console.log(`✅ Table '${table}': Accessible`);
                }
            } catch (err) {
                console.log(`❌ Table '${table}': ${err.message}`);
            }
        }

        // Test 3: Test insert operation (with rollback)
        console.log('\n3️⃣ Testing write operations...');
        const testClient = {
            first_name: 'Test',
            last_name: 'Connection',
            email: `test-${Date.now()}@example.com`,
            phone: '555-0123',
            contact_method: 'email',
            insurance_type: 'Connection Test',
            source: 'Connection Test Script'
        };

        const { data: insertData, error: insertError } = await supabase
            .from('clients')
            .insert(testClient)
            .select()
            .single();

        if (insertError) {
            console.log('❌ Insert test failed:', insertError.message);
        } else {
            console.log('✅ Insert test successful');

            // Clean up test record
            const { error: deleteError } = await supabase
                .from('clients')
                .delete()
                .eq('id', insertData.id);

            if (deleteError) {
                console.log('⚠️ Cleanup warning:', deleteError.message);
            } else {
                console.log('🧹 Test record cleaned up');
            }
        }

        // Test 4: Test real-time capabilities
        console.log('\n4️⃣ Testing real-time capabilities...');
        try {
            const channel = supabase.channel('test-channel');
            console.log('✅ Real-time channel created successfully');
            await supabase.removeChannel(channel);
            console.log('✅ Real-time channel removed successfully');
        } catch (realtimeError) {
            console.log('❌ Real-time test failed:', realtimeError.message);
        }

        return true;

    } catch (error) {
        console.error('❌ Unexpected error:', error);
        return false;
    }
}

async function testFormSubmission() {
    console.log('\n📝 Testing Form Submission Flow...');

    try {
        // Simulate contact form submission
        const mockFormData = {
            firstName: 'John',
            lastName: 'TestUser',
            email: `test-form-${Date.now()}@example.com`,
            phone: '555-0199',
            contactMethod: 'email',
            insuranceType: 'Life Insurance',
            additionalInfo: 'This is a connection test'
        };

        console.log('📤 Submitting test contact form...');
        const { data: client, error } = await supabase
            .from('clients')
            .insert({
                first_name: mockFormData.firstName,
                last_name: mockFormData.lastName,
                email: mockFormData.email,
                phone: mockFormData.phone,
                contact_method: mockFormData.contactMethod,
                insurance_type: mockFormData.insuranceType,
                additional_info: mockFormData.additionalInfo,
                source: 'Website Contact Form Test'
            })
            .select()
            .single();

        if (error) {
            console.log('❌ Form submission failed:', error.message);
            return false;
        }

        console.log('✅ Contact form submission successful');
        console.log(`👤 Created client ID: ${client.id}`);

        // Test questionnaire submission
        console.log('📋 Testing questionnaire submission...');
        const { data: questionnaire, error: qError } = await supabase
            .from('client_questionnaires')
            .insert({
                client_id: client.id,
                marital_status: 'single',
                number_of_dependents: 0,
                occupation: 'Software Developer',
                annual_income: 75000,
                has_life_insurance: false,
                smoker: false,
                completed_at: new Date().toISOString()
            })
            .select()
            .single();

        if (qError) {
            console.log('❌ Questionnaire submission failed:', qError.message);
        } else {
            console.log('✅ Questionnaire submission successful');
            console.log(`📋 Created questionnaire ID: ${questionnaire.id}`);
        }

        // Clean up test records
        console.log('🧹 Cleaning up test records...');
        if (questionnaire) {
            await supabase.from('client_questionnaires').delete().eq('id', questionnaire.id);
        }
        await supabase.from('clients').delete().eq('id', client.id);
        console.log('✅ Test records cleaned up');

        return true;

    } catch (error) {
        console.error('❌ Form submission test failed:', error);
        return false;
    }
}

async function runAllTests() {
    console.log('🚀 Starting comprehensive Supabase tests...\n');

    const connectionTest = await testConnection();
    const formTest = await testFormSubmission();

    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST RESULTS SUMMARY');
    console.log('='.repeat(60));
    console.log(`🔌 Database Connection: ${connectionTest ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`📝 Form Submission: ${formTest ? '✅ PASS' : '❌ FAIL'}`);

    if (connectionTest && formTest) {
        console.log('\n🎉 All tests passed! Supabase integration is working correctly.');
        console.log('✅ Your production deployment should work properly.');
    } else {
        console.log('\n⚠️ Some tests failed. Please check the errors above.');
        console.log('❌ You may need to fix configuration before production use.');
    }

    console.log('\n📋 Next Steps:');
    console.log('1. Visit your live site: https://andrew-cave-insurance.netlify.app');
    console.log('2. Test the contact form and questionnaire manually');
    console.log('3. Check Supabase dashboard for new records');
    console.log('4. Monitor the browser console for any client-side errors');
}

// Run the tests
runAllTests().catch(console.error);
