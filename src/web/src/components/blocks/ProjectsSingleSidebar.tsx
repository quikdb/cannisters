import { Button } from '@/components/ui/button';
import arrowDown from '../../images/arrow-down.svg';
import arrowRight from '../../images/arrow-right.svg';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export function ProjectsSingleSideBar() {
  return (
    <div className='border-r p-4'>
      {/* Create Database Button */}
      <Button className='w-full border bg-customBlue text-white hover:bg-white hover:text-customBlue shadow-none font-nunito flex items-center justify-center gap-2'>
        <span className='text-sm'>Create Group</span>
      </Button>

      {/* Search Input */}
      <div className='mt-4 mb-6'>
        <div className='relative'>
          <Search size={16} className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500' />
          <Input
            type='text'
            placeholder='Search by DB name....'
            className='pl-10 py-2 text-xs font-nunito border border-gray-300 rounded-md w-full'
          />
        </div>
      </div>

      {/* Sidebar Navigation */}
      <ul className='space-y-4 text-sm'>
        <li>
          <Link href='#' className='text-gray-600 flex items-center gap-2'>
            <img src={arrowRight} alt='' className='inline-block' />
            Healthcare
          </Link>
        </li>
        <li>
          <Link href='#' className='text-customBlue flex items-center gap-2'>
            <img src={arrowDown} alt='' className='inline-block' />
            RealEstate
          </Link>
          <ul className='ml-6 space-y-2 mt-2'>
            <li>
              <Link href='#' className='text-customBlue border-l-2 border-customBlue pl-2'>
                Houses
              </Link>
            </li>
            <li>
              <Link href='#' className='text-gray-600'>
                Banks
              </Link>
            </li>
            <li>
              <Link href='#' className='text-gray-600'>
                Transactions
              </Link>
            </li>
            <li>
              <Link href='#' className='text-gray-600'>
                Clients
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link href='#' className='text-gray-600 flex items-center gap-2'>
            <img src={arrowRight} alt='' className='inline-block' />
            ECommerce
          </Link>
        </li>
        <li>
          <Link href='#' className='text-gray-600 flex items-center gap-2'>
            <img src={arrowRight} alt='' className='inline-block' />
            Education
          </Link>
        </li>
        <li>
          <Link href='#' className='text-gray-600 flex items-center gap-2'>
            <img src={arrowRight} alt='' className='inline-block' />
            Travel
          </Link>
        </li>
      </ul>
    </div>
  );
}
