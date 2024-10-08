import { Search } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect, useState, FormEvent } from 'react';
import { icp } from '../../../../declarations/icp/index';
import { DataGroup, Project, Result_6, Result_7, QuikDBError, Database } from '../../../../declarations/icp/icp.did';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from '../blocks/Modal';
import arrowRight from '../../images/arrow-right.svg';
import arrowDown from '../../images/arrow-down.svg';

export function ProjectsSingleSideBar({ project }: { project: Project | null }) {
  const [dataGroups, setDataGroups] = useState<DataGroup[]>([]);
  const [databases, setDatabases] = useState<Database[]>([]);
  const [databaseName, setDatabaseName] = useState<string>('');
  const [groupName, setGroupName] = useState<string>('');
  const [selectedDatabaseId, setSelectedDatabaseId] = useState<bigint | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'database' | 'group'>('database');

  useEffect(() => {
    const fetchDataGroups = async () => {
      try {
        const result: DataGroup[] = await icp.getDataGroups();
        setDataGroups(result);
      } catch (error) {
        console.error('Failed to fetch data groups:', error);
      }
    };

    const fetchDatabases = async () => {
      try {
        const result: Database[] = await icp.getDatabases();
        setDatabases(result);
      } catch (error) {
        console.error('Failed to fetch databases:', error);
      }
    };

    fetchDataGroups();
    fetchDatabases();
  }, []);

  const openModal = (type: 'database' | 'group', databaseId?: bigint) => {
    setModalType(type);
    setSelectedDatabaseId(databaseId || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDatabaseName('');
    setGroupName('');
  };

  const handleCreateDatabase = async (event: FormEvent<HTMLFormElement>) => {
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

      const result: Result_6 = await icp.createDatabase(
        project.projectId,
        BigInt(databases.length + 1),
        databaseName,
        createdByString
      );

      if ('ok' in result) {
        const newDatabase = result.ok[0];
        setDatabases((prevDatabases) => [...prevDatabases, newDatabase].filter((db) => db !== undefined) as Database[]);

        toast.success('Database created successfully!', {
          position: 'top-center',
          autoClose: 3000,
        });

        closeModal();
      } else if ('err' in result) {
        const error = result.err as QuikDBError;
        const errorMessage =
          'GeneralError' in error ? error.GeneralError : 'ValidationError' in error ? error.ValidationError : 'Error creating database.';
        toast.error(`Error: ${errorMessage}`, {
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

  const handleCreateGroup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!project || selectedDatabaseId === null) {
      toast.error('Project or Database not initialized!', {
        position: 'top-center',
        autoClose: 3000,
      });
      return;
    }

    try {
      const createdByString = project.createdBy.toString();

      const result: Result_7 = await icp.createDataGroup(
        project.projectId,
        selectedDatabaseId,
        BigInt(dataGroups.length + 1),
        groupName,
        createdByString
      );

      if ('ok' in result) {
        const newGroup = result.ok[0]; // Assuming result.ok is an array
        setDataGroups((prevGroups) => [...prevGroups, newGroup].filter((group) => group !== undefined) as DataGroup[]);

        toast.success('Group created successfully!', {
          position: 'top-center',
          autoClose: 3000,
        });

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
      {/* Create Database Button */}
      <div className='mb-4'>
        <Button
          className='w-full border bg-customBlue text-white hover:bg-white hover:border-customBlue hover:text-customBlue shadow-none font-nunito flex items-center justify-center gap-2 relative z-10 text-sm'
          onClick={() => openModal('database')}
        >
          <span className='text-sm'>Create Database</span>
        </Button>
      </div>

      {/* Search Input */}
      <div className='mt-4 mb-6'>
        <div className='relative'>
          <Search size={16} className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500' />
          <Input
            type='text'
            placeholder='Search by DB name...'
            className='pl-10 py-2 text-xs font-nunito border border-gray-300 rounded-md w-full'
          />
        </div>
      </div>

      {/* Sidebar Navigation for Databases */}
      <div className='space-y-4 text-sm'>
        <h3 className='font-light'>Databases</h3>
        <ul>
          {databases.map((db) => (
            <li key={db.databaseId.toString()} className='mb-2'>
              <div className='flex items-center justify-between'>
                <Link href={`/project/databases/${db.databaseId}`} className='text-customBlue flex items-center gap-2'>
                  <img src={arrowRight} alt='' />
                  {db.name || 'Unnamed Database'}
                </Link>
                <Button
                  className='text-xs bg-transparent border border-customBlue text-customBlue hover:bg-customBlue hover:text-white z-10'
                  onClick={() => openModal('group', db.databaseId)}
                >
                  + Create Group
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Sidebar Navigation for Data Groups */}
      <div className='space-y-4 text-sm mt-2'>
        <h3 className='font-light'>Data Groups</h3>
        <ul>
          {dataGroups.map((group) => (
            <li key={group.groupId.toString()} className='pl-2'>
              <Link href={`/project/groups/${group.groupId}`} className='text-gray-600 flex items-center gap-2'>
                <img src={arrowRight} alt='' />
                {group.name || 'Unnamed Group'}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal for creating a new database or group */}
      <Modal title={modalType === 'database' ? 'Create Database' : 'Create Group'} isOpen={isModalOpen} onClose={closeModal}>
        <form onSubmit={modalType === 'database' ? handleCreateDatabase : handleCreateGroup}>
          {modalType === 'database' ? (
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
          ) : (
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
          )}
          <Button type='submit' className='w-full mt-4 bg-gray-400 text-white font-medium font-nunito py-2 rounded-md transition-all hover:bg-customBlue'>
            {modalType === 'database' ? 'Create Database' : 'Create Group'}
          </Button>
        </form>
      </Modal>
    </div>
  );
}
