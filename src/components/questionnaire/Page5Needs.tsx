import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Target, TrendingUp, Shield, GraduationCap, Home, Plane } from "lucide-react";

export default function Page5Needs() {
  const { register, watch, setValue } = useFormContext();
  
  // Watch values for controlled components
  const retirementAge = watch("retirementAge");
  const riskTolerance = watch("riskTolerance");
  const investmentExperience = watch("investmentExperience");
  
  // Protection needs checkboxes
  const lifeInsurance = watch("lifeInsurance");
  const healthInsurance = watch("healthInsurance");
  const disabilityInsurance = watch("disabilityInsurance");
  const criticalIllness = watch("criticalIllness");
  const propertyInsurance = watch("propertyInsurance");
  const travelInsurance = watch("travelInsurance");

  return (
    <div className="space-y-6">
      {/* Protection Needs */}
      <Card className="shadow-md">
        <CardHeader className="border-b pb-4 bg-red-50">
          <CardTitle className="text-xl font-bold text-red-800 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Protection Needs Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700 mb-4">What types of insurance protection do you need?</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="lifeInsurance"
                  checked={lifeInsurance || false}
                  onCheckedChange={(checked) => setValue("lifeInsurance", checked)}
                />
                <Label htmlFor="lifeInsurance" className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-500" />
                  Life Insurance
                </Label>
              </div>
              
              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="healthInsurance"
                  checked={healthInsurance || false}
                  onCheckedChange={(checked) => setValue("healthInsurance", checked)}
                />
                <Label htmlFor="healthInsurance" className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-green-500" />
                  Health Insurance
                </Label>
              </div>
              
              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="disabilityInsurance"
                  checked={disabilityInsurance || false}
                  onCheckedChange={(checked) => setValue("disabilityInsurance", checked)}
                />
                <Label htmlFor="disabilityInsurance" className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-orange-500" />
                  Disability Insurance
                </Label>
              </div>
              
              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="criticalIllness"
                  checked={criticalIllness || false}
                  onCheckedChange={(checked) => setValue("criticalIllness", checked)}
                />
                <Label htmlFor="criticalIllness" className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-red-500" />
                  Critical Illness
                </Label>
              </div>
              
              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="propertyInsurance"
                  checked={propertyInsurance || false}
                  onCheckedChange={(checked) => setValue("propertyInsurance", checked)}
                />
                <Label htmlFor="propertyInsurance" className="flex items-center gap-2">
                  <Home className="h-4 w-4 text-purple-500" />
                  Property Insurance
                </Label>
              </div>
              
              <div className="flex items-center space-x-3">
                <Checkbox 
                  id="travelInsurance"
                  checked={travelInsurance || false}
                  onCheckedChange={(checked) => setValue("travelInsurance", checked)}
                />
                <Label htmlFor="travelInsurance" className="flex items-center gap-2">
                  <Plane className="h-4 w-4 text-indigo-500" />
                  Travel Insurance
                </Label>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label htmlFor="protectionPriority">What is your primary protection concern?</Label>
              <Textarea
                id="protectionPriority"
                {...register("protectionPriority")}
                placeholder="Describe your main concerns about protecting your family and assets..."
                rows={3}
                className="bg-red-50 border-red-200"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Investment & Savings Goals */}
      <Card className="shadow-md">
        <CardHeader className="border-b pb-4 bg-green-50">
          <CardTitle className="text-xl font-bold text-green-800 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Investment & Savings Goals
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="savingsGoal">Monthly Savings Goal</Label>
                <Input
                  id="savingsGoal"
                  type="number"
                  step="0.01"
                  {...register("savingsGoal")}
                  placeholder="0.00"
                  className="bg-green-50 border-green-200"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="investmentAmount">Available for Investment</Label>
                <Input
                  id="investmentAmount"
                  type="number"
                  step="0.01"
                  {...register("investmentAmount")}
                  placeholder="0.00"
                  className="bg-green-50 border-green-200"
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <Label>Risk Tolerance</Label>
              <RadioGroup 
                value={riskTolerance || ""}
                onValueChange={(value) => setValue("riskTolerance", value)}
                className="grid grid-cols-1 md:grid-cols-4 gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="conservative" id="conservative" />
                  <Label htmlFor="conservative">Conservative</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="moderate" id="moderate" />
                  <Label htmlFor="moderate">Moderate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="aggressive" id="aggressive" />
                  <Label htmlFor="aggressive">Aggressive</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="very-aggressive" id="very-aggressive" />
                  <Label htmlFor="very-aggressive">Very Aggressive</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-1">
              <Label>Investment Experience</Label>
              <Select 
                value={investmentExperience || ""} 
                onValueChange={(value) => setValue("investmentExperience", value)}
              >
                <SelectTrigger className="bg-green-50 border-green-200">
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Experience</SelectItem>
                  <SelectItem value="limited">Limited Experience</SelectItem>
                  <SelectItem value="moderate">Moderate Experience</SelectItem>
                  <SelectItem value="extensive">Extensive Experience</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="investmentGoals">Investment Goals & Objectives</Label>
              <Textarea
                id="investmentGoals"
                {...register("investmentGoals")}
                placeholder="Describe your investment goals, time horizon, and what you hope to achieve..."
                rows={3}
                className="bg-green-50 border-green-200"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Retirement Planning */}
      <Card className="shadow-md">
        <CardHeader className="border-b pb-4 bg-blue-50">
          <CardTitle className="text-xl font-bold text-blue-800 flex items-center gap-2">
            <Target className="h-5 w-5" />
            Retirement Planning
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Desired Retirement Age</Label>
                <Select 
                  value={retirementAge || ""} 
                  onValueChange={(value) => setValue("retirementAge", value)}
                >
                  <SelectTrigger className="bg-blue-50 border-blue-200">
                    <SelectValue placeholder="Select age" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="55">55</SelectItem>
                    <SelectItem value="60">60</SelectItem>
                    <SelectItem value="62">62</SelectItem>
                    <SelectItem value="65">65</SelectItem>
                    <SelectItem value="67">67</SelectItem>
                    <SelectItem value="70">70</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="retirementIncome">Desired Monthly Retirement Income</Label>
                <Input
                  id="retirementIncome"
                  type="number"
                  step="0.01"
                  {...register("retirementIncome")}
                  placeholder="0.00"
                  className="bg-blue-50 border-blue-200"
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="retirementPlans">Current Retirement Plans & Concerns</Label>
              <Textarea
                id="retirementPlans"
                {...register("retirementPlans")}
                placeholder="Describe your current retirement savings, pension plans, and any concerns about retirement..."
                rows={3}
                className="bg-blue-50 border-blue-200"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Education & Other Goals */}
      <Card className="shadow-md">
        <CardHeader className="border-b pb-4 bg-purple-50">
          <CardTitle className="text-xl font-bold text-purple-800 flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Education & Other Financial Goals
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="educationFunding">Education Funding Needs</Label>
                <Input
                  id="educationFunding"
                  type="number"
                  step="0.01"
                  {...register("educationFunding")}
                  placeholder="0.00"
                  className="bg-purple-50 border-purple-200"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="emergencyFund">Emergency Fund Goal</Label>
                <Input
                  id="emergencyFund"
                  type="number"
                  step="0.01"
                  {...register("emergencyFund")}
                  placeholder="0.00"
                  className="bg-purple-50 border-purple-200"
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="otherGoals">Other Financial Goals</Label>
              <Textarea
                id="otherGoals"
                {...register("otherGoals")}
                placeholder="Describe any other financial goals such as buying a home, starting a business, travel plans, etc..."
                rows={3}
                className="bg-purple-50 border-purple-200"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Page Footer */}
      <div className="flex justify-between items-center pt-6 border-t">
        <span className="text-sm text-gray-500">5 | P a g e</span>
        <span className="text-sm text-gray-500">Needs Analysis & Financial Goals</span>
      </div>
    </div>
  );
}