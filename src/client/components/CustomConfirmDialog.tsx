import React, { useState } from 'react';

interface CustomConfirmDialogProps {
  message: string; // Ange rätt typ här, i detta fall antar vi att meddelandet är en sträng
  onConfirm: () => void;
}

const CustomConfirmDialog: React.FC<CustomConfirmDialogProps> = ({ message, onConfirm }) => {
  const [open, setOpen] = useState(true);

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <div style={{ display: open ? 'block' : 'none' }}>
      <div>
        <p>{message}</p>
        <button onClick={handleConfirm}>Ja</button>
        <button onClick={() => setOpen(false)}>Avbryt</button>
      </div>
    </div>
  );
};


export default CustomConfirmDialog;
