import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";

interface FamilyDetailsSectionProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

interface FamilyMember {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  employmentStatus: string;
  monthlyIncomeRange: string;
}

export function FamilyDetailsSection({ formData, updateFormData }: FamilyDetailsSectionProps) {
  const familyMembers = formData.familyDetails?.members || {
    spouse: { fullName: "", dateOfBirth: "", gender: "", employmentStatus: "", monthlyIncomeRange: "" },
    child1: { fullName: "", dateOfBirth: "", gender: "", employmentStatus: "", monthlyIncomeRange: "" },
    child2: { fullName: "", dateOfBirth: "", gender: "", employmentStatus: "", monthlyIncomeRange: "" },
    child3: { fullName: "", dateOfBirth: "", gender: "", employmentStatus: "", monthlyIncomeRange: "" }
  };

  const updateFamilyMember = (memberType: string, field: keyof FamilyMember, value: string) => {
    const updatedMembers = {
      ...familyMembers,
      [memberType]: { ...familyMembers[memberType], [field]: value }
    };
    updateFormData('familyDetails', { 
      ...formData.familyDetails, 
      members: updatedMembers 
    });
  };

  const incomeRanges = [
    { value: "below-2500", label: "Below $2500" },
    { value: "2501-5000", label: "$2,501 to $5,000" },
    { value: "5001-above", label: "$5,001 & above" }
  ];

  const employmentOptions = [
    { value: "full-time", label: "Full-time" },
    { value: "part-time", label: "Part-time" },
    { value: "self-employed", label: "Self Employed" },
    { value: "unemployed", label: "Unemployed" },
    { value: "retired", label: "Retired" },
    { value: "student", label: "Student" }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-primary">
          Details of Spouse & Dependents (if family coverage is required)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Header Row */}
            <div className="grid grid-cols-12 gap-2 bg-muted p-3 rounded-t-lg border border-border font-medium text-sm">
              <div className="col-span-2">Relationship</div>
              <div className="col-span-2">Full Name</div>
              <div className="col-span-2">Date of Birth (dd/mm/yyyy)</div>
              <div className="col-span-2">Gender</div>
              <div className="col-span-2">Employment Status</div>
              <div className="col-span-2">Monthly Income Range</div>
            </div>

            {/* Spouse Row */}
            <div className="grid grid-cols-12 gap-2 p-3 border-l border-r border-b border-border">
              <div className="col-span-2 flex items-center font-medium text-sm">
                Spouse
              </div>
              <div className="col-span-2">
                <Input
                  value={familyMembers.spouse.fullName}
                  onChange={(e) => updateFamilyMember('spouse', 'fullName', e.target.value)}
                  className="bg-blue-50 border-blue-200 h-8 text-sm"
                />
              </div>
              <div className="col-span-2">
                <Input
                  type="date"
                  value={familyMembers.spouse.dateOfBirth}
                  onChange={(e) => updateFamilyMember('spouse', 'dateOfBirth', e.target.value)}
                  className="bg-blue-50 border-blue-200 h-8 text-sm"
                />
              </div>
              <div className="col-span-2 flex gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="spouse-male"
                    checked={familyMembers.spouse.gender === 'male'}
                    onCheckedChange={(checked) => {
                      if (checked) updateFamilyMember('spouse', 'gender', 'male');
                    }}
                  />
                  <Label htmlFor="spouse-male" className="text-xs">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="spouse-female"
                    checked={familyMembers.spouse.gender === 'female'}
                    onCheckedChange={(checked) => {
                      if (checked) updateFamilyMember('spouse', 'gender', 'female');
                    }}
                  />
                  <Label htmlFor="spouse-female" className="text-xs">Female</Label>
                </div>
              </div>
              <div className="col-span-2">
                <Select 
                  value={familyMembers.spouse.employmentStatus}
                  onValueChange={(value) => updateFamilyMember('spouse', 'employmentStatus', value)}
                >
                  <SelectTrigger className="bg-blue-50 border-blue-200 h-8 text-sm">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {employmentOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <div className="flex gap-1">
                  {incomeRanges.map((range) => (
                    <div key={range.value} className="flex items-center space-x-1">
                      <Checkbox
                        id={`spouse-income-${range.value}`}
                        checked={familyMembers.spouse.monthlyIncomeRange === range.value}
                        onCheckedChange={(checked) => {
                          if (checked) updateFamilyMember('spouse', 'monthlyIncomeRange', range.value);
                        }}
                      />
                      <Label htmlFor={`spouse-income-${range.value}`} className="text-xs">
                        {range.value === 'below-2500' ? 'Below' : 
                         range.value === '2501-5000' ? '$2.5K-5K' : '$5K+'}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Children Rows */}
            {['child1', 'child2', 'child3'].map((childKey, index) => (
              <div key={childKey} className="grid grid-cols-12 gap-2 p-3 border-l border-r border-b border-border">
                <div className="col-span-2 flex items-center font-medium text-sm">
                  Child {index + 1}
                </div>
                <div className="col-span-2">
                  <Input
                    value={familyMembers[childKey].fullName}
                    onChange={(e) => updateFamilyMember(childKey, 'fullName', e.target.value)}
                    className="bg-blue-50 border-blue-200 h-8 text-sm"
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    type="date"
                    value={familyMembers[childKey].dateOfBirth}
                    onChange={(e) => updateFamilyMember(childKey, 'dateOfBirth', e.target.value)}
                    className="bg-blue-50 border-blue-200 h-8 text-sm"
                  />
                </div>
                <div className="col-span-2 flex gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`${childKey}-male`}
                      checked={familyMembers[childKey].gender === 'male'}
                      onCheckedChange={(checked) => {
                        if (checked) updateFamilyMember(childKey, 'gender', 'male');
                      }}
                    />
                    <Label htmlFor={`${childKey}-male`} className="text-xs">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`${childKey}-female`}
                      checked={familyMembers[childKey].gender === 'female'}
                      onCheckedChange={(checked) => {
                        if (checked) updateFamilyMember(childKey, 'gender', 'female');
                      }}
                    />
                    <Label htmlFor={`${childKey}-female`} className="text-xs">Female</Label>
                  </div>
                </div>
                <div className="col-span-2">
                  <Select 
                    value={familyMembers[childKey].employmentStatus}
                    onValueChange={(value) => updateFamilyMember(childKey, 'employmentStatus', value)}
                  >
                    <SelectTrigger className="bg-blue-50 border-blue-200 h-8 text-sm">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      {employmentOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <div className="flex gap-1">
                    {incomeRanges.map((range) => (
                      <div key={range.value} className="flex items-center space-x-1">
                        <Checkbox
                          id={`${childKey}-income-${range.value}`}
                          checked={familyMembers[childKey].monthlyIncomeRange === range.value}
                          onCheckedChange={(checked) => {
                            if (checked) updateFamilyMember(childKey, 'monthlyIncomeRange', range.value);
                          }}
                        />
                        <Label htmlFor={`${childKey}-income-${range.value}`} className="text-xs">
                          {range.value === 'below-2500' ? 'Below' : 
                           range.value === '2501-5000' ? '$2.5K-5K' : '$5K+'}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}