import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { DollarSign, TrendingUp, TrendingDown, PiggyBank, Calculator } from "lucide-react";

export default function Page3Financial() {
  const { register, watch } = useFormContext();
  
  // Watch values for calculations
  const monthlyIncome = watch("monthlyIncome") || "0";
  const otherIncome = watch("otherIncome") || "0";
  const monthlyExpenses = watch("monthlyExpenses") || "0";
  const assets = watch("assets") || "0";
  const liabilities = watch("liabilities") || "0";
  
  // Calculate totals
  const totalIncome = parseFloat(monthlyIncome) + parseFloat(otherIncome);
  const netCashFlow = totalIncome - parseFloat(monthlyExpenses);
  const netWorth = parseFloat(assets) - parseFloat(liabilities);

  return (
    <div className="space-y-6">
      {/* Income Section */}
      <Card className="shadow-md">
        <CardHeader className="border-b pb-4 bg-green-50">
          <CardTitle className="text-xl font-bold text-green-800 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Income Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="monthlyIncome" className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                Monthly Employment Income
              </Label>
              <Input 
                id="monthlyIncome"
                type="number"
                step="0.01"
                {...register("monthlyIncome")}
                placeholder="0.00" 
                className="bg-green-50 border-green-200"
              />
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="otherIncome" className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                Other Monthly Income
              </Label>
              <Input 
                id="otherIncome"
                type="number"
                step="0.01"
                {...register("otherIncome")}
                placeholder="0.00" 
                className="bg-green-50 border-green-200"
              />
            </div>
          </div>
          
          <div className="bg-green-100 p-3 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-green-800">Total Monthly Income:</span>
              <span className="text-xl font-bold text-green-900">
                ${totalIncome.toFixed(2)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expenses Section */}
      <Card className="shadow-md">
        <CardHeader className="border-b pb-4 bg-red-50">
          <CardTitle className="text-xl font-bold text-red-800 flex items-center gap-2">
            <TrendingDown className="h-5 w-5" />
            Monthly Expenses
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="monthlyExpenses" className="flex items-center gap-1">
                <Calculator className="h-4 w-4" />
                Total Monthly Expenses
              </Label>
              <Input 
                id="monthlyExpenses"
                type="number"
                step="0.01"
                {...register("monthlyExpenses")}
                placeholder="0.00" 
                className="bg-red-50 border-red-200"
              />
              <p className="text-xs text-gray-600 mt-1">
                Include: Rent/Mortgage, Utilities, Food, Transportation, Insurance, etc.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cash Flow Summary */}
      <Card className="shadow-md border-blue-200">
        <CardHeader className="border-b pb-4 bg-blue-50">
          <CardTitle className="text-xl font-bold text-blue-800 flex items-center gap-2">
            <PiggyBank className="h-5 w-5" />
            Cash Flow Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Total Monthly Income</TableCell>
                <TableCell className="text-right text-green-600 font-semibold">
                  ${totalIncome.toFixed(2)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Total Monthly Expenses</TableCell>
                <TableCell className="text-right text-red-600 font-semibold">
                  ${parseFloat(monthlyExpenses).toFixed(2)}
                </TableCell>
              </TableRow>
              <TableRow className="border-t-2">
                <TableCell className="font-bold">Net Monthly Cash Flow</TableCell>
                <TableCell className={`text-right font-bold text-lg ${
                  netCashFlow >= 0 ? 'text-green-700' : 'text-red-700'
                }`}>
                  ${netCashFlow.toFixed(2)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Assets & Liabilities */}
      <Card className="shadow-md">
        <CardHeader className="border-b pb-4">
          <CardTitle className="text-xl font-bold text-center text-blue-600">
            Assets & Liabilities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Assets */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-green-700">Assets</h3>
              <div className="space-y-1">
                <Label htmlFor="assets">Total Assets Value</Label>
                <Input 
                  id="assets"
                  type="number"
                  step="0.01"
                  {...register("assets")}
                  placeholder="0.00" 
                  className="bg-green-50 border-green-200"
                />
                <p className="text-xs text-gray-600 mt-1">
                  Include: Property, Vehicles, Savings, Investments, etc.
                </p>
              </div>
            </div>
            
            {/* Liabilities */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-red-700">Liabilities</h3>
              <div className="space-y-1">
                <Label htmlFor="liabilities">Total Liabilities</Label>
                <Input 
                  id="liabilities"
                  type="number"
                  step="0.01"
                  {...register("liabilities")}
                  placeholder="0.00" 
                  className="bg-red-50 border-red-200"
                />
                <p className="text-xs text-gray-600 mt-1">
                  Include: Mortgages, Loans, Credit Cards, etc.
                </p>
              </div>
            </div>
          </div>
          
          <Separator />
          
          {/* Net Worth Calculation */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg text-gray-800">Net Worth:</span>
              <span className={`text-2xl font-bold ${
                netWorth >= 0 ? 'text-green-700' : 'text-red-700'
              }`}>
                ${netWorth.toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              Net Worth = Total Assets - Total Liabilities
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Page Footer */}
      <div className="flex justify-between items-center pt-6 border-t">
        <span className="text-sm text-gray-500">3 | P a g e</span>
        <span className="text-sm text-gray-500">Financial Information</span>
      </div>
    </div>
  );
}