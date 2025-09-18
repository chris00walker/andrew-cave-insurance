import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";
import { Separator } from "../ui/separator";

interface AcknowledgementSectionProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

export function AcknowledgementSection({ formData, updateFormData }: AcknowledgementSectionProps) {
  return (
    <div className="space-y-8">
      {/* Acknowledgement Section */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-primary text-center">Acknowledgement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Client's Declaration */}
          <div>
            <h4 className="font-medium text-primary mb-4">Client's Declaration:</h4>
            <div className="bg-muted/30 p-4 rounded-lg mb-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                I/we confirm that all the information provided above are true and correct. I/we have not misrepresented or withheld 
                any material facts relating to my current financial situation and state of health. I/we understand that the above 
                recommendation(s) is/are based on the facts furnished in the above confidential fact find form.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="client-proceed"
                  checked={formData.clientDeclaration?.proceedWithRecommendations || false}
                  onCheckedChange={(checked) => 
                    updateFormData('clientDeclaration', { 
                      ...formData.clientDeclaration, 
                      proceedWithRecommendations: checked 
                    })
                  }
                />
                <Label htmlFor="client-proceed" className="text-sm leading-relaxed cursor-pointer">
                  <span className="font-medium">1.</span> I/we understand the recommendations put forward by the{" "}
                  <span className="text-blue-600">insurance advisor</span> and{" "}
                  <span className="font-medium">wish to proceed</span> with the options selected above.
                </Label>
              </div>
              
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="client-not-proceed"
                  checked={formData.clientDeclaration?.doNotProceedWithRecommendations || false}
                  onCheckedChange={(checked) => 
                    updateFormData('clientDeclaration', { 
                      ...formData.clientDeclaration, 
                      doNotProceedWithRecommendations: checked 
                    })
                  }
                />
                <Label htmlFor="client-not-proceed" className="text-sm leading-relaxed cursor-pointer">
                  <span className="font-medium">2.</span> I/we understand the recommendations put forward by the{" "}
                  <span className="text-blue-600">insurance advisor</span> and{" "}
                  <span className="font-medium">do not wish to proceed</span> with said recommendations.
                </Label>
              </div>
            </div>
          </div>

          <Separator />

          {/* Advisor's Declaration */}
          <div>
            <h4 className="font-medium text-primary mb-4">Advisor's Declaration:</h4>
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground leading-relaxed">
                The recommendations in this document are based on your personal information collected in this Confidential Fact 
                Find Form. The contents of this document would be kept confidential and stored with the company for audit and 
                record keeping purposes. The information shared in this form may be reviewed by a Sales Manager to ensure the 
                recommendations presented are aligned with 'the right fit' for the client.
              </p>
            </div>
          </div>

          <Separator />

          {/* Signature Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">
                  Signature of Client (on behalf of all persons to be insured)
                </Label>
                <div className="mt-2 h-20 border-2 border-dashed border-border rounded-lg bg-muted/10 flex items-center justify-center text-muted-foreground text-sm">
                  Click to sign
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Date:</Label>
                <div className="mt-1 h-8 bg-blue-100 rounded border border-blue-200 flex items-center px-3 text-sm text-muted-foreground">
                  {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">
                  Signature of Advisor
                </Label>
                <div className="mt-2 h-20 border-2 border-dashed border-border rounded-lg bg-muted/10 flex items-center justify-center text-muted-foreground text-sm">
                  Click to sign
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Date:</Label>
                <div className="mt-1 h-8 bg-blue-100 rounded border border-blue-200 flex items-center px-3 text-sm text-muted-foreground">
                  {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* For Office Use Only Section */}
      <Card className="w-full border-2 border-orange-200">
        <CardHeader className="bg-orange-50">
          <CardTitle className="text-lg font-medium text-primary text-center">
            For Office Use Only - INTERNAL
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 mt-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800 leading-relaxed">
              I understand that the recommendation(s) is/are based on the facts furnished in the confidential fact find form and I{" "}
              <span className="font-medium">agree/do not agree</span> with the proposed recommendation(s).
            </p>
          </div>

          <div>
            <Label htmlFor="manager-comments" className="font-medium text-primary">
              Manager's Comments: (Necessary if in disagreement with recommendation(s)):
            </Label>
            <Textarea
              id="manager-comments"
              value={formData.officeUseOnly?.managerComments || ""}
              onChange={(e) => 
                updateFormData('officeUseOnly', { 
                  ...formData.officeUseOnly, 
                  managerComments: e.target.value 
                })
              }
              className="mt-2 bg-blue-50 border-blue-200 min-h-[80px]"
              placeholder="Manager's comments on the recommendations..."
            />
          </div>

          <div>
            <Label htmlFor="remedial-action" className="font-medium text-primary">
              Remedial Action:
            </Label>
            <Textarea
              id="remedial-action"
              value={formData.officeUseOnly?.remedialAction || ""}
              onChange={(e) => 
                updateFormData('officeUseOnly', { 
                  ...formData.officeUseOnly, 
                  remedialAction: e.target.value 
                })
              }
              className="mt-2 bg-blue-50 border-blue-200 min-h-[100px]"
              placeholder="Any remedial actions required..."
            />
          </div>

          <div className="border-t border-border pt-6">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">
                  Manager's Signature
                </Label>
                <div className="mt-2 h-16 border-2 border-dashed border-border rounded-lg bg-muted/10 flex items-center justify-center text-muted-foreground text-sm">
                  Manager signature required
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Date:</Label>
                <div className="mt-1 h-8 bg-blue-100 rounded border border-blue-200 flex items-center px-3 text-sm text-muted-foreground">
                  Signature date
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Version Footer */}
      <div className="text-right text-xs text-muted-foreground mt-8">
        <p>6|Page</p>
        <p>Version 2.0</p>
      </div>
    </div>
  );
}