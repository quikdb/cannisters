'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu';

export function NavMenu() {
  return (
    <NavigationMenu className='h-screen'>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>My Org.</NavigationMenuTrigger>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
