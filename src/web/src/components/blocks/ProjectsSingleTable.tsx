import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, CirclePlus, Trash2 } from 'lucide-react'; // Import Trash icon
import { useState } from 'react';
import { Modal } from './Modal';
import { Input } from '../ui/input';

export function ProjectsSingleTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'project' | 'database' | 'document'>('document');

  const houses = [
    {
      id: '5hgkg57',
      document: `{"id":"763937292837", "Location":"New York, NY", "Price":"$850,000", "Year built":"1993"}`,
    },
    {
      id: '5hgkg57',
      document: `{"id":"763937292837", "Location":"New York, NY", "Price":"$850,000", "Year built":"1993"}`,
    },
    {
      id: '5hgkg57',
      document: `{"id":"763937292837", "Location":"New York, NY", "Price":"$850,000", "Year built":"1993"}`,
    },
    {
      id: '5hgkg57',
      document: `{"id":"763937292837", "Location":"New York, NY", "Price":"$850,000", "Year built":"1993"}`,
    },
    {
      id: '5hgkg57',
      document: `{"id":"763937292837", "Location":"New York, NY", "Price":"$850,000", "Year built":"1993"}`,
    },
    // Repeat or add more objects as needed
  ];

  const openModal = (type: 'project' | 'database' | 'document') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleRowClick = () => {
    window.location.href = '/dashboard/project/groups';
  };

  return (
    <main className='flex flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col gap-1'>
          <h2 className='text-lg font-bold md:text-2xl font-nunito'>Houses</h2>
          <p className='text-sm text-gray-600 mb-4'>Lorem ipsum dolor sit amet consectetur.</p>
        </div>
        <Button
          className='bg-white text-customBlue border hover:bg-customBlue hover:text-white border-customBlue flex gap-2 font-nunito'
          onClick={() => openModal('document')}
        >
          <CirclePlus size={16} />
          Insert Document
        </Button>
      </div>

      <div className='flex flex-col overflow-x-auto'>
        <Table className='border'>
          <TableHeader className='bg-[#fafbfb]'>
            <TableRow>
              <TableHead className='p-4'>id</TableHead>
              <TableHead className='p-4'>Document</TableHead>
              <TableHead className='p-4'></TableHead> {/* Empty header for the delete icon */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {houses.map((house, index) => (
              <TableRow key={index} className='hover:bg-gray-100 cursor-pointer'>
                <TableCell className='p-4 text-customSkyBlue'>{house.id}</TableCell>
                <TableCell className='p-4 text-[#42526d]'>{house.document}</TableCell>
                <TableCell className='p-4 text-right'>
                  <Button className='bg-transparent hover:bg-red-100 shadow-none  text-red-500'>
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Section */}
      <div className='flex justify-between items-center border-t pt-4 pb-4'>
        <Button className='bg-[#efefef] text-[#344053] px-4 py-2'>
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
        <Button className='bg-[#efefef] text-[#344053] px-4 py-2'>
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