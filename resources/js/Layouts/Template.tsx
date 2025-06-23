import { AppSidebar } from "@/Components/app-sidebar";
import { SiteHeader } from "@/Components/site-header";
import { SidebarInset, SidebarProvider } from "@/Components/ui/sidebar";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';

export default function Template({children, title}: {children: React.ReactNode, title?: string}) {
  const { props } = usePage();
    const flash = props.flash as {
      success?: string;
        error?: string;
    }

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash.success, flash.error]);
    return (
      <SidebarProvider>
        <Toaster />
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader title={title} />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                {children}
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
  )
}
