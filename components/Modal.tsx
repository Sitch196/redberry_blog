import React from "react";

interface ModalProps {
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="absolute w-[480px] h-[272px] bg-white p-4">
        <button onClick={onClose} className="absolute top-4 right-4">
          Close
        </button>
        {/* Add your modal content here */}
      </div>
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={handleOverlayClick}
      />
    </div>
  );
};

export default Modal;
