import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { ChevronLeft, ChevronRight, Save, Send } from "lucide-react";

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPreviousStep: () => void;
  onNextStep: () => void;
  onSave: () => void;
  onSubmit: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export function FormNavigation({
  currentStep,
  totalSteps,
  onPreviousStep,
  onNextStep,
  onSave,
  onSubmit,
  isFirstStep,
  isLastStep
}: FormNavigationProps) {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="bg-white border-t border-border p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col space-y-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-3">
              {!isFirstStep && (
                <Button
                  variant="outline"
                  onClick={onPreviousStep}
                  className="flex items-center space-x-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Previous</span>
                </Button>
              )}
            </div>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={onSave}
                className="flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Save Draft</span>
              </Button>

              {isLastStep ? (
                <Button
                  onClick={onSubmit}
                  className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700"
                >
                  <Send className="h-4 w-4" />
                  <span>Submit Application</span>
                </Button>
              ) : (
                <Button
                  onClick={onNextStep}
                  className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700"
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}