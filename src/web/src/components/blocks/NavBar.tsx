import { Link } from 'react-router-dom';

import { Bell, Home as HomeIcon, LineChart, Menu, Package, Package2, Search, ShoppingCart, Users, Settings } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { NavMenu } from '@/components/blocks';

//////// for the paid feature tag do not remove the card component below ///////
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
////////////////////////////////////////////////////////////////////////////////

import { AvatarComponent } from '@/components/ui/components';

export function NavBar() {
  return (
    <>
      <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
              <Menu className='h-5 w-5' />
              <span className='sr-only'>Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='left' className='flex flex-col'>
            <nav className='grid gap-2 text-lg font-medium'>
              <Link to='#' className='flex items-center gap-2 text-lg font-semibold'>
                <Package2 className='h-6 w-6' />
                <span className='sr-only'>quikDB</span>
              </Link>
              <Link to='#' className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'>
                <HomeIcon className='h-5 w-5' />
                Overview
              </Link>
              <Link to='#' className='mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground'>
                <ShoppingCart className='h-5 w-5' />
                Project
                <Badge className='ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full'>6</Badge>
              </Link>
            </nav>
            {/* Paid Feature Tag Mobile */}
            <div className='mt-auto'>
              <Card>
                <CardHeader>
                  <CardTitle>Upgrade to Pro</CardTitle>
                  <CardDescription>Unlock all features and get unlimited access to our support team.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button size='sm' className='w-full'>
                    Upgrade
                  </Button>
                </CardContent>
              </Card>
            </div>
          </SheetContent>
        </Sheet>
        <div className='w-full flex-1'>
          <form>
            <div className='relative'>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
              <NavMenu />
            </div>
          </form>
        </div>
        <Button variant='outline' size='icon' className='ml-auto h-8 w-8'>
          <Settings className='h-4 w-4' />
          <span className='sr-only'>Toggle setting</span>
        </Button>
        <Button variant='outline' size='icon' className='ml-auto h-8 w-8'>
          <Bell className='h-4 w-4' />
          <span className='sr-only'>Toggle notifications</span>
        </Button>
        <AvatarComponent />
      </header>
    </>
  );
}
