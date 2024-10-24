"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  //   NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  //   NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

import React from "react";
import { cn } from "@/lib/utils";

const navLinks: { title: string; href: string; description: string }[] = [
  {
    title: "RSC Example",
    href: "/docs/primitives/alert-dialog",
    description: "Protecting React Server Component.",
  },
  {
    title: "Middleware Example",
    href: "/middleware",
    description: "Using Middleware to protect pages and APIs.",
  },
  {
    title: "Route Handler Example",
    href: "/docs/primitives/progress",
    description: "Getting the session inside an API route.",
  },
];

const Navbar = () => {
  return (
    <nav className="border-b w-full flex items-center">
      <div className="flex w-full items-center justify-between my-4">
        <Link className="font-bold" href="/">
          Home
        </Link>

        <div className="flex items-center gap-x-5">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Server Side</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[400px] ">
                    {navLinks.map((navLink) => (
                      <ListItem
                        key={navLink.title}
                        title={navLink.title}
                        href={navLink.href}
                      >
                        {navLink.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/docs" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Client Side
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-x-5">
          <Link href="/sign-in">
            <div className="bg-zinc-950 border border-zinc-700 px-5 py-2 rounded-sm hover:bg-zinc-700">
              Login
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default Navbar;
