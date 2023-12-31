import OrderList from "./components/OrderList";
import OrderDetails from "./components/OrderDetails";
import { Routes, Route } from "react-router-dom";
import MainContent from "./components/MainContent";
import PageNotFound from "./components/PageNotFound";
import FetchSingleProduct from "./components/FetchSingleProduct";
import Header from "./components/Header";
import CheckoutCart from "./components/CheckoutCart";
import LoginForm from "./components/LoginForm";
import AdminView from "./components/AdminView";
import { AuthProvider } from './components/AuthContext';
import { ShoppingCartProvider } from "./components/ShoppingCartContext";
import Footer from "./components/Footer";
import OrderConfirmation from "./components/OrderConfirmation";

function ProductPage() {
  return <FetchSingleProduct productId={""} />;
}

function App() {
  return (
    <>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<MainContent />} />
          <Route path="/orderlist" element={<OrderList />} />
          <Route path="/order/:orderId" element={<OrderDetails />} />
          <Route path="/products/:productId" element={<ProductPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/admin" element={<AdminView />} />
          <Route path='/checkoutcart' element={<CheckoutCart />} />
          <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
