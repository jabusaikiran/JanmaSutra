"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Book, Calendar, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Family Layer", href: "/family", icon: Users },
    { name: "Calendar", href: "/calendar", icon: Calendar },
    { name: "Our Story", href: "/story", icon: Book },
  ];

  return (
    <header className="mb-6 sm:mb-12">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-0">
        <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-saffron rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-saffron/20 group-hover:scale-105 transition-transform">
            <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white" />
          </div>
          <span className="text-xl sm:text-2xl font-serif tracking-tight font-bold">
            Janma <span className="text-saffron font-normal">Sutra</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2 bg-stone-100 p-1 rounded-2xl border border-stone-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all",
                  isActive 
                    ? "bg-white text-stone-900 shadow-sm" 
                    : "text-stone-500 hover:text-stone-800 hover:bg-stone-50"
                )}
              >
                <Icon className={cn("w-3.5 h-3.5", isActive ? "text-saffron" : "text-stone-400")} />
                <span className="hidden md:inline">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="h-px bg-stone-200 mt-6 sm:mt-8 w-full opacity-50" />
    </header>
  );
}
