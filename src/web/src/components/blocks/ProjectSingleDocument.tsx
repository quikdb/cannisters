import React, { useState, useEffect, FormEvent } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { CirclePlus, Trash2 } from 'lucide-react';
import { Modal } from './Modal';
import { Input } from '../ui/input';
import { icp } from '../../../../declarations/icp'; // Assuming icp is imported from declarations
import { Item, Result_3, QuikDBError } from '../../../../declarations/icp/icp.did';
import { toast } from 'react-toastify';

export function ProjectsSingleDocumentTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fields, setFields] = useState([{ key: 'location', value: '' }, { key: 'price', value: '' }, { key: 'yearBuilt', value: '' }]);
  const [documents, setDocuments] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5; // Adjust as necessary

  useEffect(() => {
    // Function to fetch documents
    const fetchDocuments = async () => {
      try {
        const keys = await icp.listAllKeys(); // Fetch all keys
        const results = await icp.getBatchItems(keys); // Fetch documents using keys

        const fetchedDocuments = results
          .filter((result): result is { ok: Item } => 'ok' in result) // Filter to include only successful results
          .map(result => result.ok); // Map to the actual items

        setDocuments(fetchedDocuments);
      } catch (error) {
        console.error('Failed to fetch documents:', error);
        toast.error('Failed to fetch documents.', {
          position: 'top-center',
          autoClose: 3000,
        });
      }
    };

    fetchDocuments();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newFields = [...fields];
    newFields[index].value = event.target.value;
    setFields(newFields);
  };

  const handleAddField = () => {
    setFields([...fields, { key: '', value: '' }]);
  };

  const handleRemoveField = (index: number) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };

  const handleFieldKeyChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newFields = [...fields];
    newFields[index].key = event.target.value;
    setFields(newFields);
  };

  const handleCreateDocument = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const id = `doc_${Date.now()}`; // Automatically generate unique ID
      const documentData = Object.fromEntries(fields.map(field => [field.key, field.value])); // Create object from user-defined fields
      const documentString = JSON.stringify({ id, ...documentData }); // Create a JSON string
      const encoder = new TextEncoder(); // Use TextEncoder to encode the document content
      const value = encoder.encode(documentString); // Convert the document content to Uint8Array

      const result: Result_3 = await icp.putItem(id, value);

      if ('ok' in result) {
        toast.success('Document created successfully!', {
          position: 'top-center',
          autoClose: 3000,
        });

        const newDocument: Item = { key: id, value, createdAt: BigInt(Date.now()), updatedAt: BigInt(Date.now()) };
        setDocuments((prevDocuments) => [...prevDocuments, newDocument]);

        // Reset fields
        setFields([{ key: 'location', value: '' }, { key: 'price', value: '' }, { key: 'yearBuilt', value: '' }]);

        closeModal();
      } else if ('err' in result) {
        const error = result.err as QuikDBError;
        const errorMessage =
          'GeneralError' in error ? error.GeneralError : 'ValidationError' in error ? error.ValidationError : 'Error creating document.';
        toast.error(`Error: ${errorMessage}`, {
          position: 'top-center',
          autoClose: 5000,
        });
      }
    } catch (error: any) {
      console.error('Error creating document:', error);
      toast.error(`Unexpected Error: ${error.message}`, {
        position: 'top-center',
        autoClose: 5000,
      });
    }
  };

  const handleDeleteDocument = async (key: string) => {
    try {
      const result: Result_3 = await icp.deleteItem(key);

      if ('ok' in result) {
        toast.success('Document deleted successfully!', {
          position: 'top-center',
          autoClose: 3000,
        });

        // Update state to remove the deleted document
        setDocuments((prevDocuments) => prevDocuments.filter(doc => doc.key !== key));
      } else if ('err' in result) {
        const error = result.err as QuikDBError;
        const errorMessage =
          'GeneralError' in error ? error.GeneralError : 'ItemNotFound' in error ? error.ItemNotFound : 'Error deleting document.';
        toast.error(`Error: ${errorMessage}`, {
          position: 'top-center',
          autoClose: 5000,
        });
      }
    } catch (error: any) {
      console.error('Error deleting document:', error);
      toast.error(`Unexpected Error: ${error.message}`, {
        position: 'top-center',
        autoClose: 5000,
      });
    }
  };

  // Pagination Logic
  const paginatedDocuments = documents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < Math.ceil(documents.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <main className='flex flex-col gap-4 p-4 lg:gap-6 lg:p-6 max-w-full overflow-hidden'>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col gap-1'>
          <h2 className='text-lg font-bold md:text-2xl font-nunito'>Documents</h2>
          <p className='text-sm text-gray-600 mb-4'>List of documents associated with the project.</p>
        </div>
        <Button
          className='bg-white text-customBlue border hover:bg-customBlue hover:text-white border-customBlue flex gap-2 font-nunito'
          onClick={openModal}
        >
          <CirclePlus size={16} />
          Insert Document
        </Button>
      </div>

      <div className='flex flex-col'>
  <Table className='w-full border'>
    <TableHeader className='bg-[#fafbfb]'>
      <TableRow>
        <TableHead className='p-4'>id</TableHead>
        <TableHead className='p-4'>Document</TableHead>
        <TableHead className='p-4'></TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {paginatedDocuments.map((doc, index) => (
        <TableRow key={index} className='hover:bg-gray-100 cursor-pointer'>
          <TableCell className='p-4 text-customSkyBlue'>{doc.key}</TableCell>
          <TableCell className='p-4 text-[#42526d] whitespace-normal break-words max-w-md'>
            {new TextDecoder().decode((doc.value as Uint8Array).buffer)}
          </TableCell>
          <TableCell className='p-4 text-right'>
            <Button
              className='bg-transparent hover:bg-red-100 shadow-none text-red-500'
              onClick={() => handleDeleteDocument(doc.key)}
            >
              <Trash2 size={16} />
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>


      {/* Pagination Controls */}
      <div className='flex justify-between items-center'>
        <Button
          className='text-customBlue hover:text-customBlue'
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          ← Previous
        </Button>
        <span className='text-sm'>
          Page {currentPage} of {Math.ceil(documents.length / itemsPerPage)}
        </span>
        <Button
          className='text-customBlue hover:text-customBlue'
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(documents.length / itemsPerPage)}
        >
          Next →
        </Button>
      </div>

      <Modal title='Insert Document' isOpen={isModalOpen} onClose={closeModal}>
        <form onSubmit={handleCreateDocument}>
          {fields.map((field, index) => (
            <div className='mb-4' key={index}>
              <label htmlFor={`field_${index}`} className='block text-sm font-medium font-nunito text-gray-700'>
                {field.key || `Field ${index + 1}`}
              </label>
              <div className='flex'>
                <Input
                  id={`key_${index}`}
                  name={`key_${index}`}
                  type='text'
                  value={field.key}
                  onChange={(e) => handleFieldKeyChange(index, e)}
                  placeholder='Key'
                  className='border border-gray-300 rounded-md p-2 w-1/2 mr-2'
                />
                <Input
                  id={`value_${index}`}
                  name={`value_${index}`}
                  type='text'
                  value={field.value}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder='Value'
                  className='border border-gray-300 rounded-md p-2 w-1/2'
                />
                <Button
                  className='bg-transparent text-red-500 ml-2'
                  onClick={() => handleRemoveField(index)}
                  type='button'
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))}
          <Button
            className='w-full bg-gray-200 text-customBlue font-medium font-nunito py-2 rounded-md transition-all hover:bg-gray-300'
            onClick={handleAddField}
            type='button'
          >
            Add Field
          </Button>
          <Button type='submit' className='w-full mt-4 bg-gray-400 text-white font-medium font-nunito py-2 rounded-md transition-all hover:bg-customBlue'>
            Create Document
          </Button>
        </form>
      </Modal>
    </main>
  );
}
