import { NavBar, SideBar, ProjectsTable, ProjectsSingleSideBar, ProjectsSingleTable } from '@/components/blocks';
import { Button } from '@/components/ui/button';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import arrowDown from '../../../images/arrow-down.svg';
import arrowRight from '../../../images/arrow-right.svg';

import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export function ProjectSingle() {
  return (
    <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      <SideBar />
      <div className='flex flex-col'>
        <NavBar />
        <div className='p-6'>
          {/* Breadcrumb */}
          <Breadcrumb className='font-medium text-base mb-4'>
            <Link href='/projects' className='text-[#d0d0d0]'>
              Projects /
            </Link>{' '}
            <span className='text-customBlue'>UrbanLifeSuite</span>
          </Breadcrumb>

          <div className=' pt-4 pb-2 flex flex-col gap-4'>
            <h1 className='text-black text-2xl font-semibold font-nunito'>My first project</h1>
            {/* Tabs */}
            <div className='flex gap-8 border-b border-gray-300 mb-2'>
              <div className='pb-2 border-b-2 border-customBlue text-customBlue cursor-pointer'>Groups</div>
             
            </div>
          </div>

          <div className='grid grid-cols-[200px_1fr]'>
            {/* Sidebar Section */}
            <ProjectsSingleSideBar />

            {/* Projects Table */}
            <ProjectsSingleTable />
          </div>
        </div>
      </div>
    </div>
  );
}
