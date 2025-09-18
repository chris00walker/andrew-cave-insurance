import React from 'react';
import FactFindForm from '@/components/questionnaire/FactFindForm';

export default function QuestionnairePage() {
  const handleFormComplete = (data: any) => {
    console.log('✅ Form completed successfully!');
    console.log('📊 Form data:', data);
    
    // Here you would typically:
    // 1. Send data to your API
    // 2. Redirect to a thank you page
    // 3. Show a success message
    alert('Form submitted successfully! Check the console for the data.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <FactFindForm 
        onComplete={handleFormComplete}
        // Optional: You can test with initial data
        // initialData={{
        //   clientName: "Test Client",
        //   email: "test@example.com"
        // }}
      />
    </div>
  );
}

export const metadata = {
  title: 'Insurance Questionnaire - Andrew Cave Insurance',
  description: 'Complete your insurance fact-finding questionnaire to get personalized recommendations.',
};
