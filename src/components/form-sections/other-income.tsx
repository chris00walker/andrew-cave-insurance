import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Trash2, Plus } from "lucide-react";

interface OtherIncomeSectionProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

interface IncomeSource {
  monthlyAmount: string;
  activity: string;
}

export function OtherIncomeSection({ formData, updateFormData }: OtherIncomeSectionProps) {
  const incomeSources = formData.otherIncome?.sources || [
    { monthlyAmount: "", activity: "" },
    { monthlyAmount: "", activity: "" },
    { monthlyAmount: "", activity: "" }
  ];

  const updateIncomeSource = (index: number, field: keyof IncomeSource, value: string) => {
    const updatedSources = [...incomeSources];
    updatedSources[index] = { ...updatedSources[index], [field]: value };
    updateFormData('otherIncome', { 
      ...formData.otherIncome, 
      sources: updatedSources 
    });
  };

  const addIncomeSource = () => {
    const updatedSources = [...incomeSources, { monthlyAmount: "", activity: "" }];
    updateFormData('otherIncome', { 
      ...formData.otherIncome, 
      sources: updatedSources 
    });
  };

  const removeIncomeSource = (index: number) => {
    if (incomeSources.length > 1) {
      const updatedSources = incomeSources.filter((_, i) => i !== index);
      updateFormData('otherIncome', { 
        ...formData.otherIncome, 
        sources: updatedSources 
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-primary">Other Sources of Income</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-12 gap-4 font-medium text-sm text-primary border-b border-border pb-2">
            <div className="col-span-1">#</div>
            <div className="col-span-5">Monthly Amount $</div>
            <div className="col-span-5">Activity</div>
            <div className="col-span-1">Action</div>
          </div>

          {incomeSources.map((source, index) => (
            <div key={index} className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-1 text-sm text-muted-foreground">
                {index + 1}
              </div>
              <div className="col-span-5">
                <Input
                  value={source.monthlyAmount}
                  onChange={(e) => updateIncomeSource(index, 'monthlyAmount', e.target.value)}
                  placeholder="0.00"
                  className="bg-blue-50 border-blue-200"
                />
              </div>
              <div className="col-span-5">
                <Input
                  value={source.activity}
                  onChange={(e) => updateIncomeSource(index, 'activity', e.target.value)}
                  placeholder="Source of income"
                  className="bg-blue-50 border-blue-200"
                />
              </div>
              <div className="col-span-1">
                {incomeSources.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeIncomeSource(index)}
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}

          <div className="pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={addIncomeSource}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Another Source
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}