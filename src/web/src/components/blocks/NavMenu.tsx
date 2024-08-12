'use client';

import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import globeIcon from '../../images/globe.svg';

export function NavMenu() {
  return (
    <NavigationMenu className='h-screen'>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className='flex gap-2'>
            <img src={globeIcon} alt='organization' className='w-5 h-5' />
            My Org.
          </NavigationMenuTrigger>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
