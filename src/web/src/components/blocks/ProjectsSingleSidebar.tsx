import { ChevronDown, ChevronRight, Search } from 'lucide-react'; 
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { icp } from '../../../../declarations/icp/index'; 
import { DataGroup } from '../../../../declarations/icp/icp.did'; 
export function ProjectsSingleSideBar() {
  
  const [dataGroups, setDataGroups] = useState<DataGroup[]>([]);

  useEffect(() => {
    const fetchDataGroups = async () => {
      try {
        const result: DataGroup[] = await icp.getDataGroups();
        console.log('Data groups:', result);  
        setDataGroups(result); 
      } catch (error) {
        console.error('Failed to fetch data groups:', error);
      }
    };

    fetchDataGroups();
  }, []);

  return (
    <div className='border-r p-4'>
      {/* Create Group Button */}
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
        {dataGroups.map((group) => (
          <li key={group.groupId.toString()}>
            <Link href={`/project/groups/${group.groupId.toString()}`} className='text-customBlue flex items-center gap-2'>
              <ChevronDown className='inline-block' />
              {group.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
