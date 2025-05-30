
import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";
<<<<<<< HEAD
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ModeToggle } from "./ThemeToggle";
=======
import { ThemeProvider } from "@/components/providers/ThemeProviders";
>>>>>>> bc1cec65fccfb6c8c511409a174038c6f35dbc62

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
     <html lang="en" suppressHydrationWarning>
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <ThemeProvider attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange 
            >
        <AppSidebar />
        <div className="flex-1 overflow-y-auto">
          <header className="h-16 border-b flex items-center px-6">
            <div className="text-lg font-medium text-gray-700">Maywa</div>
          </header>
          <main className="p-6">
            {children}
          </main>
        </div>
        </ThemeProvider>
      </div>
    </SidebarProvider>
    </html>
  );
}

export default AppLayout;
