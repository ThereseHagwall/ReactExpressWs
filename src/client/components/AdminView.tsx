import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import AdminLoggedIn from "./AdminLoggedIn";

interface Product {
  _id: string;
  productName: string;
  productPrice: number;
  productMaterial: string;
  productDescription: string;
  sizes: { sizeName: string; quantity: number }[];
}

interface NewProduct {
  productName: string;
  productPrice: number;
  productMaterial: string;
  productDescription: string;
}

export default function AdminView() {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState<NewProduct>({
    productName: "",
    productPrice: 0,
    productMaterial: "",
    productDescription: "",
  });

  // State-variabel för att tvinga omkörning av useEffect
  const [refreshData, setRefreshData] = useState(false);

  useEffect(() => {
    fetch("/product/products")
      .then((response) => response.json())
      .then((data) => {
        const productPromises = data.map(async (product: Product) => {
          const sizesResponse = await fetch(`/product/${product._id}`);

          const sizesData = await sizesResponse.json();
          const productWithSizes: Product = {
            ...product,
            sizes: sizesData,
          };
          return productWithSizes;
        });

        Promise.all(productPromises).then((productsWithSizes) => {
          setProducts(productsWithSizes);
        });
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [refreshData]);

  const toggleAddProductForm = () => {
    setShowAddProductForm(!showAddProductForm);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleAddProductClick = async () => {
    try {
      const response = await fetch("/product/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        const createdProduct = await response.json();
        setProducts((prevProducts) => [...prevProducts, createdProduct]);
        setNewProduct({
          productName: "",
          productPrice: 0,
          productMaterial: "",
          productDescription: "",
        });
        setRefreshData(!refreshData);
      } else {
        console.error("Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <>
      <AdminLoggedIn
        loggedInContent={
          <div>
            <h2>AdminView</h2>

            <Button
              variant="contained"
              color="primary"
              onClick={toggleAddProductForm}
            >
              Lägg till ny produkt
            </Button>
            <Link to="/orderlist">
              <Button variant="contained" color="primary">
                Alla ordrar
              </Button>
            </Link>
            {showAddProductForm && (
              <div>
                <h3>Lägg till ny produkt</h3>
                <TextField
                  name="productName"
                  label="Produktnamn"
                  value={newProduct.productName}
                  onChange={handleInputChange}
                />
                <TextField
                  name="productPrice"
                  label="Pris"
                  type="number"
                  value={newProduct.productPrice.toString()}
                  onChange={handleInputChange}
                />
                <TextField
                  name="productMaterial"
                  label="Material"
                  value={newProduct.productMaterial}
                  onChange={handleInputChange}
                />
                <TextField
                  name="productDescription"
                  label="Beskrivning"
                  multiline
                  rows={4}
                  value={newProduct.productDescription}
                  onChange={handleInputChange}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddProductClick}
                >
                  Lägg till
                </Button>
              </div>
            )}

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
                        {product.sizes && (
                          <ul>
                            {product.sizes.map((size, index) => (
                              <li key={index}>
                                {size.sizeName}: {size.quantity} st
                              </li>
                            ))}
                          </ul>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button variant="outlined" color="primary">
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
          </div>
        }
      />
    </>
  );
}
