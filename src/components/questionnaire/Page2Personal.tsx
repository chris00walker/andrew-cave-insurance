import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Mail, Phone, MapPin, Briefcase, Heart, Calendar } from "lucide-react";

export default function Page2Personal() {
  const { register, watch, setValue, formState: { errors } } = useFormContext();
  
  const maritalStatus = watch("maritalStatus");
  const gender = watch("gender");
  const healthRating = watch("healthRating");
  const smoker = watch("smoker");

  return (
    <div className="space-y-6">
      <Card className="shadow-md">
        <CardHeader className="border-b pb-4">
          <CardTitle className="text-xl font-bold text-center text-blue-600">
            Know Your Client - Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          
          {/* Basic Personal Information */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-800 flex items-center gap-2">
              <User className="h-5 w-5 text-blue-500" />
              Personal Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName"
                  {...register("firstName")}
                  placeholder="Enter first name" 
                  className="bg-blue-50 border-blue-200"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs">{errors.firstName.message as string}</p>
                )}
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName"
                  {...register("lastName")}
                  placeholder="Enter last name" 
                  className="bg-blue-50 border-blue-200"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs">{errors.lastName.message as string}</p>
                )}
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="dateOfBirth" className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Date of Birth
                </Label>
                <Input 
                  id="dateOfBirth"
                  type="date"
                  {...register("dateOfBirth")}
                  className="bg-blue-50 border-blue-200"
                />
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-xs">{errors.dateOfBirth.message as string}</p>
                )}
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="gender">Gender</Label>
                <Select 
                  value={gender || ""} 
                  onValueChange={(value) => setValue("gender", value)}
                >
                  <SelectTrigger className="bg-blue-50 border-blue-200">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && (
                  <p className="text-red-500 text-xs">{errors.gender.message as string}</p>
                )}
              </div>
            </div>
          </div>
          
          <Separator />
          
          {/* Marital Status */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-800 flex items-center gap-2">
              <Heart className="h-5 w-5 text-blue-500" />
              Marital Status
            </h3>
            
            <RadioGroup 
              value={maritalStatus || ""}
              onValueChange={(value) => setValue("maritalStatus", value)}
              className="grid grid-cols-2 md:grid-cols-5 gap-4"
            >
              {['single', 'married', 'divorced', 'widowed', 'separated'].map((status) => (
                <div className="flex items-center space-x-2" key={status}>
                  <RadioGroupItem value={status} id={`marital-${status}`} />
                  <Label htmlFor={`marital-${status}`} className="capitalize">
                    {status === 'separated' ? 'Common Law' : status}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <Separator />
          
          {/* Contact Information */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-800 flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-500" />
              Contact Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="email" className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <Input 
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder="name@example.com" 
                  className="bg-blue-50 border-blue-200"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message as string}</p>
                )}
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="phone" className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  Contact Number
                </Label>
                <Input 
                  id="phone"
                  {...register("phone")}
                  placeholder="(246) 123-4567" 
                  className="bg-blue-50 border-blue-200"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs">{errors.phone.message as string}</p>
                )}
              </div>
              
              <div className="col-span-1 md:col-span-2 space-y-1">
                <Label htmlFor="address" className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  Address
                </Label>
                <Input 
                  id="address"
                  {...register("address")}
                  placeholder="Street address" 
                  className="bg-blue-50 border-blue-200"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="city">City</Label>
                <Input 
                  id="city"
                  {...register("city")}
                  placeholder="City" 
                  className="bg-blue-50 border-blue-200"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="country">Country</Label>
                <Input 
                  id="country"
                  {...register("country")}
                  placeholder="Country" 
                  defaultValue="Barbados"
                  className="bg-blue-50 border-blue-200"
                />
              </div>
            </div>
          </div>
          
          <Separator />
          
          {/* Employment Information */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-800 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-blue-500" />
              Employment Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="occupation">Current Occupation</Label>
                <Input 
                  id="occupation"
                  {...register("occupation")}
                  placeholder="Job title" 
                  className="bg-blue-50 border-blue-200"
                />
                {errors.occupation && (
                  <p className="text-red-500 text-xs">{errors.occupation.message as string}</p>
                )}
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="employer">Employer</Label>
                <Input 
                  id="employer"
                  {...register("employer")}
                  placeholder="Company name" 
                  className="bg-blue-50 border-blue-200"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="yearsEmployed">Years Employed</Label>
                <Input 
                  id="yearsEmployed"
                  type="number"
                  min="0"
                  {...register("yearsEmployed")}
                  placeholder="0" 
                  className="bg-blue-50 border-blue-200"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="industry">Industry</Label>
                <Input 
                  id="industry"
                  {...register("industry")}
                  placeholder="Industry sector" 
                  className="bg-blue-50 border-blue-200"
                />
              </div>
            </div>
          </div>
          
          <Separator />
          
          {/* Health Information */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-800">Health Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Overall Health Rating</Label>
                <Select 
                  value={healthRating || ""} 
                  onValueChange={(value) => setValue("healthRating", value)}
                >
                  <SelectTrigger className="bg-blue-50 border-blue-200">
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2 mt-6">
                <Checkbox 
                  id="smoker"
                  checked={smoker || false}
                  onCheckedChange={(checked) => setValue("smoker", checked)}
                />
                <Label htmlFor="smoker">Smoker</Label>
              </div>
              
              <div className="col-span-1 md:col-span-2 space-y-1">
                <Label htmlFor="medicalConditions">Existing Medical Conditions</Label>
                <Textarea 
                  id="medicalConditions"
                  {...register("medicalConditions")}
                  placeholder="Please list any existing medical conditions..." 
                  rows={3}
                  className="bg-blue-50 border-blue-200"
                />
              </div>
            </div>
          </div>
          
          <Separator />
          
          {/* Additional Notes */}
          <div className="space-y-1">
            <Label htmlFor="additionalNotes">Additional Notes</Label>
            <Textarea 
              id="additionalNotes"
              {...register("additionalNotes")}
              placeholder="Any other relevant personal information..." 
              rows={3}
              className="bg-blue-50 border-blue-200"
            />
          </div>
          
          {/* Page Footer */}
          <div className="flex justify-between items-center pt-6 border-t">
            <span className="text-sm text-gray-500">2 | P a g e</span>
            <span className="text-sm text-gray-500">Personal Information</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}