import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Trash2, Plus } from "lucide-react";
import { Textarea } from "../ui/textarea";

interface NeedsAnalysisSectionProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

interface FutureNeed {
  need: string;
  description: string;
  value: string;
  timeframe: string;
}

interface MedicalCondition {
  condition: string;
  treatment: string;
}

export function NeedsAnalysisSection({ formData, updateFormData }: NeedsAnalysisSectionProps) {
  const defaultFutureNeeds: FutureNeed[] = [
    { need: "", description: "", value: "", timeframe: "" },
    { need: "", description: "", value: "", timeframe: "" },
    { need: "", description: "", value: "", timeframe: "" }
  ];

  const defaultMedicalConditions: MedicalCondition[] = [
    { condition: "", treatment: "" },
    { condition: "", treatment: "" }
  ];

  const existingFutureNeeds = formData.futureNeeds?.needs as FutureNeed[] | undefined;
  const futureNeeds: FutureNeed[] = existingFutureNeeds ?? defaultFutureNeeds;

  const existingMedicalConditions = formData.medicalConditions?.conditions as MedicalCondition[] | undefined;
  const medicalConditions: MedicalCondition[] = existingMedicalConditions ?? defaultMedicalConditions;

  const updateNeed = (index: number, field: keyof FutureNeed, value: string) => {
    const updatedNeeds = [...futureNeeds];
    updatedNeeds[index] = { ...updatedNeeds[index], [field]: value };
    updateFormData('futureNeeds', { 
      ...formData.futureNeeds, 
      needs: updatedNeeds 
    });
  };

  const addFutureNeed = () => {
    const updatedNeeds = [...futureNeeds, { need: "", description: "", value: "", timeframe: "" }];
    updateFormData('futureNeeds', { 
      ...formData.futureNeeds, 
      needs: updatedNeeds 
    });
  };

  const removeFutureNeed = (index: number) => {
    if (futureNeeds.length > 1) {
      const updatedNeeds = futureNeeds.filter((needItem, i) => i !== index);
      updateFormData('futureNeeds', { 
        ...formData.futureNeeds, 
        needs: updatedNeeds 
      });
    }
  };

  const updateMedicalCondition = (index: number, field: keyof MedicalCondition, value: string) => {
    const updatedConditions = [...medicalConditions];
    updatedConditions[index] = { ...updatedConditions[index], [field]: value };
    updateFormData('medicalConditions', { 
      ...formData.medicalConditions, 
      conditions: updatedConditions 
    });
  };

  const addMedicalCondition = () => {
    const updatedConditions = [...medicalConditions, { condition: "", treatment: "" }];
    updateFormData('medicalConditions', { 
      ...formData.medicalConditions, 
      conditions: updatedConditions 
    });
  };

  const removeMedicalCondition = (index: number) => {
    if (medicalConditions.length > 1) {
      const updatedConditions = medicalConditions.filter((conditionItem, i) => i !== index);
      updateFormData('medicalConditions', { 
        ...formData.medicalConditions, 
        conditions: updatedConditions 
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Needs Section */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-primary">Needs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="debt-liquidation">Debt Liquidation:</Label>
              <Input
                id="debt-liquidation"
                value={formData.needs?.debtLiquidation || ""}
                onChange={(e) => 
                  updateFormData('needs', { 
                    ...formData.needs, 
                    debtLiquidation: e.target.value 
                  })
                }
                className="bg-blue-50 border-blue-200"
                placeholder="$0.00"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="income-replacement">Income Replacement:</Label>
              <Input
                id="income-replacement"
                value={formData.needs?.incomeReplacement || ""}
                onChange={(e) => 
                  updateFormData('needs', { 
                    ...formData.needs, 
                    incomeReplacement: e.target.value 
                  })
                }
                className="bg-blue-50 border-blue-200"
                placeholder="$0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="education-funding">Education Funding:</Label>
              <Input
                id="education-funding"
                value={formData.needs?.educationFunding || ""}
                onChange={(e) => 
                  updateFormData('needs', { 
                    ...formData.needs, 
                    educationFunding: e.target.value 
                  })
                }
                className="bg-blue-50 border-blue-200"
                placeholder="$0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="family-spouse-support">Family/Spouse Support:</Label>
              <Input
                id="family-spouse-support"
                value={formData.needs?.familySpouseSupport || ""}
                onChange={(e) => 
                  updateFormData('needs', { 
                    ...formData.needs, 
                    familySpouseSupport: e.target.value 
                  })
                }
                className="bg-blue-50 border-blue-200"
                placeholder="$0.00"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="other-needs">Other:</Label>
              <Input
                id="other-needs"
                value={formData.needs?.other || ""}
                onChange={(e) => 
                  updateFormData('needs', { 
                    ...formData.needs, 
                    other: e.target.value 
                  })
                }
                className="bg-blue-50 border-blue-200"
                placeholder="$0.00"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total Need Section */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-primary">Total Need Calculation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="total-need">Total Need:</Label>
              <Input
                id="total-need"
                value={formData.totalNeed?.total || ""}
                onChange={(e) => 
                  updateFormData('totalNeed', { 
                    ...formData.totalNeed, 
                    total: e.target.value 
                  })
                }
                className="bg-blue-50 border-blue-200"
                placeholder="$0.00"
              />
            </div>

            <div></div>

            <div className="space-y-2">
              <Label htmlFor="less-present-coverage">Less Present Coverage:</Label>
              <Input
                id="less-present-coverage"
                value={formData.totalNeed?.lessPresentCoverage || ""}
                onChange={(e) => 
                  updateFormData('totalNeed', { 
                    ...formData.totalNeed, 
                    lessPresentCoverage: e.target.value 
                  })
                }
                className="bg-blue-50 border-blue-200"
                placeholder="$0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="less-cash-assets">Less Cash from Assets:</Label>
              <Input
                id="less-cash-assets"
                value={formData.totalNeed?.lessCashAssets || ""}
                onChange={(e) => 
                  updateFormData('totalNeed', { 
                    ...formData.totalNeed, 
                    lessCashAssets: e.target.value 
                  })
                }
                className="bg-blue-50 border-blue-200"
                placeholder="$0.00"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="insurance-need" className="font-medium text-primary">Insurance Need:</Label>
              <Input
                id="insurance-need"
                value={formData.totalNeed?.insuranceNeed || ""}
                onChange={(e) => 
                  updateFormData('totalNeed', { 
                    ...formData.totalNeed, 
                    insuranceNeed: e.target.value 
                  })
                }
                className="bg-blue-50 border-blue-200 font-medium"
                placeholder="$0.00"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Retirement Planning Section */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-primary">Retirement Planning</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="current-income">Current Income:</Label>
              <Input
                id="current-income"
                value={formData.retirementPlanning?.currentIncome || ""}
                onChange={(e) => 
                  updateFormData('retirementPlanning', { 
                    ...formData.retirementPlanning, 
                    currentIncome: e.target.value 
                  })
                }
                className="bg-blue-50 border-blue-200"
                placeholder="$0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="income-percentage">% of Income at retirement:</Label>
              <Input
                id="income-percentage"
                value={formData.retirementPlanning?.incomePercentage || ""}
                onChange={(e) => 
                  updateFormData('retirementPlanning', { 
                    ...formData.retirementPlanning, 
                    incomePercentage: e.target.value 
                  })
                }
                className="bg-blue-50 border-blue-200"
                placeholder="75%"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="years-to-retirement">No. of Years to Retirement:</Label>
              <Input
                id="years-to-retirement"
                value={formData.retirementPlanning?.yearsToRetirement || ""}
                onChange={(e) => 
                  updateFormData('retirementPlanning', { 
                    ...formData.retirementPlanning, 
                    yearsToRetirement: e.target.value 
                  })
                }
                className="bg-blue-50 border-blue-200"
                placeholder="25"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="inflationary-factor">Inflationary Factor:</Label>
              <Input
                id="inflationary-factor"
                value={formData.retirementPlanning?.inflationaryFactor || ""}
                onChange={(e) => 
                  updateFormData('retirementPlanning', { 
                    ...formData.retirementPlanning, 
                    inflationaryFactor: e.target.value 
                  })
                }
                className="bg-blue-50 border-blue-200"
                placeholder="3%"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="future-earnings">Future Earnings at Retirement:</Label>
              <Input
                id="future-earnings"
                value={formData.retirementPlanning?.futureEarnings || ""}
                onChange={(e) => 
                  updateFormData('retirementPlanning', { 
                    ...formData.retirementPlanning, 
                    futureEarnings: e.target.value 
                  })
                }
                className="bg-blue-50 border-blue-200"
                placeholder="$0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="avg-return-rate">Avg. Rate of Return on Investment:</Label>
              <Input
                id="avg-return-rate"
                value={formData.retirementPlanning?.avgReturnRate || ""}
                onChange={(e) => 
                  updateFormData('retirementPlanning', { 
                    ...formData.retirementPlanning, 
                    avgReturnRate: e.target.value 
                  })
                }
                className="bg-blue-50 border-blue-200"
                placeholder="6%"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lumpsum-needed">Lumpsum Needed at Retirement:</Label>
              <Input
                id="lumpsum-needed"
                value={formData.retirementPlanning?.lumpsumNeeded || ""}
                onChange={(e) => 
                  updateFormData('retirementPlanning', { 
                    ...formData.retirementPlanning, 
                    lumpsumNeeded: e.target.value 
                  })
                }
                className="bg-blue-50 border-blue-200"
                placeholder="$0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="less-current-savings">Less current savings/investments:</Label>
              <Input
                id="less-current-savings"
                value={formData.retirementPlanning?.lessCurrentSavings || ""}
                onChange={(e) => 
                  updateFormData('retirementPlanning', { 
                    ...formData.retirementPlanning, 
                    lessCurrentSavings: e.target.value 
                  })
                }
                className="bg-blue-50 border-blue-200"
                placeholder="$0.00"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="retirement-fund-gap" className="font-medium text-primary">Retirement Fund Gap:</Label>
              <Input
                id="retirement-fund-gap"
                value={formData.retirementPlanning?.retirementFundGap || ""}
                onChange={(e) => 
                  updateFormData('retirementPlanning', { 
                    ...formData.retirementPlanning, 
                    retirementFundGap: e.target.value 
                  })
                }
                className="bg-blue-50 border-blue-200 font-medium"
                placeholder="$0.00"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Future Needs Section */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-primary">What are your future Needs?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <div className="min-w-[600px]">
                <div className="grid grid-cols-11 gap-2 bg-muted p-3 rounded-t-lg border border-border font-medium text-sm">
                  <div className="col-span-3">Need</div>
                  <div className="col-span-3">Description</div>
                  <div className="col-span-2">Value</div>
                  <div className="col-span-2">Timeframe</div>
                  <div className="col-span-1">Action</div>
                </div>

                {futureNeeds.map((need, index) => (
                  <div key={index} className="grid grid-cols-11 gap-2 p-3 border-l border-r border-b border-border">
                    <div className="col-span-3">
                      <Input
                        value={need.need}
                        onChange={(e) => updateNeed(index, 'need', e.target.value)}
                        placeholder="Need type"
                        className="bg-blue-50 border-blue-200 h-8 text-sm"
                      />
                    </div>
                    <div className="col-span-3">
                      <Input
                        value={need.description}
                        onChange={(e) => updateNeed(index, 'description', e.target.value)}
                        placeholder="Description"
                        className="bg-blue-50 border-blue-200 h-8 text-sm"
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        value={need.value}
                        onChange={(e) => updateNeed(index, 'value', e.target.value)}
                        placeholder="$0.00"
                        className="bg-blue-50 border-blue-200 h-8 text-sm"
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        value={need.timeframe}
                        onChange={(e) => updateNeed(index, 'timeframe', e.target.value)}
                        placeholder="Timeline"
                        className="bg-blue-50 border-blue-200 h-8 text-sm"
                      />
                    </div>
                    <div className="col-span-1 flex items-center">
                      {futureNeeds.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFutureNeed(index)}
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
                onClick={addFutureNeed}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Future Need
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medical Conditions Section */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-primary">Medical Information</CardTitle>
          <p className="text-sm text-muted-foreground">
            Do you or any applicant have any medical condition which require(ed) that you receive(d) medical attention from any 
            doctor? If yes, please provide details:
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <div className="min-w-[500px]">
                <div className="grid grid-cols-9 gap-2 bg-muted p-3 rounded-t-lg border border-border font-medium text-sm">
                  <div className="col-span-4">Medical Condition</div>
                  <div className="col-span-4">Treatment/Care</div>
                  <div className="col-span-1">Action</div>
                </div>

                {medicalConditions.map((condition, index) => (
                  <div key={index} className="grid grid-cols-9 gap-2 p-3 border-l border-r border-b border-border">
                    <div className="col-span-4">
                      <Textarea
                        value={condition.condition}
                        onChange={(e) => updateMedicalCondition(index, 'condition', e.target.value)}
                        placeholder="Medical condition details"
                        className="bg-blue-50 border-blue-200 min-h-[60px] text-sm"
                      />
                    </div>
                    <div className="col-span-4">
                      <Textarea
                        value={condition.treatment}
                        onChange={(e) => updateMedicalCondition(index, 'treatment', e.target.value)}
                        placeholder="Treatment/care received"
                        className="bg-blue-50 border-blue-200 min-h-[60px] text-sm"
                      />
                    </div>
                    <div className="col-span-1 flex items-start pt-2">
                      {medicalConditions.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeMedicalCondition(index)}
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
                onClick={addMedicalCondition}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Medical Condition
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
