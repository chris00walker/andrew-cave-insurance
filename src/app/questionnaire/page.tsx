import React from 'react';
import FactFindForm from '@/components/questionnaire/FactFindForm';

export default function QuestionnairePage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <FactFindForm 
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
