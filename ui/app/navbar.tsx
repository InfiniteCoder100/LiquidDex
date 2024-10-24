"use client";
// import { ConnectButton } from "./components/connect-button";
// import { ModeToggle } from "./components/mode-toggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/app/components/ui_comp/navigation-menu";

const Navbar = () => {
  return (
    <div id="navbar" className="flex justify-between p-4 mb-6">
      <NavigationMenu >
        <NavigationMenuList>
     
            <NavigationMenuItem className="ml-2 mr-2">
              <NavigationMenuLink href="/">
                <h2 className="text-3xl">LiquidDex</h2>
              </NavigationMenuLink>
            </NavigationMenuItem>

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
      <div className="gap-2 flex justify-normal">
        {/* <ModeToggle /> */}
        {/* <ConnectButton /> */}
      </div>
    </div>
  );
};
export default Navbar;
