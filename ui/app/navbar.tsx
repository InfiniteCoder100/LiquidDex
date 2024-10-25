"use client";
import { ConnectButton } from "./components/connect-button";
import { ModeToggle } from "./components/mode-toggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/app/components/ui_comp/navigation-menu";
import Link from "next/link";

const Navbar = () => {
  return (
    <div id="navbar" className="flex justify-between p-4 mb-6 items-center">
      {/* Left-aligned LiquidDex item */}
      <div className="ml-2 mr-2">
        <Link href="/">
          <h2 className="text-3xl">LiquidDex</h2>
        </Link>
      </div>

      {/* Centered nav items */}
      <NavigationMenu className="flex-1">
        <NavigationMenuList className="flex justify-center space-x-4">
          <NavigationMenuItem>
            <NavigationMenuLink
              href={"/swap"}
              className={navigationMenuTriggerStyle()}
            >
              Swap
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href={"/liquidity"}
              className={navigationMenuTriggerStyle()}
            >
              Liquidity
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/faucet"
              className={navigationMenuTriggerStyle()}
            >
              Faucet
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Right-aligned buttons (e.g., ModeToggle, ConnectButton) */}
      <div className="gap-2 flex">
        <ModeToggle />
        <ConnectButton />
      </div>
    </div>
  );
};

export default Navbar;
