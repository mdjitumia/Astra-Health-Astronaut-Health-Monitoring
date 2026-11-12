"use client";

import { useApp } from "@/lib/store";
import { AppSidebar, MobileNav, TopBar, Footer } from "@/components/app-shell";
import { DashboardModule } from "@/components/modules/dashboard";
import { PersonalModule } from "@/components/modules/personal";
import { RiskModule } from "@/components/modules/risk";
import { CountermeasureModule } from "@/components/modules/countermeasure";
import { DeepSpaceModule } from "@/components/modules/deepspace";
import { CopilotModule } from "@/components/modules/copilot";
import { RadiationModule } from "@/components/modules/radiation";

export default function Home() {
  const { active } = useApp();

  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Ambient background blobs — varied colors for visual depth through glass */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-40 top-0 h-[600px] w-[600px] rounded-full bg-cyan-500/[0.12] blur-[100px]" />
        <div className="absolute right-0 top-1/3 h-[700px] w-[700px] rounded-full bg-teal-500/[0.08] blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-[550px] w-[550px] rounded-full bg-violet-500/[0.06] blur-[100px]" />
        <div className="absolute left-1/2 top-1/4 h-[400px] w-[400px] rounded-full bg-cyan-400/[0.06] blur-[80px]" />
      </div>
      <div className="relative z-10 flex flex-1">
        <AppSidebar />
        <MobileNav />
        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar />
          <main className="flex-1 px-4 py-5 lg:px-6 min-w-0">
            <div key={active} className="mx-auto max-w-7xl animate-fade-in">
              {active === "dashboard" && <DashboardModule />}
              {active === "personal" && <PersonalModule />}
              {active === "risk" && <RiskModule />}
              {active === "countermeasure" && <CountermeasureModule />}
              {active === "deepspace" && <DeepSpaceModule />}
              {active === "copilot" && <CopilotModule />}
              {active === "radiation" && <RadiationModule />}
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
