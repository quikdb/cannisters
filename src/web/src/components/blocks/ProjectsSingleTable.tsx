import React, { useState, FormEvent } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { CirclePlus, Trash2 } from 'lucide-react';
import { Modal } from './Modal';
import { Input } from '../ui/input';
import { icp } from '../../../../declarations/icp';
import { Database, Result_6, QuikDBError } from '../../../../declarations/icp/icp.did';
import { Principal } from '@dfinity/principal';
import { toast } from 'react-toastify';

interface ProjectsSingleTableProps {
  projectId: string | undefined;
  databases: Database[];
  setDatabases: React.Dispatch<React.SetStateAction<Database[]>>;
}

export function ProjectsSingleTable({ projectId, databases, setDatabases }: ProjectsSingleTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'project' | 'database'>('database');
  const [databaseName, setDatabaseName] = useState<string>('');
  const [databaseCount, setDatabaseCount] = useState<number>(1);

  const openModal = (type: 'project' | 'database') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!projectId) {
        toast.error('Project ID is not defined.', {
          position: 'top-center',
          autoClose: 3000,
        });
        throw new Error('Project ID is not defined.');
      }

      if (databaseCount <= 0) {
        toast.error('Database count must be a positive integer.', {
          position: 'top-center',
          autoClose: 3000,
        });
        throw new Error('Database count must be a positive integer.');
      }

      const projectIdBigInt = BigInt(projectId);
      const dbCountBigInt = BigInt(databaseCount);
      const principalString = Principal.fromText('w7x7r-cok77-xa').toString();

      const result: Result_6 = await icp.createDatabase(projectIdBigInt, dbCountBigInt, databaseName, principalString);

      if ('ok' in result) {
        const newDatabase = result.ok;
        toast.success('Database created successfully!', {
          position: 'top-center',
          autoClose: 3000,
        });
        setDatabases((prevDatabases: Database[]) => [...prevDatabases, newDatabase] as Database[]);

        setDatabaseName('');
        setDatabaseCount(1);
        closeModal();
      } else if ('err' in result) {
        const error = result.err as QuikDBError;
        toast.error(`Error: ${error}`, {
          position: 'top-center',
          autoClose: 5000,
        });
      }
    } catch (error: any) {
      console.error('Error creating database:', error);
      toast.error(`Unexpected Error: ${error.message}`, {
        position: 'top-center',
        autoClose: 5000,
      });
    }
  };

  return (
    <main className='flex flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col gap-1'>
          <h2 className='text-lg font-bold md:text-2xl font-nunito'>Databases</h2>
          <p className='text-sm text-gray-600 mb-4'>List of databases associated with the project.</p>
        </div>
        <Button
          className='bg-white text-customBlue border hover:bg-customBlue hover:text-white border-customBlue flex gap-2 font-nunito'
          onClick={() => openModal('database')}
        >
          <CirclePlus size={16} />
          Create Database
        </Button>
      </div>

      <div className='flex flex-col overflow-x-auto'>
        <Table className='border'>
          <TableHeader className='bg-[#fafbfb]'>
            <TableRow>
              <TableHead className='p-4'>ID</TableHead>
              <TableHead className='p-4'>Name</TableHead>
              <TableHead className='p-4'>Created At</TableHead>
              <TableHead className='p-4'>Created By</TableHead>
              <TableHead className='p-4'>ProjectID</TableHead>
              <TableHead className='p-4'></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {databases.map((db, index) => (
              <TableRow key={index} className='hover:bg-gray-100 cursor-pointer'>
                <TableCell className='p-4 text-customSkyBlue'>{db.databaseId.toString()}</TableCell>
                <TableCell className='p-4 text-[#42526d]'>{db.name}</TableCell>
                <TableCell className='p-4 text-[#42526d]'>{new Date(Number(db.createdAt) / 1_000_000).toLocaleString()}</TableCell>
                <TableCell className='p-4 text-[#42526d]'>{String(db.createdBy)}</TableCell>
                <TableCell className='p-4 text-[#42526d]'>{db.projectId.toString()}</TableCell>
                <TableCell className='p-4 text-right'>
                  <Button className='bg-transparent hover:bg-red-100 shadow-none text-red-500'>
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Modal title={modalType === 'project' ? 'Create Project' : 'Create Database'} isOpen={isModalOpen} onClose={closeModal}>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='databaseName' className='block text-sm font-medium font-nunito text-gray-700'>
              Database Name
            </label>
            <Input
              id='databaseName'
              type='text'
              value={databaseName}
              onChange={(e) => setDatabaseName(e.target.value)}
              placeholder='e.g. My First Database'
              className='border border-gray-300 rounded-md p-2 w-full'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='databaseCount' className='block text-sm font-medium font-nunito text-gray-700'>
              Count
            </label>
            <Input
              id='databaseCount'
              type='number'
              value={databaseCount}
              onChange={(e) => setDatabaseCount(Math.max(1, Number(e.target.value)))}
              placeholder='e.g. 1'
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
