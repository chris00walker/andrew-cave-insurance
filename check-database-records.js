#!/usr/bin/env node

/**
 * Database Records Check
 * Verifies if contact form submissions are being stored in Supabase
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.production' });

console.log('🔍 Checking Supabase Database Records');
console.log('='.repeat(50));

// Configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkDatabaseRecords() {
  try {
    console.log('🔌 Connecting to Supabase...');
    
    // Check clients table
    console.log('\n📋 Checking clients table...');
    const { data: clients, error: clientsError, count: clientsCount } = await supabase
      .from('clients')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .limit(10);
    
    if (clientsError) {
      console.error('❌ Error fetching clients:', clientsError.message);
      return false;
    }
    
    console.log(`📊 Total clients in database: ${clientsCount}`);
    
    if (clients && clients.length > 0) {
      console.log('\n📝 Recent client records:');
      clients.forEach((client, index) => {
        console.log(`${index + 1}. ${client.first_name} ${client.last_name}`);
        console.log(`   Email: ${client.email}`);
        console.log(`   Source: ${client.source}`);
        console.log(`   Created: ${new Date(client.created_at).toLocaleString()}`);
        console.log(`   Insurance Type: ${client.insurance_type}`);
        console.log('   ---');
      });
      
      // Check for website contact form submissions specifically
      const { data: websiteClients, count: websiteCount } = await supabase
        .from('clients')
        .select('*', { count: 'exact' })
        .ilike('source', '%Website%')
        .order('created_at', { ascending: false });
      
      console.log(`\n🌐 Website contact form submissions: ${websiteCount}`);
      
      if (websiteClients && websiteClients.length > 0) {
        console.log('\n📱 Recent website submissions:');
        websiteClients.slice(0, 5).forEach((client, index) => {
          console.log(`${index + 1}. ${client.first_name} ${client.last_name} (${client.email})`);
          console.log(`   Submitted: ${new Date(client.created_at).toLocaleString()}`);
          console.log(`   Insurance Interest: ${client.insurance_type}`);
          if (client.additional_info) {
            console.log(`   Additional Info: ${client.additional_info.substring(0, 100)}...`);
          }
          console.log('   ---');
        });
      } else {
        console.log('⚠️ No website contact form submissions found');
      }
    } else {
      console.log('⚠️ No client records found in database');
    }
    
    // Check communication_log table
    console.log('\n📞 Checking communication_log table...');
    const { data: communications, error: commError, count: commCount } = await supabase
      .from('communication_log')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .limit(5);
    
    if (commError) {
      console.error('❌ Error fetching communications:', commError.message);
    } else {
      console.log(`📊 Total communication logs: ${commCount}`);
      
      if (communications && communications.length > 0) {
        console.log('\n📨 Recent communication logs:');
        communications.forEach((comm, index) => {
          console.log(`${index + 1}. ${comm.subject}`);
          console.log(`   Type: ${comm.communication_type} (${comm.direction})`);
          console.log(`   Created: ${new Date(comm.created_at).toLocaleString()}`);
          console.log(`   Status: ${comm.status}`);
          console.log('   ---');
        });
      } else {
        console.log('⚠️ No communication logs found');
      }
    }
    
    // Check for recent submissions (last 24 hours)
    console.log('\n⏰ Checking recent submissions (last 24 hours)...');
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    const { data: recentClients, count: recentCount } = await supabase
      .from('clients')
      .select('*', { count: 'exact' })
      .gte('created_at', yesterday.toISOString())
      .order('created_at', { ascending: false });
    
    console.log(`📅 Submissions in last 24 hours: ${recentCount}`);
    
    if (recentClients && recentClients.length > 0) {
      console.log('\n🆕 Recent submissions:');
      recentClients.forEach((client, index) => {
        const timeDiff = new Date() - new Date(client.created_at);
        const hoursAgo = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutesAgo = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        
        console.log(`${index + 1}. ${client.first_name} ${client.last_name}`);
        console.log(`   Submitted: ${hoursAgo}h ${minutesAgo}m ago`);
        console.log(`   Source: ${client.source}`);
        console.log('   ---');
      });
    } else {
      console.log('📭 No submissions in the last 24 hours');
    }
    
    // Test database write capability
    console.log('\n🧪 Testing database write capability...');
    const testClient = {
      first_name: 'Database',
      last_name: 'Test',
      email: `dbtest-${Date.now()}@example.com`,
      phone: '246-555-0199',
      contact_method: 'email',
      insurance_type: 'Database Test',
      source: 'Database Check Script'
    };
    
    const { data: newClient, error: insertError } = await supabase
      .from('clients')
      .insert(testClient)
      .select()
      .single();
    
    if (insertError) {
      console.error('❌ Database write test failed:', insertError.message);
      return false;
    } else {
      console.log('✅ Database write test successful');
      console.log(`   Created test record with ID: ${newClient.id}`);
      
      // Clean up test record
      await supabase.from('clients').delete().eq('id', newClient.id);
      console.log('🧹 Test record cleaned up');
    }
    
    return true;
    
  } catch (error) {
    console.error('❌ Database check failed:', error.message);
    return false;
  }
}

async function checkTableStructure() {
  console.log('\n🏗️ Checking table structure...');
  
  try {
    // Get table info (this might not work with RLS, but worth trying)
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .limit(1);
    
    if (error) {
      console.log('⚠️ Cannot inspect table structure directly (RLS enabled)');
      console.log('   This is normal for production databases');
    } else if (data && data.length > 0) {
      console.log('✅ Table structure accessible');
      console.log('📋 Available columns:', Object.keys(data[0]).join(', '));
    } else {
      console.log('📋 Table exists but is empty');
    }
  } catch (error) {
    console.log('⚠️ Table structure check failed:', error.message);
  }
}

// Main execution
async function main() {
  console.log('🚀 Starting database records check...\n');
  
  const success = await checkDatabaseRecords();
  await checkTableStructure();
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 DATABASE CHECK SUMMARY');
  console.log('='.repeat(50));
  
  if (success) {
    console.log('✅ Database connection: Working');
    console.log('✅ Write capability: Functional');
    console.log('✅ Data retrieval: Successful');
  } else {
    console.log('❌ Database check: Failed');
  }
  
  console.log('\n📋 Next Steps:');
  console.log('1. Check if recent form submissions appear in the database');
  console.log('2. If no recent submissions, test the live contact form');
  console.log('3. Monitor browser console for submission errors');
  console.log('4. Verify Supabase dashboard for real-time data');
  
  console.log('\n🔗 Supabase Dashboard:');
  console.log(`   ${supabaseUrl.replace('/rest/v1', '')}/project/default/editor`);
}

main().catch(console.error);
