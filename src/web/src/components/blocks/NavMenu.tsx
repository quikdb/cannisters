'use client';

import * as React from 'react';
import { Link } from 'react-router-dom';

import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

export function NavMenu() {
  return (
    <NavigationMenu className='h-screen'>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger ref='#'>Getting started</NavigationMenuTrigger>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
