import { Link } from 'react-router-dom';
import { Home as HomeIcon, LineChart, Menu, Package, Package2, ShoppingCart, Users } from 'lucide-react';

import { Badge } from '@/components/ui/badge';

import { NavBar, Project } from '@/components/blocks';

//////// for the paid feature tag do not remove the card component below ///////
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
////////////////////////////////////////////////////////////////////////////////

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
          {/* Paid Feature Tag Desktop */}
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
        < NavBar />
        <Project />
      </div>
    </div>
  );
}
