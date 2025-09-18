import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Alert, AlertDescription } from "../ui/alert";

export function ImportantNoticeSection() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-primary">Important Notice to Clients</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertDescription>
            <div className="font-medium text-primary mb-2">
              Market Conduct Guideline - Central Bank of Barbados - July 2024
            </div>
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-primary mb-2">4.0 Scope</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This Guideline is designed to provide a comprehensive framework governing the conduct of all licensees within 
              Barbados. They apply to a wide array of financial activities and interactions, covering the following key areas: Product 
              and Service Design; Marketing and Advertising; Sales Practices and Methods of Communication; Customer Interaction 
              and Support & Fee Structures and Pricing.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-primary mb-2">5.0 Market Conduct Obligations</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Licensees are obligated to engage in fair, transparent, and ethical market conduct at all times. This includes the clear 
              disclosure of all fees and charges associated with their products and services, ensuring that consumers are fully 
              informed and able to make informed financial decisions.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}