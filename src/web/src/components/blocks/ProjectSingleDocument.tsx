import React, { useState, useEffect, FormEvent } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { CirclePlus, Trash2 } from 'lucide-react';
import { Modal } from './Modal';
import { Input } from '../ui/input';
import { icp } from '../../../../declarations/icp'; // Assuming icp is imported from declarations
import { Item, Result_3, Result_4, QuikDBError } from '../../../../declarations/icp/icp.did';
import { toast } from 'react-toastify';

export function ProjectsSingleDocumentTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [documentData, setDocumentData] = useState({
    id: '',
    location: '',
    price: '',
    yearBuilt: '',
  });
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDocumentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateDocument = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const key = `doc_${Date.now()}`; // Unique key for the document
      const documentString = JSON.stringify(documentData); // Create a JSON string from input data
      const encoder = new TextEncoder(); // Use TextEncoder to encode the document content
      const value = encoder.encode(documentString); // Convert the document content to Uint8Array

      const result: Result_3 = await icp.putItem(key, value);

      if ('ok' in result) {
        toast.success('Document created successfully!', {
          position: 'top-center',
          autoClose: 3000,
        });

        const newDocument: Item = { key, value, createdAt: BigInt(Date.now()), updatedAt: BigInt(Date.now()) };
        setDocuments((prevDocuments) => [...prevDocuments, newDocument]);

        // Reset input fields
        setDocumentData({
          id: '',
          location: '',
          price: '',
          yearBuilt: '',
        });

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
    <main className='flex flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
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

      <div className='flex flex-col overflow-x-auto'>
        <Table className='border'>
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
                <TableCell className='p-4 text-[#42526d]'>{new TextDecoder().decode(new Uint8Array(doc.value))}</TableCell>
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
          <div className='mb-4'>
            <label htmlFor='id' className='block text-sm font-medium font-nunito text-gray-700'>
              ID
            </label>
            <Input
              id='id'
              name='id'
              type='text'
              value={documentData.id}
              onChange={handleInputChange}
              placeholder='e.g. 763937292837'
              className='border border-gray-300 rounded-md p-2 w-full'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='location' className='block text-sm font-medium font-nunito text-gray-700'>
              Location
            </label>
            <Input
              id='location'
              name='location'
              type='text'
              value={documentData.location}
              onChange={handleInputChange}
              placeholder='e.g. New York, NY'
              className='border border-gray-300 rounded-md p-2 w-full'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='price' className='block text-sm font-medium font-nunito text-gray-700'>
              Price
            </label>
            <Input
              id='price'
              name='price'
              type='text'
              value={documentData.price}
              onChange={handleInputChange}
              placeholder='e.g. 850,000'
              className='border border-gray-300 rounded-md p-2 w-full'
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='yearBuilt' className='block text-sm font-medium font-nunito text-gray-700'>
              Year Built
            </label>
            <Input
              id='yearBuilt'
              name='yearBuilt'
              type='text'
              value={documentData.yearBuilt}
              onChange={handleInputChange}
              placeholder='e.g. 1993'
              className='border border-gray-300 rounded-md p-2 w-full'
            />
          </div>
          <Button type='submit' className='w-2/5 bg-gray-400 text-white font-medium font-nunito py-2 rounded-md transition-all hover:bg-customBlue'>
            Create Document
          </Button>
        </form>
      </Modal>
    </main>
  );
}
