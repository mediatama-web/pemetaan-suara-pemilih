import {
  ArrowUpCircleIcon,
  FileText,
  IdCard,
  LayoutDashboardIcon,
  MapPinned,
  UsersIcon
} from "lucide-react"
import * as React from "react"

import { NavMain } from "@/Components/nav-main"
import { NavUser } from "@/Components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/Components/ui/sidebar"
import { usePage } from "@inertiajs/react"

const data = {

  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
      role: ["superadmin", "korlap", "kormas"],
    },
    {
      title: "Kecamatan",
      url: "/kecamatan",
      icon: MapPinned,
      role: ["superadmin"],
    },
    {
      title: "Kelurahan",
      url: "/kelurahan",
      icon: MapPinned  ,
      role: ["superadmin"],
    },
    {
      title: "Data Pemilih",
      url: "/datapemilih",
      icon: IdCard,
      role: ["superadmin", "korlap", "kormas"],
    },
    {
      title: "Laporan",
      url: "#",
      icon: FileText,
      role: ["superadmin", "korlap", "kormas"],
    },
    {
      title: "Team",
      url: "/team",
      icon: UsersIcon,
      role: ["superadmin"],
    },
    {
      title: "Korlap",
      url: "#",
      icon: UsersIcon,
      role: ["superadmin"],
    },
    {
      title: "Kormas",
      url: "#",
      icon: UsersIcon,
      role: ["superadmin"],
    },
  ],
  // navClouds: [
  //   {
  //     title: "Capture",
  //     icon: CameraIcon,
  //     isActive: true,
  //     url: "#",
  //     items: [
  //       {
  //         title: "Active Proposals",
  //         url: "#",
  //       },
  //       {
  //         title: "Archived",
  //         url: "#",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Proposal",
  //     icon: FileTextIcon,
  //     url: "#",
  //     items: [
  //       {
  //         title: "Active Proposals",
  //         url: "#",
  //       },
  //       {
  //         title: "Archived",
  //         url: "#",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Prompts",
  //     icon: FileCodeIcon,
  //     url: "#",
  //     items: [
  //       {
  //         title: "Active Proposals",
  //         url: "#",
  //       },
  //       {
  //         title: "Archived",
  //         url: "#",
  //       },
  //     ],
  //   },
  // ],
  // navSecondary: [
  //   {
  //     title: "Settings",
  //     url: "#",
  //     icon: SettingsIcon,
  //   },
  //   {
  //     title: "Get Help",
  //     url: "#",
  //     icon: HelpCircleIcon,
  //   },
  //   {
  //     title: "Search",
  //     url: "#",
  //     icon: SearchIcon,
  //   },
  // ],
  // documents: [
  //   {
  //     name: "Data Library",
  //     url: "#",
  //     icon: DatabaseIcon,
  //   },
  //   {
  //     name: "Reports",
  //     url: "#",
  //     icon: ClipboardListIcon,
  //   },
  //   {
  //     name: "Word Assistant",
  //     url: "#",
  //     icon: FileIcon,
  //   },
  // ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {auth} = usePage().props
  
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">PENDATAAN</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={auth?.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
