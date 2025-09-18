export function GuardianLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        {/* Guardian Group Logo - Simplified geometric version */}
        <div className="w-12 h-12 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-purple-600 rounded-lg transform rotate-12"></div>
          <div className="absolute inset-1 bg-gradient-to-br from-yellow-400 via-orange-400 to-purple-500 rounded-lg transform rotate-6"></div>
          <div className="absolute inset-2 bg-gradient-to-br from-yellow-300 via-orange-300 to-purple-400 rounded-lg"></div>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-semibold text-primary">Guardian Group</span>
        <span className="text-sm text-muted-foreground">Guardian Life of The Caribbean Limited</span>
      </div>
    </div>
  );
}