import { Link } from 'react-router-dom';
import { Bell, CircleUser, Home as HomeIcon, LineChart, Menu, Package, Package2, Search, ShoppingCart, Users } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { NavMenu } from '@/components/blocks';

export function Home() {
  return (
    <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      <div className='hidden border-r bg-muted/40 md:block'>
        <div className='flex h-full max-h-screen flex-col gap-2'>
          <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
            <Link to='/' className='flex items-center gap-2 font-semibold'>
              <Package2 className='h-6 w-6' />
              <span className=''>quikDB</span>
            </Link>
          </div>
          <div className='flex-1'>
            <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
              <Link
                to='#'
                className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
              >
                <HomeIcon className='h-4 w-4' />
                Overview
              </Link>
              <Link
                to='#'
                className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
              >
                <ShoppingCart className='h-4 w-4' />
                Project
                <Badge className='ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full'>6</Badge>
              </Link>
              <Link
                to='#'
                className='flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary'
              >
                <Package className='h-4 w-4' />
                User Management{' '}
              </Link>
              <Link
                to='#'
                className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
              >
                <Users className='h-4 w-4' />
                Audit Logs
              </Link>
              <Link
                to='#'
                className='flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
              >
                <LineChart className='h-4 w-4' />
                Settings
              </Link>
            </nav>
          </div>
          {/* <div className='mt-auto p-4'>
            <Card x-chunk='dashboard-02-chunk-0'>
              <CardHeader className='p-2 pt-0 md:p-4'>
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>Unlock all features and get unlimited access to our support team.</CardDescription>
              </CardHeader>
              <CardContent className='p-2 pt-0 md:p-4 md:pt-0'>
                <Button size='sm' className='w-full'>
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div> */}
        </div>
      </div>
      <div className='flex flex-col'>
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
                <Link
                  to='#'
                  className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'
                >
                  <HomeIcon className='h-5 w-5' />
                  Overview
                </Link>
                <Link
                  to='#'
                  className='mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground'
                >
                  <ShoppingCart className='h-5 w-5' />
                  Project
                  <Badge className='ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full'>6</Badge>
                </Link>
                <Link
                  to='#'
                  className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'
                >
                  <Package className='h-5 w-5' />
                  User Management
                </Link>
                <Link
                  to='#'
                  className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'
                >
                  <Users className='h-5 w-5' />
                  Audit Logs
                </Link>
                <Link
                  to='#'
                  className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'
                >
                  <LineChart className='h-5 w-5' />
                  Settings
                </Link>
              </nav>
              {/* <div className='mt-auto'>
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
              </div> */}
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
            <Bell className='h-4 w-4' />
            <span className='sr-only'>Toggle notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='secondary' size='icon' className='rounded-full'>
                <CircleUser className='h-5 w-5' />
                <span className='sr-only'>Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
          <div className='flex items-center'>
            <h1 className='text-lg font-semibold md:text-2xl'>Projects</h1>
          </div>
          <div
            className='flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm'
            x-chunk='dashboard-02-chunk-1'
          >
            <div className='flex flex-col items-center gap-1 text-center'>
              <h3 className='text-2xl font-bold tracking-tight'>You have no projects</h3>
              <p className='text-sm text-muted-foreground'>Click to add a new project.</p>
              <Button className='mt-4'>Create Project</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
