import OrderList from "./components/OrderList";
import { Routes, Route } from "react-router-dom";
import MainContent from "./components/MainContent";
import PageNotFound from "./components/PageNotFound";
import FetchSingleProduct from "./components/FetchSingleProduct";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";

function ProductPage() {
  return <FetchSingleProduct productId={""} />;
}

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<MainContent />} />
        <Route path="/orderlist" element={<OrderList />} />
        <Route path="/products/:productId" element={<ProductPage />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </>
  );
}

export default App;
