import { useState } from 'react';
import { FormHeader } from './components/form-header';
import { FormNavigation } from './components/form-navigation';
import { ImportantNoticeSection } from './components/form-sections/important-notice';
import { ApplicationTypeSection } from './components/form-sections/application-type';
import { PersonalInformationSection } from './components/form-sections/personal-information';
import { OtherIncomeSection } from './components/form-sections/other-income';
import { FamilyDetailsSection } from './components/form-sections/family-details';
import { ExistingInsuranceSection } from './components/form-sections/existing-insurance';
import { CashFlowBudgetSection } from './components/form-sections/cash-flow-budget';
import { AssetsLiabilitiesSection } from './components/form-sections/assets-liabilities';
import { NeedsAnalysisSection } from './components/form-sections/needs-analysis';
import { RecommendationsNotesSection } from './components/form-sections/recommendations-notes';
import { AcknowledgementSection } from './components/form-sections/acknowledgement';
import { toast } from "sonner@2.0.3";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  const totalSteps = 9;

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      toast.success("Progress saved automatically");
    }
  };

  const handleSave = () => {
    // Simulate saving to local storage or API
    localStorage.setItem('guardianInsuranceForm', JSON.stringify(formData));
    toast.success("Form saved successfully");
  };

  const handleSubmit = () => {
    // Simulate form submission
    console.log('Form submitted:', formData);
    toast.success("Application submitted successfully! You will receive a confirmation email shortly.");
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <ImportantNoticeSection />
            <ApplicationTypeSection formData={formData} updateFormData={updateFormData} />
          </div>
        );
      case 2:
        return (
          <div className="space-y-8">
            <PersonalInformationSection formData={formData} updateFormData={updateFormData} />
            <OtherIncomeSection formData={formData} updateFormData={updateFormData} />
          </div>
        );
      case 3:
        return (
          <FamilyDetailsSection formData={formData} updateFormData={updateFormData} />
        );
      case 4:
        return (
          <ExistingInsuranceSection formData={formData} updateFormData={updateFormData} />
        );
      case 5:
        return (
          <CashFlowBudgetSection formData={formData} updateFormData={updateFormData} />
        );
      case 6:
        return (
          <AssetsLiabilitiesSection formData={formData} updateFormData={updateFormData} />
        );
      case 7:
        return (
          <NeedsAnalysisSection formData={formData} updateFormData={updateFormData} />
        );
      case 8:
        return (
          <RecommendationsNotesSection formData={formData} updateFormData={updateFormData} />
        );
      case 9:
        return (
          <AcknowledgementSection formData={formData} updateFormData={updateFormData} />
        );
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Important Notice & Application Type";
      case 2:
        return "Personal Information & Employment";
      case 3:
        return "Family Details";
      case 4:
        return "Existing Insurance Portfolio";
      case 5:
        return "Cash Flow & Budget";
      case 6:
        return "Assets & Liabilities";
      case 7:
        return "Needs Analysis & Planning";
      case 8:
        return "Recommendations & Notes";
      case 9:
        return "Acknowledgement & Signatures";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <FormHeader />
      
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-primary">
              {getStepTitle()}
            </h2>
            <div className="text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="mb-8">
          {renderCurrentStep()}
        </div>
      </div>

      {/* Form Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-10">
        <FormNavigation
          currentStep={currentStep}
          totalSteps={totalSteps}
          onPreviousStep={handlePreviousStep}
          onNextStep={handleNextStep}
          onSave={handleSave}
          onSubmit={handleSubmit}
          isFirstStep={currentStep === 1}
          isLastStep={currentStep === totalSteps}
        />
      </div>

      {/* Add bottom padding to account for fixed navigation */}
      <div className="h-32"></div>

      <Toaster />
    </div>
  );
}