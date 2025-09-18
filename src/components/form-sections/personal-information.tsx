import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Checkbox } from "../ui/checkbox";

interface PersonalInformationSectionProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

export function PersonalInformationSection({ formData, updateFormData }: PersonalInformationSectionProps) {
  const maritalStatusOptions = [
    { value: "single", label: "Single" },
    { value: "married", label: "Married" },
    { value: "divorced", label: "Divorced" },
    { value: "widowed", label: "Widowed" },
    { value: "separated", label: "Separated" }
  ];

  const employmentStatusOptions = [
    { value: "full-time", label: "Full-time" },
    { value: "part-time", label: "Part-Time" },
    { value: "self-employed", label: "Self Employed" },
    { value: "other", label: "Other" }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-primary">Know Your Client</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Personal Information */}
        <div>
          <h4 className="font-medium text-primary mb-4">Personal Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="full-name">Full Name:</Label>
              <Input
                id="full-name"
                value={formData.personalInfo?.fullName || ""}
                onChange={(e) => 
                  updateFormData('personalInfo', { 
                    ...formData.personalInfo, 
                    fullName: e.target.value 
                  })
                }
                className="bg-blue-50 border-blue-200"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="id-passport">ID/DL/PP#:</Label>
              <Input
                id="id-passport"
                value={formData.personalInfo?.idPassport || ""}
                onChange={(e) => 
                  updateFormData('personalInfo', { 
                    ...formData.personalInfo, 
                    idPassport: e.target.value 
                  })
                }
                className="bg-blue-50 border-blue-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date-of-birth">Date of Birth (dd/mm/yyyy):</Label>
              <Input
                id="date-of-birth"
                type="date"
                value={formData.personalInfo?.dateOfBirth || ""}
                onChange={(e) => 
                  updateFormData('personalInfo', { 
                    ...formData.personalInfo, 
                    dateOfBirth: e.target.value 
                  })
                }
                className="bg-blue-50 border-blue-200"
              />
            </div>

            <div></div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address:</Label>
              <Input
                id="email"
                type="email"
                value={formData.personalInfo?.email || ""}
                onChange={(e) => 
                  updateFormData('personalInfo', { 
                    ...formData.personalInfo, 
                    email: e.target.value 
                  })
                }
                className="bg-blue-50 border-blue-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-number">Contact Number:</Label>
              <Input
                id="contact-number"
                type="tel"
                value={formData.personalInfo?.contactNumber || ""}
                onChange={(e) => 
                  updateFormData('personalInfo', { 
                    ...formData.personalInfo, 
                    contactNumber: e.target.value 
                  })
                }
                className="bg-blue-50 border-blue-200"
              />
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <Label>Marital Status:</Label>
            <div className="flex flex-wrap gap-4">
              {maritalStatusOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`marital-${option.value}`}
                    checked={formData.personalInfo?.maritalStatus === option.value}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        updateFormData('personalInfo', { 
                          ...formData.personalInfo, 
                          maritalStatus: option.value 
                        });
                      }
                    }}
                  />
                  <Label htmlFor={`marital-${option.value}`} className="text-sm">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Employment Details */}
        <div>
          <h4 className="font-medium text-primary mb-4">Employment Details of Applicant to be Insured</h4>
          <div className="space-y-4">
            <div>
              <Label>Employment Status:</Label>
              <div className="flex flex-wrap gap-4 mt-2">
                {employmentStatusOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`employment-${option.value}`}
                      checked={formData.employmentDetails?.status === option.value}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateFormData('employmentDetails', { 
                            ...formData.employmentDetails, 
                            status: option.value 
                          });
                        }
                      }}
                    />
                    <Label htmlFor={`employment-${option.value}`} className="text-sm">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="monthly-income">Monthly Income:</Label>
                <Input
                  id="monthly-income"
                  value={formData.employmentDetails?.monthlyIncome || ""}
                  onChange={(e) => 
                    updateFormData('employmentDetails', { 
                      ...formData.employmentDetails, 
                      monthlyIncome: e.target.value 
                    })
                  }
                  className="bg-blue-50 border-blue-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="current-occupation">Current Occupation:</Label>
                <Input
                  id="current-occupation"
                  value={formData.employmentDetails?.currentOccupation || ""}
                  onChange={(e) => 
                    updateFormData('employmentDetails', { 
                      ...formData.employmentDetails, 
                      currentOccupation: e.target.value 
                    })
                  }
                  className="bg-blue-50 border-blue-200"
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}