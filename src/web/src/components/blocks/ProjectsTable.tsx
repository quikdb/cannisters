import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { CirclePlus } from 'lucide-react';
import { List, LayoutGrid, ListFilter, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { Input } from '../ui/input';
import { icp } from '../../../../declarations/icp/index';
import { Project } from '../../../../declarations/icp/icp.did';

export function ProjectsTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'project' | 'database'>('project');
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const fetchedProjects = await icp.getProjects();
        setProjects(fetchedProjects);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const openModal = (type: 'project' | 'database') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleRowClick = (projectId: bigint) => {
    window.location.href = `/project/groups/${projectId}`;
  };

  const convertToMilliseconds = (bigintValue: any) => {
    return Number(bigintValue) / 1_000_000;
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
              <TableHead className='p-4'>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow
                key={project.projectId.toString()}
                className='cursor-pointer hover:bg-gray-100'
                onClick={() => handleRowClick(project.projectId)}
              >
                <TableCell className='p-4'>
                  <input type='checkbox' onClick={(e) => e.stopPropagation()} />
                </TableCell>
                <TableCell className='text-customSkyBlue p-4'>{project.name}</TableCell>
                <TableCell className='text-[#42526d] p-4'>
                  {new Date(convertToMilliseconds(project.createdAt)).toLocaleString()}
                </TableCell>
                <TableCell className='text-[#42526d] p-4'>{project.createdBy.toText()}</TableCell>
                <TableCell className='text-[#42526d] p-4'>{project.description}</TableCell>
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
