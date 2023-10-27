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
    TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import AdminLoggedIn from "./AdminLoggedIn";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";

export interface Product {
    _id: string;
    productName: string;
    productPrice: number;
    productMaterial: string;
    productDescription: string;
    productImage: string;
    sizes: { sizeName: string; quantity: number }[];
}

interface NewProduct {
    productName: string;
    productPrice: number;
    productMaterial: string;
    productDescription: string;
    productImage: string;
}

export default function AdminView() {
    const [products, setProducts] = useState<Product[]>([]);
    const [refreshData, setRefreshData] = useState(false);
    const [showAddProductForm, setShowAddProductForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(
        null
    );
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [newProduct, setNewProduct] = useState<NewProduct>({
        productName: "",
        productPrice: 0,
        productMaterial: "",
        productDescription: "",
        productImage: "",
    });
    const [validationErrors, setValidationErrors] = useState({
        productName: "",
        productPrice: "",
        productMaterial: "",
        productDescription: "",
        productImage: "",
    });

    useEffect(() => {
        fetch("/product/products")
            .then((response) => response.json())
            .then((data) => {
                const productPromises = data.map(async (product: Product) => {
                    const sizesResponse = await fetch(
                        `/product/${product._id}`
                    );

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

        setValidationErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };

    const handleAddProductClick = async () => {
        let isValid = true;
        const errors = {
            productName: "",
            productPrice: "",
            productMaterial: "",
            productDescription: "",
            productImage: "",
        };

        if (newProduct.productName.trim() === "") {
            isValid = false;
            errors.productName = "Produktnamn är obligatoriskt";
        }

        if (newProduct.productPrice <= 0) {
            isValid = false;
            errors.productPrice = "Pris måste vara större än 0";
        }

        if (newProduct.productMaterial.trim() === "") {
            isValid = false;
            errors.productMaterial = "Material är obligatoriskt";
        }

        if (newProduct.productDescription.trim() === "") {
            isValid = false;
            errors.productDescription = "Beskrivning är obligatorisk";
        }

        if (newProduct.productImage.trim() === "") {
            isValid = false;
            errors.productImage = "Produktbild är obligatorisk";
        }

        if (!isValid) {
            // Om det finns valideringsfel, uppdatera state med felmeddelanden
            setValidationErrors(errors);
        } else {
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
                    setProducts((prevProducts) => [
                        ...prevProducts,
                        createdProduct,
                    ]);
                    setNewProduct({
                        productName: "",
                        productPrice: 0,
                        productMaterial: "",
                        productDescription: "",
                        productImage: "",
                    });
                    setRefreshData(!refreshData);
                    toggleAddProductForm();
                } else {
                    console.error("Failed to add product");
                }
            } catch (error) {
                console.error("Error adding product:", error);
            }
        }
    };

    const handleOpenEditDialog = (product: Product) => {
        setSelectedProduct(product);
        setOpenEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setSelectedProduct(null);
        setOpenEditDialog(false);
    };

    const handleUpdateProductList = () => {
        setRefreshData((prevRefresh) => !prevRefresh);
    };

    const handleDeleteProduct = (deletedProductId: string) => {
        setProducts((prevProducts) =>
            prevProducts.filter((product) => product._id !== deletedProductId)
        );
    };

    return (
        <>
            <AdminLoggedIn
                loggedInContent={
                    <div>
                        <h2>Adminsida</h2>

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
                                <form action="">
                                    <div className="error">
                                        {validationErrors.productName}
                                    </div>
                                    <input
                                        required
                                        name="productName"
                                        placeholder="Produktnamn"
                                        value={newProduct.productName}
                                        onChange={handleInputChange}
                                    />
                                    <div className="error">
                                        {validationErrors.productPrice}
                                    </div>
                                    <input
                                        required
                                        name="productPrice"
                                        placeholder="Pris"
                                        type="number"
                                        value={newProduct.productPrice.toString()}
                                        onChange={handleInputChange}
                                    />
                                    <div className="error">
                                        {validationErrors.productMaterial}
                                    </div>
                                    <input
                                        required
                                        name="productMaterial"
                                        placeholder="Material"
                                        value={newProduct.productMaterial}
                                        onChange={handleInputChange}
                                    />
                                    <div className="error">
                                        {validationErrors.productDescription}
                                    </div>
                                    <textarea
                                        required
                                        name="productDescription"
                                        placeholder="Beskrivning"
                                        value={newProduct.productDescription}
                                        onChange={handleInputChange}
                                    />
                                    <div className="error">
                                        {validationErrors.productImage}
                                    </div>
                                    <input
                                        required
                                        name="productImage"
                                        placeholder="Produkt bild"
                                        value={newProduct.productImage}
                                        onChange={handleInputChange}
                                    />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleAddProductClick}
                                    >
                                        Lägg till
                                    </Button>
                                </form>
                            </div>
                        )}

                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Namn</TableCell>
                                        <TableCell>Pris</TableCell>
                                        <TableCell>Material</TableCell>
                                        <TableCell sx={{ maxWidth: "100px" }}>
                                            Beskrivning
                                        </TableCell>
                                        <TableCell sx={{ maxWidth: "100px" }}>
                                            Produkt bild
                                        </TableCell>
                                        <TableCell>Storlekar</TableCell>
                                        <TableCell>Åtgärder</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {products.map((product) => (
                                        <TableRow key={product._id}>
                                            <TableCell>
                                                {product.productName}
                                            </TableCell>
                                            <TableCell>
                                                {product.productPrice}
                                            </TableCell>
                                            <TableCell>
                                                {product.productMaterial}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    maxWidth: "100px",
                                                    overflow: "hidden",
                                                    whiteSpace: "nowrap",
                                                    textOverflow: "ellipsis",
                                                }}
                                            >
                                                {product.productDescription}
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    maxWidth: "100px",
                                                    overflow: "hidden",
                                                    whiteSpace: "nowrap",
                                                    textOverflow: "ellipsis",
                                                }}
                                            >
                                                {product.productImage}
                                            </TableCell>
                                            <TableCell>
                                                {product.sizes && (
                                                    <ul>
                                                        {product.sizes.map(
                                                            (size, index) => (
                                                                <li key={index}>
                                                                    {
                                                                        size.sizeName
                                                                    }
                                                                    :{" "}
                                                                    {
                                                                        size.quantity
                                                                    }{" "}
                                                                    st
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    onClick={() =>
                                                        handleOpenEditDialog(
                                                            product
                                                        )
                                                    }
                                                >
                                                    Redigera
                                                </Button>
                                                <DeleteProduct
                                                    productId={product._id}
                                                    onDelete={() =>
                                                        handleDeleteProduct(
                                                            product._id
                                                        )
                                                    }
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <EditProduct
                            open={openEditDialog}
                            onClose={handleCloseEditDialog}
                            product={selectedProduct}
                            updateProductList={handleUpdateProductList}
                        />
                    </div>
                }
            />
        </>
    );
}
