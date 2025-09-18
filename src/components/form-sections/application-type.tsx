import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";

interface ApplicationTypeSectionProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

export function ApplicationTypeSection({ formData, updateFormData }: ApplicationTypeSectionProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-primary">Application Type</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="font-medium text-primary mb-4">Client's Choice</h4>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="disclose-info"
                checked={formData.clientChoices?.discloseInfo || false}
                onCheckedChange={(checked) => 
                  updateFormData('clientChoices', { 
                    ...formData.clientChoices, 
                    discloseInfo: checked 
                  })
                }
              />
              <Label htmlFor="disclose-info" className="text-sm leading-relaxed">
                I/we agree to disclose the information requested in this form.
              </Label>
            </div>
            
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="specific-product"
                checked={formData.clientChoices?.specificProduct || false}
                onCheckedChange={(checked) => 
                  updateFormData('clientChoices', { 
                    ...formData.clientChoices, 
                    specificProduct: checked 
                  })
                }
              />
              <Label htmlFor="specific-product" className="text-sm leading-relaxed">
                I/we wish to receive information relevant to a specific product or need only.
              </Label>
            </div>
          </div>
        </div>

        <div className="bg-muted/30 p-4 rounded-lg">
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            I/we acknowledge that the insurance advisor has provided me/us with a copy of the completed Confidential Fact Find 
            form. I/we understand that a policy purchased without the proper completion of a 'Confidential Fact Find' form may 
            not be appropriate to your needs.
          </p>
        </div>

        <Separator />

        <div>
          <Label htmlFor="advisor-declaration" className="font-medium text-primary">
            Advisor's Declaration:
          </Label>
          <p className="text-sm text-muted-foreground mt-2 mb-3">
            I declare that the information provided to me is strictly confidential and is only to be used for the purpose of fact-
            finding in the process of recommending suitable insurance products and shall not be used for any other purposes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <Label htmlFor="client-signature" className="text-sm font-medium">
              Signature of Client (on behalf of all persons to be insured)
            </Label>
            <div className="mt-2 h-16 border border-dashed border-border rounded-lg bg-muted/10 flex items-center justify-center text-muted-foreground text-sm">
              Click to sign
            </div>
            <div className="mt-2">
              <Label htmlFor="client-date" className="text-sm">Date:</Label>
              <div className="mt-1 h-8 bg-blue-100 rounded border border-blue-200"></div>
            </div>
          </div>

          <div>
            <Label htmlFor="advisor-signature" className="text-sm font-medium">
              Signature of Advisor
            </Label>
            <div className="mt-2 h-16 border border-dashed border-border rounded-lg bg-muted/10 flex items-center justify-center text-muted-foreground text-sm">
              Click to sign
            </div>
            <div className="mt-2">
              <Label htmlFor="advisor-date" className="text-sm">Date:</Label>
              <div className="mt-1 h-8 bg-blue-100 rounded border border-blue-200"></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}