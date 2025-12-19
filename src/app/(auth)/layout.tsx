import { AppLogo } from "@/components/app-logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
      {/* Header with Logo */}
      <div className="flex-none flex items-center justify-between p-6">
        <AppLogo />
      </div>

      {/* Main Content - Flex 1 to take remaining space */}
      <div className="flex-1 p-2 md:p-6 lg:p-12 overflow-hidden flex flex-col justify-center">
        {children}
      </div>
    </div>
  );
}
