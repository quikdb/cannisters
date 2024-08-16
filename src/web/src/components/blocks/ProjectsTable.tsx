import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { CirclePlus } from 'lucide-react';
import { List } from 'lucide-react';
import { Input } from '../ui/input';
import { LayoutGrid } from 'lucide-react';
import { ListFilter } from 'lucide-react';
import { Search } from 'lucide-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Modal } from './Modal';


export function ProjectsTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'project' | 'database'>('project');
 
  const projects = [
    { id: 1, name: 'My first project', date: 'Jun, 24 2024 11:42:03', createdBy: 'Joan Nobie', clusters: '0 clusters', users: '6 Users' },
    { id: 2, name: 'My first project', date: 'Jun, 24 2024 11:42:03', createdBy: 'Joan Nobie', clusters: '0 clusters', users: '6 Users' },
    { id: 3, name: 'My first project', date: 'Jun, 24 2024 11:42:03', createdBy: 'Joan Nobie', clusters: '0 clusters', users: '6 Users' },
    { id: 4, name: 'My first project', date: 'Jun, 24 2024 11:42:03', createdBy: 'Joan Nobie', clusters: '0 clusters', users: '6 Users' },
    { id: 5, name: 'My first project', date: 'Jun, 24 2024 11:42:03', createdBy: 'Joan Nobie', clusters: '0 clusters', users: '6 Users' },
    { id: 6, name: 'My first project', date: 'Jun, 24 2024 11:42:03', createdBy: 'Joan Nobie', clusters: '0 clusters', users: '6 Users' },
    { id: 7, name: 'My first project', date: 'Jun, 24 2024 11:42:03', createdBy: 'Joan Nobie', clusters: '0 clusters', users: '6 Users' },
    { id: 8, name: 'My first project', date: 'Jun, 24 2024 11:42:03', createdBy: 'Joan Nobie', clusters: '0 clusters', users: '6 Users' },
    { id: 9, name: 'My first project', date: 'Jun, 24 2024 11:42:03', createdBy: 'Joan Nobie', clusters: '0 clusters', users: '6 Users' },
    { id: 10, name: 'My first project', date: 'Jun, 24 2024 11:42:03', createdBy: 'Joan Nobie', clusters: '0 clusters', users: '6 Users' },
  ];

  const openModal = (type: 'project' | 'database') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
 const handleRowClick = () => {
    window.location.href = '/dashboard/project/groups'; // Navigate to the desired page
  };
  return (
    <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-lg font-bold md:text-2xl font-nunito'>Projects</h1>
        <Button className='bg-customBlue flex gap-2 font-nunito' onClick={() => openModal('project')}>
          <CirclePlus size={16} />
          New Project
        </Button>
      </div>

      {/* Search and Filter Components */}
      <div className='flex justify-between items-center border p-2'>
        <div className='flex items-center gap-2 ml-2'>
          <Search size={16} />
          <Input id='search' type='text' placeholder='Search by project name...' className='font-nunito border-none shadow-none' />
        </div>
        <div className='flex space-x-2'>
          <Button className='bg-white text-[#344053] font-nunito flex gap-2 p-2 border shadow-none'>
            <ListFilter size={16} />
            Filter
          </Button>

          <Button className='bg-[#efefef] text-[#344053] p-2 border shadow-none'>
            <List size={16} />
          </Button>
          <Button className='bg-white border shadow-none text-[#344053] p-2 '>
            <LayoutGrid size={16} />
          </Button>
        </div>
      </div>

      {/* Scrollable Table Container */}
      <div className='flex flex-col overflow-y-auto' style={{ maxHeight: '400px' }}>
        <Table className='border'>
          <TableHeader className='bg-[#fafbfb]'>
            <TableRow>
              <TableHead className='p-4'>
                <input type='checkbox' />
              </TableHead>
              <TableHead className='p-4'>Project Name</TableHead>
              <TableHead className='p-4'>Date Created</TableHead>
              <TableHead className='p-4'>Created by</TableHead>
              <TableHead className='p-4'>Databases</TableHead>
              <TableHead className='p-4'>Users</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id} className="cursor-pointer hover:bg-gray-100" onClick={handleRowClick}>
                  <TableCell className='p-4'>
                  <input type='checkbox' onClick={(e) => e.stopPropagation()} />
                </TableCell>
                  <TableCell className='text-customSkyBlue p-4'>{project.name}</TableCell>
                  <TableCell className='text-[#42526d] p-4'>{project.date}</TableCell>
                  <TableCell className='text-[#42526d] p-4'>{project.createdBy}</TableCell>
                  <TableCell className='text-[#42526d] p-4'>{project.clusters}</TableCell>
                  <TableCell className='text-[#42526d] p-4'>{project.users}</TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Section */}
      <div className='flex justify-between items-center border-t pt-2 pb-2'>
        <Button className='bg-[#efefef] text-[#344053] p-2 border shadow-none'>
          <ChevronLeft size={16} />
          Previous
        </Button>
        <div className='flex items-center space-x-2'>
          <Button className='bg-[#efefef] text-[#344053]'>1</Button>
          <Button className='bg-white text-[#344053]'>2</Button>
          <Button className='bg-white text-[#344053]'>3</Button>
          <Button className='bg-white text-[#344053]'>...</Button>
          <Button className='bg-white text-[#344053]'>10</Button>
        </div>
        <Button className='bg-[#efefef] text-[#344053] p-2 border shadow-none'>
          Next
          <ChevronRight size={16} />
        </Button>
      </div>

      <Modal title={modalType === 'project' ? 'Create Project' : 'Create Database'} isOpen={isModalOpen} onClose={closeModal}>
        <form>
          <div className='mb-4'>
            <label htmlFor='projectName' className='block text-sm font-medium font-nunito text-gray-700'>
              {modalType === 'project' ? 'Project Name' : 'Database Name'}
            </label>
            <Input
              id='projectName'
              type='text'
              placeholder={modalType === 'project' ? 'e.g. My First Project' : 'e.g. My First Database'}
              className='border border-gray-300 rounded-md p-2 w-full'
            />
          </div>
          <Button type='submit' className='w-2/5 bg-gray-400 text-white font-medium font-nunito py-2 rounded-md transition-all hover:bg-customBlue'>
            {modalType === 'project' ? 'Create Project' : 'Create Database'}
          </Button>
        </form>
      </Modal>
    </main>
  );
}
