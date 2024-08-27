import { Search } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect, useState, FormEvent } from 'react';
import { icp } from '../../../../declarations/icp/index';
import { DataGroup, Project, Result_7, QuikDBError } from '../../../../declarations/icp/icp.did';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from '../blocks/Modal';
import arrowRight from '../../images/arrow-right.svg';

export function ProjectsSingleSideBar({ project }: { project: Project | null }) {
  const [dataGroups, setDataGroups] = useState<DataGroup[]>([]);
  const [groupName, setGroupName] = useState<string>('');
  const [databaseId, setDatabaseId] = useState<bigint>(BigInt(0));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'project' | 'group'>('group');

  useEffect(() => {
    const fetchDataGroups = async () => {
      try {
        const result: DataGroup[] = await icp.getDataGroups();
        setDataGroups(result);
      } catch (error) {
        console.error('Failed to fetch data groups:', error);
      }
    };

    fetchDataGroups();
  }, []);

  const openModal = (type: 'project' | 'group') => {
    console.log('Open Modal:', type);
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateGroup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!project) {
      toast.error('Project not initialized!', {
        position: 'top-center',
        autoClose: 3000,
      });
      return;
    }

    try {
      const createdByString = project.createdBy.toString();

      const result: Result_7 = await icp.createDataGroup(project.projectId, databaseId, BigInt(dataGroups.length + 1), groupName, createdByString);

      console.log('Create Data Group Result:', result);

      if ('ok' in result) {
        toast.success('Group created successfully!', {
          position: 'top-center',
          autoClose: 3000,
          onClose: () => window.location.reload() // Reload the page after the toast is closed
        });

        const newGroup = result.ok;
        setDataGroups((prevGroups) => [...prevGroups, newGroup] as DataGroup[]);

        setGroupName('');
        setDatabaseId(BigInt(0));
        closeModal();
      } else if ('err' in result) {
        const error = result.err as QuikDBError;
        const errorMessage =
          'GeneralError' in error ? error.GeneralError : 'ValidationError' in error ? error.ValidationError : 'Error creating group.';
        toast.error(`Error: ${errorMessage}`, {
          position: 'top-center',
          autoClose: 5000,
        });
      }
    } catch (error: any) {
      console.error('Error creating group:', error);
      toast.error(`Unexpected Error: ${error.message}`, {
        position: 'top-center',
        autoClose: 5000,
      });
    }
  };

  return (
    <div className='border-r p-4'>
      {/* Create Group Button */}
      <div>
        <Button
          className='w-full border bg-customBlue text-white hover:bg-white hover:border-customBlue hover:text-customBlue shadow-none font-nunito flex items-center justify-center gap-2 relative z-10'
          onClick={() => {
            console.log('Create Group button clicked'); // Debug log
            openModal('group');
          }}
        >
          <span className='text-sm'>Create Group</span>
        </Button>
      </div>

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
              <img src={arrowRight} alt='' />
              {group.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Modal for creating a new group */}
      <Modal title={modalType === 'project' ? 'Create Project' : 'Create Group'} isOpen={isModalOpen} onClose={closeModal}>
        <form onSubmit={handleCreateGroup}>
          <div className='mb-4'>
            <label htmlFor='groupName' className='block text-sm font-medium font-nunito text-gray-700'>
              Group Name
            </label>
            <Input
              id='groupName'
              type='text'
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder='e.g. My First Group'
              className='border border-gray-300 rounded-md p-2 w-full'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='databaseId' className='block text-sm font-medium font-nunito text-gray-700'>
              Database ID
            </label>
            <Input
              id='databaseId'
              type='number'
              value={Number(databaseId)}
              onChange={(e) => setDatabaseId(BigInt(e.target.value))}
              placeholder='e.g. 1'
              className='border border-gray-300 rounded-md p-2 w-full'
            />
          </div>
          <Button type='submit' className='w-2/5 bg-gray-400 text-white font-medium font-nunito py-2 rounded-md transition-all hover:bg-customBlue'>
            {modalType === 'project' ? 'Create Project' : 'Create Group'}
          </Button>
        </form>
      </Modal>
    </div>
  );
}
