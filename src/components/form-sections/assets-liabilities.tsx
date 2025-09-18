import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";

interface AssetsLiabilitiesSectionProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

export function AssetsLiabilitiesSection({ formData, updateFormData }: AssetsLiabilitiesSectionProps) {
  const assetCategories = [
    { key: "house", label: "House" },
    { key: "cars", label: "Cars" },
    { key: "otherProperties", label: "Other Properties" },
    { key: "cashInBank", label: "Cash in Bank" },
    { key: "mutualFunds", label: "Mutual Funds" },
    { key: "investments", label: "Investments" },
    { key: "other", label: "Other" }
  ];

  const liabilityCategories = [
    { key: "mortgageLoan", label: "Mortgage Loan" },
    { key: "bankLoan", label: "Bank Loan" },
    { key: "creditUnion", label: "Credit Union" },
    { key: "creditCard", label: "Credit Card" },
    { key: "other", label: "Other" }
  ];

  const updateAsset = (key: string, value: string) => {
    updateFormData('assets', { 
      ...formData.assets, 
      [key]: value 
    });
  };

  const updateLiability = (key: string, value: string) => {
    updateFormData('liabilities', { 
      ...formData.liabilities, 
      [key]: value 
    });
  };

  const calculateTotalLiabilities = () => {
    const liabilities = formData.liabilities || {};
    const total = liabilityCategories.reduce((sum, category) => {
      const value = parseFloat(liabilities[category.key] || '0');
      return sum + (isNaN(value) ? 0 : value);
    }, 0);
    return total.toFixed(2);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-primary">Assets and Liabilities</CardTitle>
        <p className="text-sm text-muted-foreground">
          This information helps to facilitate the planning for your financial need(s). Would you like your assets and liabilities to 
          be taken into consideration for the Needs Analysis and Recommendation(s)?
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Preference Question */}
        <div>
          <RadioGroup 
            value={formData.assetsLiabilitiesPreference || ""}
            onValueChange={(value) => updateFormData('assetsLiabilitiesPreference', value)}
            className="space-y-3"
          >
            <div className="flex items-start space-x-3">
              <RadioGroupItem value="no" id="assets-no" className="mt-1" />
              <div>
                <Label htmlFor="assets-no" className="cursor-pointer">No, please state reason:</Label>
                {formData.assetsLiabilitiesPreference === 'no' && (
                  <Textarea
                    value={formData.assetsNoReason || ""}
                    onChange={(e) => updateFormData('assetsNoReason', e.target.value)}
                    className="mt-2 bg-blue-50 border-blue-200"
                    placeholder="Please explain why you prefer not to include assets and liabilities..."
                  />
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="yes" id="assets-yes" />
              <Label htmlFor="assets-yes" className="cursor-pointer">Yes, please complete the details below:</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Assets and Liabilities Tables */}
        {formData.assetsLiabilitiesPreference === 'yes' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Assets */}
            <div>
              <h4 className="font-medium text-primary mb-4 text-center">Assets</h4>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 font-medium text-sm text-primary border-b border-border pb-2">
                  <div>Asset Type</div>
                  <div>Values</div>
                </div>
                {assetCategories.map((category) => (
                  <div key={category.key} className="grid grid-cols-2 gap-4">
                    <div className="flex items-center text-sm">
                      {category.label}
                    </div>
                    <div>
                      <Input
                        value={formData.assets?.[category.key] || ""}
                        onChange={(e) => updateAsset(category.key, e.target.value)}
                        placeholder="$0.00"
                        className="bg-blue-50 border-blue-200"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Liabilities */}
            <div>
              <h4 className="font-medium text-primary mb-4 text-center">Liabilities</h4>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 font-medium text-sm text-primary border-b border-border pb-2">
                  <div>Liability Type</div>
                  <div>Values</div>
                </div>
                {liabilityCategories.map((category) => (
                  <div key={category.key} className="grid grid-cols-2 gap-4">
                    <div className="flex items-center text-sm">
                      {category.label}
                    </div>
                    <div>
                      <Input
                        value={formData.liabilities?.[category.key] || ""}
                        onChange={(e) => updateLiability(category.key, e.target.value)}
                        placeholder="$0.00"
                        className="bg-blue-50 border-blue-200"
                      />
                    </div>
                  </div>
                ))}
                
                {/* Total Liabilities */}
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
                  <div className="flex items-center text-sm font-medium">
                    Total Liabilities
                  </div>
                  <div>
                    <Input
                      value={`$${calculateTotalLiabilities()}`}
                      readOnly
                      className="bg-muted border-border font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}