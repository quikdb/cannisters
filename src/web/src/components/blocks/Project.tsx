import { Button } from '@/components/ui/button';
import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from './Modal';
import { Input } from '../ui/input';
import { icp } from '../../../../declarations/icp/index';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Principal } from '@dfinity/principal';
import { QuikDBError, Result_5 } from '../../../../declarations/icp/icp.did';

export function Project() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<'project' | 'database'>('project');
  const [projectName, setProjectName] = useState<string>('');
  const [projectDescription, setProjectDescription] = useState<string>('');
  const navigate = useNavigate();

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
      if (!icp) {
        throw new Error('ICP canister is not initialized.');
      }

      const principalString = Principal.fromText('w7x7r-cok77-xa').toString();
      const result: Result_5 = await icp.createProject(projectName, projectDescription, principalString);
      console.log('result', result);

      if ('ok' in result) {
        toast.success('Project created successfully!', {
          position: 'top-center',
          autoClose: 3000,
        });
        navigate('/dashboard/project/list');
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

  return (
    <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
      <div className='flex items-center'>
        <h1 className='text-lg font-bold md:text-2xl font-nunito'>Projects</h1>
      </div>
      <div className='flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm' x-chunk='dashboard-02-chunk-1'>
        <div className='flex flex-col items-center gap-1 text-center'>
          <h3 className='text-2xl font-bold tracking-tight font-nunito'>You have no projects</h3>
          <p className='text-sm text-muted-foreground font-nunito'>Click to add a new project.</p>
          <Button className='mt-4 font-nunito bg-customBlue' onClick={() => openModal('project')}>
            Create Project
          </Button>
        </div>
      </div>
      <Modal title={modalType === 'project' ? 'Create Project' : 'Create Database'} isOpen={isModalOpen} onClose={closeModal}>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='projectName' className='block text-sm font-medium font-nunito text-gray-700'>
              {modalType === 'project' ? 'Project Name' : 'Database Name'}
            </label>
            <Input
              id='projectName'
              type='text'
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder={modalType === 'project' ? 'e.g. My First Project' : 'e.g. My First Database'}
              className='border border-gray-300 rounded-md p-2 w-full'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='projectDescription' className='block text-sm font-medium font-nunito text-gray-700'>
              Project Description
            </label>
            <Input
              id='projectDescription'
              type='text'
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder='e.g. A short description of the project'
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
