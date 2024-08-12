"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import LogoSvgIcon from "../../../../public/proprio-to.svg";

import { CircleUser, Menu, Search, ChevronRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { DashboardLink, dashboardLink } from "@/lib/constant/dashboardLink";

export default function NavBarDashboard() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background z-20 mx-0 md:mx-6 px-4 md:px-0 ">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 w-full">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Image src={LogoSvgIcon} alt="logo SVG" width={50} height={50} />
          <span className=" sr-only w-full ">Proprio-to</span>
        </Link>
        {DashboardLink.map((e: dashboardLink, index: number) => {
          return (
            <DropdownMenu key={index}>
              <DropdownMenuTrigger asChild>
                <Link
                  href={e.bottom_Link.length === 0 ? e.href : "#"}
                  className={clsx(
                    "text-muted-foreground transition-colors hover:text-foreground",
                    {
                      "text-black": pathname === e.href,
                    }
                  )}
                >
                  {e.label}
                </Link>
              </DropdownMenuTrigger>
              {e.bottom_Link.length !== 0 && (
                <DropdownMenuContent className="grid gap-2">
                  {e.bottom_Link.map((e, index: number) => {
                    return (
                      <DropdownMenuLabel
                        key={index}
                        asChild
                        className="hover:bg-stone-100 hover:text-black"
                      >
                        <Link
                          href={e.href}
                          className={clsx("text-muted-foreground", {
                            "text-black": pathname === e.href,
                          })}
                        >
                          {e.label}
                        </Link>
                      </DropdownMenuLabel>
                    );
                  })}
                </DropdownMenuContent>
              )}
            </DropdownMenu>
          );
        })}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Image src={LogoSvgIcon} alt="logo SVG" width={40} height={40} />
              <span className="sr-only">Acme Inc</span>
            </Link>
            {DashboardLink.map((e: dashboardLink, index: number) => {
              return (
                <Collapsible key={index}>
                  <CollapsibleTrigger
                    asChild
                    className="flex w-full items-center text-lg font-semibold [&[data-state=open]>svg]:rotate-90 text-muted-foreground"
                  >
                    <Link href={e.href}>
                      {e.label}
                      <ChevronRightIcon className="ml-auto h-5 w-5 transition-all" />
                    </Link>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    {e.bottom_Link.map((e, index: number) => {
                      return (
                        <div key={index} className=" grid gap-6 py-3 border-b">
                          <Link
                            href={e.href}
                            className="group grid h-auto w-full justify-start gap-1"
                            prefetch={false}
                          >
                            <div className="text-sm font-medium leading-none group-hover:underline">
                              {e.label}
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                  </CollapsibleContent>
                </Collapsible>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-3 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
