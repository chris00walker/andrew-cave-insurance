import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Trash2, Plus } from "lucide-react";

interface ExistingInsuranceSectionProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

interface InsurancePolicy {
  company: string;
  typeOfPlan: string;
  sumAssured: string;
  premium: string;
  mode: string;
}

export function ExistingInsuranceSection({ formData, updateFormData }: ExistingInsuranceSectionProps) {
  const policies = formData.existingInsurance?.policies || [
    { company: "", typeOfPlan: "", sumAssured: "", premium: "", mode: "" },
    { company: "", typeOfPlan: "", sumAssured: "", premium: "", mode: "" },
    { company: "", typeOfPlan: "", sumAssured: "", premium: "", mode: "" }
  ];

  const updatePolicy = (index: number, field: keyof InsurancePolicy, value: string) => {
    const updatedPolicies = [...policies];
    updatedPolicies[index] = { ...updatedPolicies[index], [field]: value };
    updateFormData('existingInsurance', { 
      ...formData.existingInsurance, 
      policies: updatedPolicies 
    });
  };

  const addPolicy = () => {
    const updatedPolicies = [...policies, { company: "", typeOfPlan: "", sumAssured: "", premium: "", mode: "" }];
    updateFormData('existingInsurance', { 
      ...formData.existingInsurance, 
      policies: updatedPolicies 
    });
  };

  const removePolicy = (index: number) => {
    if (policies.length > 1) {
      const updatedPolicies = policies.filter((_, i) => i !== index);
      updateFormData('existingInsurance', { 
        ...formData.existingInsurance, 
        policies: updatedPolicies 
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-primary">Existing Insurance Portfolio</CardTitle>
        <p className="text-sm text-muted-foreground">
          This information helps to evaluate if your existing insurance portfolio is adequate in meeting your financial needs.
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <div className="min-w-[700px]">
              {/* Header Row */}
              <div className="grid grid-cols-11 gap-2 bg-muted p-3 rounded-t-lg border border-border font-medium text-sm">
                <div className="col-span-2">Company</div>
                <div className="col-span-2">Type of Plan</div>
                <div className="col-span-2">Sum Assured</div>
                <div className="col-span-2">Premium</div>
                <div className="col-span-2">Mode</div>
                <div className="col-span-1">Action</div>
              </div>

              {policies.map((policy, index) => (
                <div key={index} className="grid grid-cols-11 gap-2 p-3 border-l border-r border-b border-border">
                  <div className="col-span-2">
                    <Input
                      value={policy.company}
                      onChange={(e) => updatePolicy(index, 'company', e.target.value)}
                      placeholder="Insurance Company"
                      className="bg-blue-50 border-blue-200 h-8 text-sm"
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      value={policy.typeOfPlan}
                      onChange={(e) => updatePolicy(index, 'typeOfPlan', e.target.value)}
                      placeholder="Plan Type"
                      className="bg-blue-50 border-blue-200 h-8 text-sm"
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      value={policy.sumAssured}
                      onChange={(e) => updatePolicy(index, 'sumAssured', e.target.value)}
                      placeholder="$0.00"
                      className="bg-blue-50 border-blue-200 h-8 text-sm"
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      value={policy.premium}
                      onChange={(e) => updatePolicy(index, 'premium', e.target.value)}
                      placeholder="$0.00"
                      className="bg-blue-50 border-blue-200 h-8 text-sm"
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      value={policy.mode}
                      onChange={(e) => updatePolicy(index, 'mode', e.target.value)}
                      placeholder="Monthly/Yearly"
                      className="bg-blue-50 border-blue-200 h-8 text-sm"
                    />
                  </div>
                  <div className="col-span-1 flex items-center">
                    {policies.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removePolicy(index)}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={addPolicy}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Another Policy
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}