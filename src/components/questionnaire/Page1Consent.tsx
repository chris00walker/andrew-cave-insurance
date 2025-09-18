import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SmartSignature } from "@/components/ui/smart-signature";
import { FileText } from "lucide-react";

export default function Page1Consent() {
  const { register, watch, setValue, formState: { errors } } = useFormContext();
  
  // Watch checkbox values to handle controlled state
  const discloseInfo = watch("discloseInfo");
  const specificProduct = watch("specificProduct");

  return (
    <div className="space-y-6">

      {/* Main Form Card */}
      <Card className="shadow-md">
        <CardHeader className="border-b pb-4">
          <CardTitle className="text-xl font-bold text-center text-orange-600">
            Confidential Fact Find Form
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          
          {/* Basic Information Section */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <Label className="text-sm font-semibold text-gray-600">Confidential Fact Find For</Label>
                <Input 
                  {...register("clientName", { required: "Client name is required" })}
                  placeholder="(Client's Name)" 
                  className="mt-1 text-center"
                />
                {errors.clientName && (
                  <p className="text-red-500 text-xs mt-1">{errors.clientName.message as string}</p>
                )}
              </div>
              
              <div className="text-center">
                <Label className="text-sm font-semibold text-gray-600">By Your Insurance Advisor</Label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <Input 
                    {...register("advisorName", { required: "Advisor name is required" })}
                    placeholder="(Name of Advisor)" 
                    className="text-center text-sm"
                    defaultValue="Andrew Cave"
                  />
                  <Input 
                    {...register("agentNumber")}
                    placeholder="(Agent #)" 
                    className="text-center text-sm"
                  />
                </div>
                {errors.advisorName && (
                  <p className="text-red-500 text-xs mt-1">{errors.advisorName.message as string}</p>
                )}
              </div>
            </div>
          </div>

          {/* Important Notice Section */}
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-orange-900 flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5" />
                Important Notice to Clients
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-orange-800">
              <div>
                <h4 className="font-semibold mb-2">Market Conduct Guideline - Central Bank of Barbados - July 2024</h4>
                
                <div className="mb-3">
                  <p className="font-semibold mb-1">4.0 Scope</p>
                  <p className="mb-3 leading-relaxed">
                    This Guideline is designed to provide a comprehensive framework governing the conduct of all licensees within 
                    Barbados. They apply to a wide range of financial activities and interactions, covering the following key areas: Product 
                    and Service Design; Marketing and Advertising; Sales Practices and Methods of Communication; Customer Interaction 
                    and Support & Fee Structures and Pricing.
                  </p>
                </div>
                
                <div>
                  <p className="font-semibold mb-1">5.0 Market Conduct Obligations</p>
                  <p className="leading-relaxed">
                    Licensees are obligated to engage in fair, transparent, and ethical market conduct at all times. This includes the clear 
                    disclosure of all fees and charges associated with their products and services, ensuring that consumers are fully 
                    informed and able to make informed financial decisions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Application Type Section */}
          <Card className="border-blue-200">
            <CardHeader className="bg-blue-50 py-3">
              <CardTitle className="text-center text-blue-900">Application Type</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-700">Client's Choice:</h4>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm font-medium">1.</span>
                      <Checkbox 
                        id="disclose-info"
                        checked={discloseInfo || false}
                        onCheckedChange={(checked) => setValue("discloseInfo", checked)}
                      />
                    </div>
                    <Label htmlFor="disclose-info" className="text-sm leading-relaxed cursor-pointer">
                      I/we agree to disclose the information requested in this form.
                    </Label>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-sm font-medium">2.</span>
                      <Checkbox 
                        id="specific-product"
                        checked={specificProduct || false}
                        onCheckedChange={(checked) => setValue("specificProduct", checked)}
                      />
                    </div>
                    <Label htmlFor="specific-product" className="text-sm leading-relaxed cursor-pointer">
                      I/we wish to receive information relevant to a specific product or need only.
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Acknowledgment Section */}
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-4">
              <div className="space-y-4">
                <p className="text-sm text-green-800 leading-relaxed">
                  I/we acknowledge that the insurance advisor has provided me/us with a copy of the completed Confidential Fact Find 
                  form. I/we understand that a policy purchased without the proper completion of a "Confidential Fact Find" form may 
                  not be appropriate to your needs.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Advisor's Declaration */}
          <Card className="border-gray-200">
            <CardContent className="pt-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700">Advisor's Declaration:</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  I declare that the information provided to me is strictly confidential and is only to be used for the purpose of fact-
                  finding in the process of recommending suitable insurance products and shall not be used for any other purposes.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Signature Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <Card className="border-gray-200">
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-700">Signature of Client (on behalf of all persons to be insured)</h4>
                  <SmartSignature
                    id="clientSignature"
                    name="clientSignature"
                    value={watch("clientSignature") || ""}
                    onChange={(value) => setValue("clientSignature", value)}
                    onBlur={() => {}}
                    placeholder="Digital Signature"
                    required={true}
                    error={errors.clientSignature?.message as string}
                  />
                  <div>
                    <Label className="text-sm text-gray-600">Date:</Label>
                    <Input 
                      type="date" 
                      {...register("clientSignatureDate")}
                      defaultValue={new Date().toISOString().split('T')[0]}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-gray-200">
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-700">Signature of Advisor</h4>
                  <SmartSignature
                    id="advisorSignature"
                    name="advisorSignature"
                    value={"Andrew Cave"}
                    onChange={(value) => setValue("advisorSignature", value)}
                    placeholder="Advisor Digital Signature"
                    readOnly={true}
                    defaultValue="Andrew Cave"
                  />
                  <div>
                    <Label className="text-sm text-gray-600">Date:</Label>
                    <Input 
                      type="date" 
                      {...register("advisorSignatureDate")}
                      defaultValue={new Date().toISOString().split('T')[0]}
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Page Footer */}
          <div className="flex justify-between items-center pt-6 border-t">
            <span className="text-sm text-gray-500">1 | P a g e</span>
            <span className="text-sm text-gray-500">Version 2.0</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}