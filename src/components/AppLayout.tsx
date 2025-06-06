
import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ModeToggle } from "./ThemeToggle";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <ThemeProvider 
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange 
    >
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <div className="flex-1 overflow-y-auto">
            <header className="h-16 border-b flex items-center px-6">
              <div className="text-lg font-medium text-gray-700">Maywa</div>
              <div className="ml-auto">
                <ModeToggle />
              </div>
            </header>
            <main className="p-6">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default AppLayout;
