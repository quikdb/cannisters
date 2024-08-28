import React, { ReactNode } from 'react';
import { CircleX } from 'lucide-react';

interface ModalProps {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export function Modal({ title, children, isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-11/12 max-w-lg p-6 relative rounded-t-lg" style={{ borderRadius: '12px 12px 0 0' }}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-nunito font-bold">{title}</h2>
          <button
            className="text-gray-600 hover:text-gray-800"
            onClick={onClose}
          >
            <CircleX size={24} />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
