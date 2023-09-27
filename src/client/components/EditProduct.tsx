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
  updateProductList: () => void;
}

const EditProduct: React.FC<EditProductProps> = ({
  open,
  onClose,
  product,
  updateProductList
}) => {
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);
  const [refreshData, setRefreshData] = useState(false);

  useEffect(() => {
    setEditedProduct(product);
  }, [product, setRefreshData]);

  const handleSizeChange = (index: number, quantity: number, newSizeName: string) => {
    if (editedProduct && editedProduct.sizes[index]) {
      const newSizes = [...editedProduct.sizes];
      newSizes[index] = { ...newSizes[index], quantity, sizeName: newSizeName };
      setEditedProduct({ ...editedProduct, sizes: newSizes });
    }
  };

  const updateProductOnServer = async (updatedProduct: Product) => {
    try {
      const response = await fetch(`/product/products/${updatedProduct._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        console.log("Produkten har uppdaterats i databasen.");
        console.log("Svar:", updatedProduct);
        setRefreshData(!refreshData);
      } else {
        console.error("Misslyckades med att uppdatera produkten i databasen.");
      }
    } catch (error) {
      console.error("Ett fel inträffade:", error);
    }
  };

  const handleSave = () => {
    if (editedProduct) {
      updateProductOnServer(editedProduct);
      onClose();
      updateProductList();
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

function updateProductList() {
  throw new Error("Function not implemented.");
}
