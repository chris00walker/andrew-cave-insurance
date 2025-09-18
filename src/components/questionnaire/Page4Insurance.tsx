import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Plus, Trash2, Users, Heart } from "lucide-react";

export default function Page4Insurance() {
  const { register, setValue } = useFormContext();
  const [policies, setPolicies] = useState([
    { id: 1, company: "", type: "", sumAssured: "", premium: "", frequency: "" }
  ]);
  const [dependents, setDependents] = useState([
    { id: 1, name: "", relationship: "", age: "", occupation: "" }
  ]);

  const addPolicy = () => {
    setPolicies([...policies, { 
      id: policies.length + 1, 
      company: "", 
      type: "", 
      sumAssured: "", 
      premium: "", 
      frequency: "" 
    }]);
  };

  const removePolicy = (id: number) => {
    if (policies.length > 1) {
      setPolicies(policies.filter(p => p.id !== id));
    }
  };

  const addDependent = () => {
    setDependents([...dependents, { 
      id: dependents.length + 1, 
      name: "", 
      relationship: "", 
      age: "", 
      occupation: "" 
    }]);
  };

  const removeDependent = (id: number) => {
    if (dependents.length > 1) {
      setDependents(dependents.filter(d => d.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Dependents Section */}
      <Card className="shadow-md">
        <CardHeader className="border-b pb-4 bg-purple-50">
          <CardTitle className="text-xl font-bold text-purple-800 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Family Details & Dependents
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-700">Dependents Information</h3>
              <Button
                type="button"
                onClick={addDependent}
                size="sm"
                variant="outline"
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" />
                Add Dependent
              </Button>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Relationship</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Occupation</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dependents.map((dependent, index) => (
                    <TableRow key={dependent.id}>
                      <TableCell>
                        <Input
                          placeholder="Full name"
                          {...register(`dependent_${index}_name`)}
                          className="min-w-[150px]"
                        />
                      </TableCell>
                      <TableCell>
                        <Select
                          onValueChange={(value) => setValue(`dependent_${index}_relationship`, value)}
                        >
                          <SelectTrigger className="min-w-[120px]">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="spouse">Spouse</SelectItem>
                            <SelectItem value="child">Child</SelectItem>
                            <SelectItem value="parent">Parent</SelectItem>
                            <SelectItem value="sibling">Sibling</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          placeholder="Age"
                          {...register(`dependent_${index}_age`)}
                          className="w-[80px]"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          placeholder="Occupation"
                          {...register(`dependent_${index}_occupation`)}
                          className="min-w-[150px]"
                        />
                      </TableCell>
                      <TableCell>
                        {dependents.length > 1 && (
                          <Button
                            type="button"
                            onClick={() => removeDependent(dependent.id)}
                            size="sm"
                            variant="ghost"
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Existing Insurance Policies */}
      <Card className="shadow-md">
        <CardHeader className="border-b pb-4 bg-blue-50">
          <CardTitle className="text-xl font-bold text-blue-800 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Existing Insurance Portfolio
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-700">Current Insurance Policies</h3>
              <Button
                type="button"
                onClick={addPolicy}
                size="sm"
                variant="outline"
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" />
                Add Policy
              </Button>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Insurance Company</TableHead>
                    <TableHead>Type of Policy</TableHead>
                    <TableHead>Sum Assured</TableHead>
                    <TableHead>Premium</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {policies.map((policy, index) => (
                    <TableRow key={policy.id}>
                      <TableCell>
                        <Input
                          placeholder="Company name"
                          {...register(`policy_${index}_company`)}
                          className="min-w-[150px]"
                        />
                      </TableCell>
                      <TableCell>
                        <Select
                          onValueChange={(value) => setValue(`policy_${index}_type`, value)}
                        >
                          <SelectTrigger className="min-w-[150px]">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="life">Life Insurance</SelectItem>
                            <SelectItem value="health">Health Insurance</SelectItem>
                            <SelectItem value="disability">Disability</SelectItem>
                            <SelectItem value="critical">Critical Illness</SelectItem>
                            <SelectItem value="property">Property</SelectItem>
                            <SelectItem value="auto">Auto</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          placeholder="0.00"
                          {...register(`policy_${index}_sumAssured`)}
                          className="min-w-[120px]"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          placeholder="0.00"
                          {...register(`policy_${index}_premium`)}
                          className="min-w-[100px]"
                        />
                      </TableCell>
                      <TableCell>
                        <Select
                          onValueChange={(value) => setValue(`policy_${index}_frequency`, value)}
                        >
                          <SelectTrigger className="min-w-[120px]">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="quarterly">Quarterly</SelectItem>
                            <SelectItem value="semi-annual">Semi-Annual</SelectItem>
                            <SelectItem value="annual">Annual</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        {policies.length > 1 && (
                          <Button
                            type="button"
                            onClick={() => removePolicy(policy.id)}
                            size="sm"
                            variant="ghost"
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Please provide details of all existing insurance policies including life, health, property, and other coverage.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Beneficiaries */}
      <Card className="shadow-md">
        <CardHeader className="border-b pb-4 bg-green-50">
          <CardTitle className="text-xl font-bold text-green-800 flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Beneficiary Information
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="primaryBeneficiary">Primary Beneficiary</Label>
              <Input
                id="primaryBeneficiary"
                {...register("primaryBeneficiary")}
                placeholder="Full name"
                className="bg-green-50 border-green-200"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="primaryRelationship">Relationship</Label>
              <Input
                id="primaryRelationship"
                {...register("primaryRelationship")}
                placeholder="e.g., Spouse, Child"
                className="bg-green-50 border-green-200"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="contingentBeneficiary">Contingent Beneficiary</Label>
              <Input
                id="contingentBeneficiary"
                {...register("contingentBeneficiary")}
                placeholder="Full name"
                className="bg-green-50 border-green-200"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="contingentRelationship">Relationship</Label>
              <Input
                id="contingentRelationship"
                {...register("contingentRelationship")}
                placeholder="e.g., Parent, Sibling"
                className="bg-green-50 border-green-200"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Page Footer */}
      <div className="flex justify-between items-center pt-6 border-t">
        <span className="text-sm text-gray-500">4 | P a g e</span>
        <span className="text-sm text-gray-500">Insurance Portfolio & Dependents</span>
      </div>
    </div>
  );
}