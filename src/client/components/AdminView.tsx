import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import EditProduct from "./EditProduct"; // Importera EditProduct-komponenten

interface Product {
  _id: string;
  productName: string;
  productPrice: number;
  productMaterial: string;
  productDescription: string;
  productImage: string;
  sizes: { sizeName: string; quantity: number }[];
}

export default function AdminView() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // Håll koll på den valda produkten
  const [openEditDialog, setOpenEditDialog] = useState(false); // Öppna och stäng redigeringsdialogen

  useEffect(() => {
    // Fetch all products and their sizes when the component mounts
    fetch("/product/products")
      .then((response) => response.json())
      .then((data) => {
        // For each product, fetch its sizes and add them to the product data
        const productPromises = data.map(async (product: Product) => {
          const sizesResponse = await fetch(`/product/${product._id}`);
          const sizesData = await sizesResponse.json();
          const productWithSizes: Product = {
            ...product,
            sizes: sizesData,
          };
          return productWithSizes;
        });

        // Wait for all the product data to be fetched and updated
        Promise.all(productPromises).then((productsWithSizes) => {
          setProducts(productsWithSizes);
        });
      })
      .catch((error) => console.error(error));
  }, []);

  // Funktion för att öppna redigeringsdialogen och ställa in den valda produkten
  const handleOpenEditDialog = (product: Product) => {
    setSelectedProduct(product);
    setOpenEditDialog(true);
  };

  // Funktion för att stänga redigeringsdialogen
  const handleCloseEditDialog = () => {
    setSelectedProduct(null);
    setOpenEditDialog(false);
  };

  return (
    <div>
      <h2>AdminView</h2>

      <Button variant="contained" color="primary">
        Lägg till ny produkt
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Namn</TableCell>
              <TableCell>Pris</TableCell>
              <TableCell>Material</TableCell>
              <TableCell>Beskrivning</TableCell>
              <TableCell>Storlekar</TableCell>
              <TableCell>Åtgärder</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.productName}</TableCell>
                <TableCell>{product.productPrice}</TableCell>
                <TableCell>{product.productMaterial}</TableCell>
                <TableCell>{product.productDescription}</TableCell>
                <TableCell>
                  <ul>
                    {product.sizes.map((size, index) => (
                      <li key={index}>
                        {size.sizeName}: {size.quantity} st
                      </li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleOpenEditDialog(product)} // Öppna redigeringsdialogen när "Redigera" klickas
                  >
                    Redigera
                  </Button>
                  <Button variant="outlined" color="secondary">
                    Ta bort
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Visa redigeringsdialogen om den är öppen */}
      <EditProduct
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        product={selectedProduct}
      />
    </div>
  );
}
