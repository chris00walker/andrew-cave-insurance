import { GuardianLogo } from "./guardian-logo";

export function FormHeader() {
  return (
    <div className="bg-white border-b border-border p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
          <GuardianLogo />
          
          <div className="text-sm text-muted-foreground md:text-right space-y-1">
            <div className="font-medium text-primary">Guardian Life of the Caribbean Ltd.</div>
            <div>Enfield House</div>
            <div>Upper Collymore Rock, St. Michael</div>
            <div>Barbados</div>
            <div>t: +1 (246) 430-4675</div>
            <div className="text-blue-600 hover:text-blue-800">
              <a href="mailto:info@myguardiangroup.com">www.myguardiangroup.com</a>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-orange-600 mb-2">
            Confidential Fact Find Form
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm border border-border rounded-lg overflow-hidden">
            <div className="bg-muted p-3 font-medium text-center">
              Confidential Fact Find For
            </div>
            <div className="bg-muted p-3 font-medium text-center">
              By Your Insurance Advisor
            </div>
            <div className="p-3 text-center text-muted-foreground">
              (Client's Name)
            </div>
            <div className="p-3 text-center text-muted-foreground">
              (Name of Advisor) (Agent #)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}