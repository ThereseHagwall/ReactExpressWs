import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Product } from "./FetchProducts";

interface EditProductProps {
  open: boolean;
  onClose: () => void;
  product: Product | null;
}

const EditProduct: React.FC<EditProductProps> = ({
  open,
  onClose,
  product,
}) => {
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Kopiera produktdata när den ändras i förälderkomponenten
    setEditedProduct(product);
  }, [product]);

  const handleSizeChange = (index: number, quantity: number) => {
    if (editedProduct && editedProduct.sizes[index]) {
      // Kopiera storleksdata och uppdatera antalet för den angivna storleken
      const newSizes = [...editedProduct.sizes];
      newSizes[index] = { ...newSizes[index], quantity };
      setEditedProduct({ ...editedProduct, sizes: newSizes });
    }
  };

  const handleSave = () => {
    if (editedProduct) {
      // Spara den redigerade produkten och stäng dialogen
      // Skicka sedan updatedProduct till servern för uppdatering
      console.log("Sparar redigerad produkt:", editedProduct);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Redigera produkt</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Här kan du redigera produkten och spara ändringarna.
        </DialogContentText>
        {editedProduct && (
          <div>
            {/* Visa formuläret för att redigera produkten */}
            <input
              type="text"
              value={editedProduct.productName}
              onChange={(e) =>
                setEditedProduct({
                  ...editedProduct,
                  productName: e.target.value,
                })
              }
            />
            <input
              type="number"
              value={editedProduct.productPrice}
              onChange={(e) =>
                setEditedProduct({
                  ...editedProduct,
                  productPrice: parseFloat(e.target.value),
                })
              }
            />
            <input
              type="text"
              value={editedProduct.productMaterial}
              onChange={(e) =>
                setEditedProduct({
                  ...editedProduct,
                  productMaterial: e.target.value,
                })
              }
            />
            <textarea
              value={editedProduct.productDescription}
              onChange={(e) =>
                setEditedProduct({
                  ...editedProduct,
                  productDescription: e.target.value,
                })
              }
            />
            <input
              type="text"
              value={editedProduct.productImage}
              onChange={(e) =>
                setEditedProduct({
                  ...editedProduct,
                  productImage: e.target.value,
                })
              }
            />
            {/* Hantera storlekar */}
            <div>
              {editedProduct.sizes.map((size, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={size.sizeName}
                    onChange={(e) => {
                      const newSizeName = e.target.value;
                      handleSizeChange(index, size.quantity, newSizeName);
                    }}
                  />
                  <input
                    type="number"
                    value={size.quantity}
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value);
                      handleSizeChange(index, newQuantity, size.sizeName);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Avbryt
        </Button>
        <Button onClick={handleSave} color="primary">
          Spara
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProduct;
