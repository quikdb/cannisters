import { useEffect, useState, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { NavBar, SideBar, ProjectsSingleSideBar, ProjectsSingleTable } from '@/components/blocks';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { icp } from '../../../../../declarations/icp';
import { Project, QuikDBError, Database, Result_6 } from '../../../../../declarations/icp/icp.did';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from '../../blocks/Modal';
import { Principal } from '@dfinity/principal';

export function ProjectSingle() {
  const { projectId } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [databases, setDatabases] = useState<Database[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<'project' | 'database'>('database');
  const [databaseName, setDatabaseName] = useState<string>('');
  const [databaseCount, setDatabaseCount] = useState<number>(1);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projects: Project[] = await icp.getProjects();
        const foundProject = projects.find((proj) => proj.projectId.toString() === projectId);

        if (foundProject) {
          setProject(foundProject);
          // Fetch databases associated with the project
          const allDatabases: Database[] = await icp.getDatabases();
          const projectDatabases = allDatabases.filter((db) => db.projectId.toString() === projectId);
          setDatabases(projectDatabases);
        } else {
          setError('Project not found.');
        }
      } catch (err) {
        const error = err as QuikDBError;
        if ('GeneralError' in error) {
          setError(error.GeneralError);
        } else if ('ValidationError' in error) {
          setError(error.ValidationError);
        } else {
          setError('Failed to fetch project.');
        }
      }
    };

    fetchProject();
  }, [projectId]);

  const openModal = (type: 'project' | 'database') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateDatabase = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!icp || !project) {
        throw new Error('ICP canister or project is not initialized.');
      }

      const result: Result_6 = await icp.createDatabase(
        project.projectId,
        BigInt(databaseCount),
        databaseName,
        project.createdBy
      );

      if ('ok' in result) {
        toast.success('Database created successfully!', {
          position: 'top-center',
          autoClose: 3000,
        });
        const newDatabase = result.ok;
        if (Array.isArray(newDatabase)) {
          setDatabases([...databases, ...newDatabase]);
        } else {
          setDatabases([...databases, newDatabase]);
        }
        closeModal();
      } else if ('err' in result) {
        const error = result.err as QuikDBError;

        if ('GeneralError' in error) {
          toast.error(`Error: General Error - ${error.GeneralError}`, {
            position: 'top-center',
            autoClose: 5000,
          });
        } else if ('ValidationError' in error) {
          toast.error(`Error: Validation Error - ${error.ValidationError}`, {
            position: 'top-center',
            autoClose: 5000,
          });
        } else {
          const errorKey = Object.keys(error)[0] as keyof QuikDBError;
          toast.error(`Error: ${errorKey} - ${error[errorKey]}`, {
            position: 'top-center',
            autoClose: 5000,
          });
        }
      }
    } catch (error: any) {
      toast.error(`Unexpected Error: ${error.message}`, {
        position: 'top-center',
        autoClose: 5000,
      });
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      <SideBar />
      <div className='flex flex-col'>
        <NavBar />
        <div className='p-6'>
          {/* Breadcrumb */}
          <Breadcrumb className='font-medium text-base '>
            <Link href='/projects' className='text-[#d0d0d0]'>
              Projects /
            </Link>{' '}
            <span className='text-customBlue'>{project?.name || 'Loading...'}</span>
          </Breadcrumb>

          <div className='pt-4 pb-2 flex flex-col gap-4'>
            <h1 className='text-black text-2xl font-semibold font-nunito'>{project?.name || 'Loading...'}</h1>
            {/* Tabs */}
            <div className='flex gap-8 border-b border-gray-300 mb-2'>
              <div className='pb-2 border-b-2 border-customBlue text-customBlue cursor-pointer'>Groups</div>
            </div>
          </div>

          <div className='grid grid-cols-[200px_1fr]'>
            {/* Sidebar Section */}
            <ProjectsSingleSideBar />

            {/* Projects Table or Placeholder */}
            {databases.length === 0 ? (
              <div className='flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm'>
                <div className='flex flex-col items-center gap-1 text-center'>
                  <h3 className='text-2xl font-bold tracking-tight font-nunito'>You have no databases</h3>
                  <p className='text-sm text-muted-foreground font-nunito'>Click to add a new database.</p>
                  <Button className='mt-4 font-nunito bg-customBlue' onClick={() => openModal('database')}>
                    Create Database
                  </Button>
                </div>
              </div>
            ) : (
              <ProjectsSingleTable databases={databases} />
            )}
          </div>

          {/* Modal for creating a new database */}
          <Modal title={modalType === 'project' ? 'Create Project' : 'Create Database'} isOpen={isModalOpen} onClose={closeModal}>
            <form onSubmit={handleCreateDatabase}>
              <div className='mb-4'>
                <label htmlFor='databaseName' className='block text-sm font-medium font-nunito text-gray-700'>
                  {modalType === 'project' ? 'Project Name' : 'Database Name'}
                </label>
                <Input
                  id='databaseName'
                  type='text'
                  value={databaseName}
                  onChange={(e) => setDatabaseName(e.target.value)}
                  placeholder={modalType === 'project' ? 'e.g. My First Project' : 'e.g. My First Database'}
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
                  onChange={(e) => setDatabaseCount(Number(e.target.value))}
                  placeholder='e.g. 1'
                  className='border border-gray-300 rounded-md p-2 w-full'
                />
              </div>
              <Button type='submit' className='w-full bg-customBlue text-white font-medium font-nunito py-2 rounded-md'>
                {modalType === 'project' ? 'Create Project' : 'Create Database'}
              </Button>
            </form>
          </Modal>
        </div>
      </div>
    </div>
  );
}
