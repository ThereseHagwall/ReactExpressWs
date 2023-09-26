import React, { useState } from 'react';
import CustomConfirmDialog from './CustomConfirmDialog';
import Button from '@mui/material/Button';

interface DeleteProductProps {
  productId: string;
  onDelete: (productId: string) => void;
}

const DeleteProduct: React.FC<DeleteProductProps> = ({ productId, onDelete }) => {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    setOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      // Gör ett anrop till backenden för att ta bort produkten
      const response = await fetch(`/product/products/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Om produkten har raderats från databasen, anropa onDelete för att uppdatera frontend
        onDelete(productId);
      } else {
        console.error('Misslyckades med att ta bort produkten.');
      }
    } catch (error) {
      console.error('Ett fel inträffade:', error);
    }
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleDelete}>Ta bort</Button>
      {open && (
        <CustomConfirmDialog
          message="Är du säker på att du vill ta bort produkten?"
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
};

export default DeleteProduct;
