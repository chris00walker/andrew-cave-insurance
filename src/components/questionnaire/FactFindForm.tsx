"use client";

import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Save, Send } from 'lucide-react';
import { useToast } from "@/components/ui/toast-provider";
import { questionnaireService } from "@/lib/supabase";

// Import page components
import Page1Consent from "./Page1Consent";
import Page2Personal from "./Page2Personal";
import Page3Financial from "./Page3Financial";
import Page4Insurance from "./Page4Insurance";
import Page5Needs from "./Page5Needs";
import Page6Review from "./Page6Review";

// Import Figma form header
import { FormHeader } from "../form-header";

// Comprehensive form schema
const formSchema = z.object({
  // Page 1 - Consent & Application
  clientName: z.string().min(2, "Client name is required"),
  advisorName: z.string().min(2, "Advisor name is required"),
  agentNumber: z.string().optional(),
  discloseInfo: z.boolean(),
  specificProduct: z.boolean().optional(),
  clientSignatureDate: z.string(),
  advisorSignatureDate: z.string(),
  
  // Page 2 - Personal Information
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  maritalStatus: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  occupation: z.string().optional(),
  employer: z.string().optional(),
  yearsEmployed: z.string().optional(),
  industry: z.string().optional(),
  healthRating: z.string().optional(),
  smoker: z.boolean().optional(),
  medicalConditions: z.string().optional(),
  additionalNotes: z.string().optional(),
  
  // Page 3 - Financial Information
  monthlyIncome: z.string().optional(),
  otherIncome: z.string().optional(),
  monthlyExpenses: z.string().optional(),
  assets: z.string().optional(),
  liabilities: z.string().optional(),
  netWorth: z.string().optional(),
  
  // Page 4 - Insurance Portfolio
  existingPolicies: z.array(z.object({
    company: z.string(),
    policyType: z.string(),
    sumAssured: z.string(),
    premium: z.string(),
  })).optional(),
  
  // Page 5 - Needs Analysis
  protectionNeeds: z.object({
    lifeInsurance: z.boolean().optional(),
    healthInsurance: z.boolean().optional(),
    disabilityInsurance: z.boolean().optional(),
    criticalIllness: z.boolean().optional(),
  }).optional(),
  investmentGoals: z.string().optional(),
  retirementPlanning: z.string().optional(),
  
  // Page 6 - Review & Submit
  finalReview: z.boolean().optional(),
  acknowledgement: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface FactFindFormProps {
  onComplete?: (data: FormValues) => void;
  initialData?: Partial<FormValues>;
}

export default function FactFindForm({ onComplete, initialData }: FactFindFormProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();
  
  const totalPages = 6;
  const progressPercentage = (currentPage / totalPages) * 100;

  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      advisorName: "Andrew Cave",
      clientSignatureDate: new Date().toISOString().split('T')[0],
      advisorSignatureDate: new Date().toISOString().split('T')[0],
      country: "Barbados",
      discloseInfo: false,
      specificProduct: false,
      ...initialData,
    },
    mode: "onChange",
  });

  const { handleSubmit, trigger, getValues } = methods;

  // Auto-save to localStorage
  useEffect(() => {
    const interval = setInterval(() => {
      const formData = getValues();
      localStorage.setItem('guardianInsuranceForm', JSON.stringify(formData));
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(interval);
  }, [getValues]);

  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('guardianInsuranceForm');
    if (savedData && !initialData) {
      try {
        const parsedData = JSON.parse(savedData);
        Object.keys(parsedData).forEach(key => {
          methods.setValue(key as keyof FormValues, parsedData[key]);
        });
        addToast({
          type: 'info',
          title: 'Draft Loaded',
          description: 'Your previous progress has been restored.',
        });
      } catch (error) {
        console.error('Error loading saved form data:', error);
      }
    }
  }, [initialData, methods, addToast]);

  const validateCurrentPage = async () => {
    let fieldsToValidate: (keyof FormValues)[] = [];
    
    switch (currentPage) {
      case 1:
        fieldsToValidate = ['clientName', 'advisorName', 'discloseInfo'];
        break;
      case 2:
        // Personal info fields are optional for navigation
        return true;
      case 3:
        // Financial fields are optional for navigation
        return true;
      case 4:
        // Insurance fields are optional for navigation
        return true;
      case 5:
        // Needs analysis fields are optional for navigation
        return true;
      case 6:
        // Review page - no specific validation
        return true;
    }
    
    const result = await trigger(fieldsToValidate);
    
    if (!result && currentPage === 1) {
      const values = getValues();
      if (!values.discloseInfo) {
        addToast({
          type: 'error',
          title: 'Consent Required',
          description: 'You must agree to disclose information to proceed.',
        });
      }
    }
    
    return result;
  };

  const handleNext = async () => {
    const isValid = await validateCurrentPage();
    if (isValid && currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSave = () => {
    const formData = getValues();
    localStorage.setItem('guardianInsuranceForm', JSON.stringify(formData));
    addToast({
      type: 'success',
      title: 'Progress Saved',
      description: 'Your form has been saved successfully.',
    });
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      console.log('Submitting form data:', data);
      
      // Submit to Supabase
      const result = await questionnaireService.submitQuestionnaire(data);
      
      if (result.client && result.questionnaire) {
        // Clear saved draft on successful submission
        localStorage.removeItem('guardianInsuranceForm');
        
        addToast({
          type: 'success',
          title: 'Application Submitted Successfully!',
          description: `Thank you ${result.client.first_name}! Your insurance questionnaire has been submitted. We'll contact you within 24 hours.`,
        });
        
        if (onComplete) {
          onComplete(data);
        }
      } else if (result.client) {
        // Client created but questionnaire failed
        addToast({
          type: 'warning',
          title: 'Partial Submission',
          description: 'Your contact information was saved, but there was an issue with the questionnaire. We\'ll follow up with you.',
        });
      } else {
        throw new Error('Failed to create client record');
      }
    } catch (error) {
      console.error('Submission error:', error);
      addToast({
        type: 'error',
        title: 'Submission Failed',
        description: 'There was an error submitting your application. Please try again or contact us directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPageTitle = () => {
    switch (currentPage) {
      case 1: return "Consent & Application Type";
      case 2: return "Personal Information";
      case 3: return "Financial Information";
      case 4: return "Insurance Portfolio";
      case 5: return "Needs Analysis";
      case 6: return "Review & Submit";
      default: return "";
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 1: return <Page1Consent />;
      case 2: return <Page2Personal />;
      case 3: return <Page3Financial />;
      case 4: return <Page4Insurance />;
      case 5: return <Page5Needs />;
      case 6: return <Page6Review />;
      default: return <Page1Consent />;
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-gray-50">
        <FormHeader />
        
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Progress Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                {getPageTitle()}
              </h2>
              <div className="text-sm text-gray-500">
                Step {currentPage} of {totalPages}
              </div>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-8">
              {renderCurrentPage()}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-6 border-t">
              <div>
                {currentPage > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevious}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSave}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save Draft
                </Button>

                {currentPage < totalPages ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                  >
                    <Send className="h-4 w-4" />
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </FormProvider>
  );
}
