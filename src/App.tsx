import React from 'react';
import FactFindForm from './components/questionnaire/FactFindForm';
import { ToastProvider } from './components/ui/toast-provider';
import { Toaster } from "./components/ui/sonner";

export default function App() {
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
    <ToastProvider>
      <div className="min-h-screen bg-gray-50">
        <FactFindForm 
          onComplete={handleFormComplete}
          // Optional: You can test with initial data
          // initialData={{
          //   clientName: "Test Client",
          //   email: "test@example.com"
          // }}
        />
        <Toaster />
      </div>
    </ToastProvider>
  );
}