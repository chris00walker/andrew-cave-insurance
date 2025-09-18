import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";

interface CashFlowBudgetSectionProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

export function CashFlowBudgetSection({ formData, updateFormData }: CashFlowBudgetSectionProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-primary">Cash Flow and Budget</CardTitle>
        <p className="text-sm text-muted-foreground">
          This information helps to ascertain the affordability of the recommendation(s) and plan(s) for your financial need(s).
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Income and Expenses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="total-monthly-income">Estimated total monthly income:</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="total-monthly-income"
                  value={formData.cashFlow?.totalMonthlyIncome || ""}
                  onChange={(e) => 
                    updateFormData('cashFlow', { 
                      ...formData.cashFlow, 
                      totalMonthlyIncome: e.target.value 
                    })
                  }
                  className="bg-blue-50 border-blue-200 pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="total-monthly-expenses">Estimated total monthly expenses:</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="total-monthly-expenses"
                  value={formData.cashFlow?.totalMonthlyExpenses || ""}
                  onChange={(e) => 
                    updateFormData('cashFlow', { 
                      ...formData.cashFlow, 
                      totalMonthlyExpenses: e.target.value 
                    })
                  }
                  className="bg-blue-50 border-blue-200 pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="surplus-shortfall">Surplus/Shortfall:</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="surplus-shortfall"
                  value={formData.cashFlow?.surplusShortfall || ""}
                  onChange={(e) => 
                    updateFormData('cashFlow', { 
                      ...formData.cashFlow, 
                      surplusShortfall: e.target.value 
                    })
                  }
                  className="bg-blue-50 border-blue-200 pl-8"
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Future Plans */}
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">
                Do you have any plans or are there any factors within the next 12 months which may significantly increase or 
                decrease your current income and expenditure position (e.g. receiving an inheritance or borrowing money 
                for investment etc.)?
              </Label>
              <RadioGroup 
                value={formData.cashFlow?.futurePlans || ""}
                onValueChange={(value) => 
                  updateFormData('cashFlow', { 
                    ...formData.cashFlow, 
                    futurePlans: value 
                  })
                }
                className="mt-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="future-plans-no" />
                  <Label htmlFor="future-plans-no">No</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="future-plans-yes" />
                  <Label htmlFor="future-plans-yes">Yes (If Yes, please complete the details below)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="remarks">Remarks:</Label>
              <Textarea
                id="remarks"
                value={formData.cashFlow?.remarks || ""}
                onChange={(e) => 
                  updateFormData('cashFlow', { 
                    ...formData.cashFlow, 
                    remarks: e.target.value 
                  })
                }
                className="bg-blue-50 border-blue-200 min-h-[80px]"
                placeholder="Please provide details about your future plans..."
              />
            </div>
          </div>
        </div>

        {/* Budget Section */}
        <div className="border-t border-border pt-6">
          <h4 className="font-medium text-primary mb-4">Budget</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="annual-amount">Annual Amount:</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="annual-amount"
                    value={formData.budget?.annualAmount || ""}
                    onChange={(e) => 
                      updateFormData('budget', { 
                        ...formData.budget, 
                        annualAmount: e.target.value 
                      })
                    }
                    className="bg-blue-50 border-blue-200 pl-8"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="single-amount">Single Amount:</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="single-amount"
                    value={formData.budget?.singleAmount || ""}
                    onChange={(e) => 
                      updateFormData('budget', { 
                        ...formData.budget, 
                        singleAmount: e.target.value 
                      })
                    }
                    className="bg-blue-50 border-blue-200 pl-8"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="source-annual">Source of this Fund:</Label>
                <Input
                  id="source-annual"
                  value={formData.budget?.sourceAnnual || ""}
                  onChange={(e) => 
                    updateFormData('budget', { 
                      ...formData.budget, 
                      sourceAnnual: e.target.value 
                    })
                  }
                  className="bg-blue-50 border-blue-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="source-single">Source of this Fund:</Label>
                <Input
                  id="source-single"
                  value={formData.budget?.sourceSingle || ""}
                  onChange={(e) => 
                    updateFormData('budget', { 
                      ...formData.budget, 
                      sourceSingle: e.target.value 
                    })
                  }
                  className="bg-blue-50 border-blue-200"
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Label className="text-sm font-medium">
              Is the budget you set aside a substantial portion of your assets or surplus?
            </Label>
            <div className="flex items-center space-x-6 mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="budget-substantial-no"
                  checked={formData.budget?.isSubstantialPortion === 'no'}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      updateFormData('budget', { 
                        ...formData.budget, 
                        isSubstantialPortion: 'no' 
                      });
                    }
                  }}
                />
                <Label htmlFor="budget-substantial-no">No</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="budget-substantial-yes"
                  checked={formData.budget?.isSubstantialPortion === 'yes'}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      updateFormData('budget', { 
                        ...formData.budget, 
                        isSubstantialPortion: 'yes' 
                      });
                    }
                  }}
                />
                <Label htmlFor="budget-substantial-yes">Yes</Label>
              </div>
            </div>
            
            {formData.budget?.isSubstantialPortion === 'yes' && (
              <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  If your answer is "yes", you may encounter a potential risk in the future of not being able to continue paying your 
                  premiums.
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}