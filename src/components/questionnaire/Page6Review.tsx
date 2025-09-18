import React from "react";
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, FileCheck, AlertTriangle, User, DollarSign } from "lucide-react";

export default function Page6Review() {
  const { register, watch, setValue, getValues, formState: { errors } } = useFormContext();
  
  const finalAcknowledgement = watch("finalAcknowledgement");
  const formData = getValues();
  
  // Helper function to display form data safely
  const displayValue = (value: any) => {
    if (value === undefined || value === null || value === "") return "Not provided";
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (typeof value === "number") return value.toString();
    return value;
  };

  return (
    <div className="space-y-6">
      {/* Review Summary */}
      <Card className="shadow-md border-green-200">
        <CardHeader className="border-b pb-4 bg-green-50">
          <CardTitle className="text-xl font-bold text-green-800 flex items-center gap-2">
            <FileCheck className="h-5 w-5" />
            Application Review & Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Alert className="mb-6">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Please review all information below before submitting your application. You can go back to previous pages to make changes if needed.
            </AlertDescription>
          </Alert>
          
          {/* Personal Information Summary */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <User className="h-5 w-5 text-blue-500" />
              <h3 className="font-semibold text-lg text-gray-800">Personal Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-blue-50 p-4 rounded-lg">
              <div>
                <span className="text-sm font-medium text-gray-600">Client Name:</span>
                <p className="font-semibold">{displayValue(formData.clientName)}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Email:</span>
                <p className="font-semibold">{displayValue(formData.email)}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Phone:</span>
                <p className="font-semibold">{displayValue(formData.phone)}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Occupation:</span>
                <p className="font-semibold">{displayValue(formData.occupation)}</p>
              </div>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          {/* Financial Summary */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign className="h-5 w-5 text-green-500" />
              <h3 className="font-semibold text-lg text-gray-800">Financial Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-green-50 p-4 rounded-lg">
              <div>
                <span className="text-sm font-medium text-gray-600">Monthly Income:</span>
                <p className="font-semibold">${displayValue(formData.monthlyIncome)}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600">Monthly Expenses:</span>
                <p className="font-semibold">${displayValue(formData.monthlyExpenses)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Final Acknowledgement */}
      <Card className="shadow-md border-orange-200">
        <CardHeader className="border-b pb-4 bg-orange-50">
          <CardTitle className="text-xl font-bold text-orange-800 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Final Acknowledgement & Consent
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Important:</strong> By submitting this form, you acknowledge that all information provided is accurate and complete.
              </AlertDescription>
            </Alert>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="finalAcknowledgement"
                  checked={finalAcknowledgement || false}
                  onCheckedChange={(checked) => setValue("finalAcknowledgement", checked)}
                  className="mt-1"
                />
                <Label htmlFor="finalAcknowledgement" className="text-sm leading-relaxed cursor-pointer">
                  <strong>I have read, understood, and agree to all statements.</strong> I confirm that all information provided is accurate.
                </Label>
              </div>
              
              {errors.finalAcknowledgement && (
                <p className="text-red-500 text-sm ml-6">
                  You must acknowledge and agree to proceed with submission.
                </p>
              )}
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="additionalComments">Additional Comments (Optional)</Label>
              <Textarea
                id="additionalComments"
                {...register("additionalComments")}
                placeholder="Any additional information or questions..."
                rows={4}
                className="bg-orange-50 border-orange-200"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Page Footer */}
      <div className="flex justify-between items-center pt-6 border-t">
        <span className="text-sm text-gray-500">6 | P a g e</span>
        <span className="text-sm text-gray-500">Review & Submit</span>
      </div>
    </div>
  );
}