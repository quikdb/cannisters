import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, CirclePlus } from 'lucide-react';
import { useState } from 'react';
import { Modal } from './Modal';
import { Input } from '../ui/input';

export function ProjectsSingleTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'project' | 'database'>('database');

  const houses = [
    { id: '5hgkg57', location: 'New York, NY', price: '$850,000', yearBuilt: '1993', rooms: 6, squareFootage: '1,800 sq ft' },
    { id: '5hgkg57', location: 'Los Angeles, CA', price: '$2,350,000', yearBuilt: '2000', rooms: 3, squareFootage: '2,500 sq ft' },
    { id: '5hgkg57', location: 'Nigeria, NG', price: '$250,000', yearBuilt: '1893', rooms: 7, squareFootage: '6 Users' },
    { id: '5hgkg57', location: '6 Users', price: '$1,050,000', yearBuilt: '2010', rooms: 3, squareFootage: '6 Users' },
    { id: '5hgkg57', location: '6 Users', price: '$250,000', yearBuilt: '1868', rooms: 3, squareFootage: '6 Users' },
    { id: '5hgkg57', location: '6 Users', price: '$250,000', yearBuilt: '2003', rooms: 5, squareFootage: '6 Users' },
    { id: '5hgkg57', location: '6 Users', price: '$850,000', yearBuilt: '1893', rooms: 3, squareFootage: '6 Users' },
  ];

  const openModal = (type: 'project' | 'database') => {
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
      <div className='flex justify-between items-center '>
        <div className='flex flex-col gap-1'>
          <h2 className='text-lg font-bold md:text-2xl font-nunito'>Houses</h2>
          <p className='text-sm text-gray-600 mb-4'>Lorem ipsum dolor sit amet consectetur.</p>
        </div>
        <Button className='bg-white text-customBlue border hover:bg-customBlue hover:text-white border-customBlue flex gap-2 font-nunito' onClick={() => openModal('database')}>
          <CirclePlus size={16} />
          Insert Document
        </Button>
      </div>

      <div className='flex flex-col overflow-x-auto'>
        <Table className='border'>
          <TableHeader className='bg-[#fafbfb]'>
            <TableRow>
              <TableHead className='p-4'>id</TableHead>
              <TableHead className='p-4'>Location</TableHead>
              <TableHead className='p-4'>Price</TableHead>
              <TableHead className='p-4'>Year Built</TableHead>
              <TableHead className='p-4'>Rooms</TableHead>
              <TableHead className='p-4'>Square Footage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {houses.map((house, index) => (
              <TableRow key={index}>
                <TableCell className='p-4 text-customSkyBlue'>{house.id}</TableCell>
                <TableCell className='p-4 text-[#42526d]'>{house.location}</TableCell>
                <TableCell className='p-4 text-[#42526d]'>{house.price}</TableCell>
                <TableCell className='p-4 text-[#42526d]'>{house.yearBuilt}</TableCell>
                <TableCell className='p-4 text-[#42526d]'>{house.rooms}</TableCell>
                <TableCell className='p-4 text-[#42526d]'>{house.squareFootage}</TableCell>
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
