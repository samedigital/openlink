"use client";

import { LayoutDashboard, Link as LinkIcon, Palette, Settings, BarChart3, Menu, Bell, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-neutral-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-neutral-100">
          <Link href="/" className="font-bold text-xl tracking-tight text-indigo-600 flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <LinkIcon className="text-white w-5 h-5" />
            </div>
            OpenLink
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <NavItem href="/admin" icon={<LayoutDashboard size={20} />} label="Dashboard" active={pathname === "/admin"} />
          <NavItem href="/admin/links" icon={<LinkIcon size={20} />} label="Links" active={pathname === "/admin/links"} />
          <NavItem href="/admin/appearance" icon={<Palette size={20} />} label="Appearance" active={pathname === "/admin/appearance"} />
          <NavItem href="/admin/analytics" icon={<BarChart3 size={20} />} label="Analytics" active={pathname === "/admin/analytics"} />
          <NavItem href="/admin/settings" icon={<Settings size={20} />} label="Settings" active={pathname === "/admin/settings"} />
        </nav>

        <div className="p-4 border-t border-neutral-100 space-y-2">
          <div className="flex items-center gap-3 px-1">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm shrink-0">
              O
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">My Profile</p>
              <p className="text-xs text-neutral-500">Free Plan</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-neutral-500 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="md:hidden">
            <button className="p-2 -ml-2 text-neutral-600 hover:bg-neutral-100 rounded-md">
              <Menu size={24} />
            </button>
          </div>
          <div className="flex-1 md:flex-none" />

          <div className="flex items-center gap-4">
            <button className="text-neutral-500 hover:text-neutral-900 transition-colors">
              <Bell size={20} />
            </button>
            <div className="hidden sm:flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Live
            </div>
            <Link
              href="/"
              target="_blank"
              className="px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors"
            >
              View Profile
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

function NavItem({ href, icon, label, active = false }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
        active
          ? "bg-indigo-50 text-indigo-700"
          : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}
