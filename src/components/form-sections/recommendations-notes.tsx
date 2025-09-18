import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Trash2, Plus } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";

interface RecommendationsNotesSectionProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

interface Recommendation {
  priority: string;
  need: string;
  advisorRecommendation: string;
}

interface ClientDecision {
  optionSelected: string;
  reasonForChoice: string;
}

export function RecommendationsNotesSection({ formData, updateFormData }: RecommendationsNotesSectionProps) {
  const recommendations = formData.recommendations?.items || [
    { priority: "", need: "", advisorRecommendation: "" },
    { priority: "", need: "", advisorRecommendation: "" },
    { priority: "", need: "", advisorRecommendation: "" }
  ];

  const clientDecisions = formData.clientDecisions?.decisions || [
    { optionSelected: "", reasonForChoice: "" },
    { optionSelected: "", reasonForChoice: "" },
    { optionSelected: "", reasonForChoice: "" }
  ];

  const updateRecommendation = (index: number, field: keyof Recommendation, value: string) => {
    const updatedRecommendations = [...recommendations];
    updatedRecommendations[index] = { ...updatedRecommendations[index], [field]: value };
    updateFormData('recommendations', { 
      ...formData.recommendations, 
      items: updatedRecommendations 
    });
  };

  const addRecommendation = () => {
    const updatedRecommendations = [...recommendations, { priority: "", need: "", advisorRecommendation: "" }];
    updateFormData('recommendations', { 
      ...formData.recommendations, 
      items: updatedRecommendations 
    });
  };

  const removeRecommendation = (index: number) => {
    if (recommendations.length > 1) {
      const updatedRecommendations = recommendations.filter((_, i) => i !== index);
      updateFormData('recommendations', { 
        ...formData.recommendations, 
        items: updatedRecommendations 
      });
    }
  };

  const updateClientDecision = (index: number, field: keyof ClientDecision, value: string) => {
    const updatedDecisions = [...clientDecisions];
    updatedDecisions[index] = { ...updatedDecisions[index], [field]: value };
    updateFormData('clientDecisions', { 
      ...formData.clientDecisions, 
      decisions: updatedDecisions 
    });
  };

  const addClientDecision = () => {
    const updatedDecisions = [...clientDecisions, { optionSelected: "", reasonForChoice: "" }];
    updateFormData('clientDecisions', { 
      ...formData.clientDecisions, 
      decisions: updatedDecisions 
    });
  };

  const removeClientDecision = (index: number) => {
    if (clientDecisions.length > 1) {
      const updatedDecisions = clientDecisions.filter((_, i) => i !== index);
      updateFormData('clientDecisions', { 
        ...formData.clientDecisions, 
        decisions: updatedDecisions 
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Notes Section */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-primary">
            Notes <span className="text-sm text-muted-foreground font-normal">(Capture General Insurance needs if applicable)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Textarea
              value={formData.notes?.generalInsuranceNeeds || ""}
              onChange={(e) => 
                updateFormData('notes', { 
                  ...formData.notes, 
                  generalInsuranceNeeds: e.target.value 
                })
              }
              className="bg-blue-50 border-blue-200 min-h-[200px] resize-none"
              placeholder="Capture general insurance needs and additional notes here..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Recommendations Section */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-primary">Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <div className="min-w-[700px]">
                <div className="grid grid-cols-10 gap-2 bg-muted p-3 rounded-t-lg border border-border font-medium text-sm">
                  <div className="col-span-2">Priority</div>
                  <div className="col-span-3">Need</div>
                  <div className="col-span-4">Advisor's Recommendation</div>
                  <div className="col-span-1">Action</div>
                </div>

                {recommendations.map((rec, index) => (
                  <div key={index} className="grid grid-cols-10 gap-2 p-3 border-l border-r border-b border-border">
                    <div className="col-span-2">
                      <Input
                        value={rec.priority}
                        onChange={(e) => updateRecommendation(index, 'priority', e.target.value)}
                        placeholder="High/Medium/Low"
                        className="bg-blue-50 border-blue-200 h-8 text-sm"
                      />
                    </div>
                    <div className="col-span-3">
                      <Input
                        value={rec.need}
                        onChange={(e) => updateRecommendation(index, 'need', e.target.value)}
                        placeholder="Insurance need"
                        className="bg-blue-50 border-blue-200 h-8 text-sm"
                      />
                    </div>
                    <div className="col-span-4">
                      <Textarea
                        value={rec.advisorRecommendation}
                        onChange={(e) => updateRecommendation(index, 'advisorRecommendation', e.target.value)}
                        placeholder="Advisor's detailed recommendation"
                        className="bg-blue-50 border-blue-200 min-h-[60px] text-sm"
                      />
                    </div>
                    <div className="col-span-1 flex items-start pt-2">
                      {recommendations.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeRecommendation(index)}
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
                onClick={addRecommendation}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Recommendation
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Client's Decision Section */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-primary">Client's Decision</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="overflow-x-auto">
              <div className="min-w-[600px]">
                <div className="grid grid-cols-9 gap-2 bg-muted p-3 rounded-t-lg border border-border font-medium text-sm">
                  <div className="col-span-4">Option(s) Selected</div>
                  <div className="col-span-4">Reasons for Choice</div>
                  <div className="col-span-1">Action</div>
                </div>

                {clientDecisions.map((decision, index) => (
                  <div key={index} className="grid grid-cols-9 gap-2 p-3 border-l border-r border-b border-border">
                    <div className="col-span-4">
                      <Textarea
                        value={decision.optionSelected}
                        onChange={(e) => updateClientDecision(index, 'optionSelected', e.target.value)}
                        placeholder="Selected insurance option"
                        className="bg-blue-50 border-blue-200 min-h-[60px] text-sm"
                      />
                    </div>
                    <div className="col-span-4">
                      <Textarea
                        value={decision.reasonForChoice}
                        onChange={(e) => updateClientDecision(index, 'reasonForChoice', e.target.value)}
                        placeholder="Reason for selecting this option"
                        className="bg-blue-50 border-blue-200 min-h-[60px] text-sm"
                      />
                    </div>
                    <div className="col-span-1 flex items-start pt-2">
                      {clientDecisions.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeClientDecision(index)}
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
                onClick={addClientDecision}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Decision
              </Button>
            </div>

            {/* Replacement Question */}
            <div className="border-t border-border pt-6">
              <div className="space-y-3">
                <Label className="text-sm font-medium text-primary">
                  Would this/these policies replace any Life Insurance/Critical Illness coverage you have now?
                </Label>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="replace-coverage-yes"
                      checked={formData.replacementQuestion?.replacesCoverage === 'yes'}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateFormData('replacementQuestion', { 
                            ...formData.replacementQuestion, 
                            replacesCoverage: 'yes' 
                          });
                        }
                      }}
                    />
                    <Label htmlFor="replace-coverage-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="replace-coverage-no"
                      checked={formData.replacementQuestion?.replacesCoverage === 'no'}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateFormData('replacementQuestion', { 
                            ...formData.replacementQuestion, 
                            replacesCoverage: 'no' 
                          });
                        }
                      }}
                    />
                    <Label htmlFor="replace-coverage-no">No</Label>
                  </div>
                </div>

                {formData.replacementQuestion?.replacesCoverage === 'yes' && (
                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Important:</strong> If you answered "Yes", please ensure all replacement procedures are followed 
                      according to regulatory requirements. Additional documentation may be required.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}