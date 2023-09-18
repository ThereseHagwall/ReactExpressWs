
import OrderList from "./components/OrderList";
import {  Routes, Route } from 'react-router-dom'
import MainContent from "./components/MainContent";
import PageNotFound from "./components/PageNotFound";
import FetchSingleProduct from "./components/FetchSingleProduct";

function ProductPage() {
  return <FetchSingleProduct productId={""} />;
}

function App() {
  return (
    <>
      <h1>Webbshop</h1>
      <Routes>
        <Route path='*' element={<PageNotFound />} />
        <Route path='/' element={<MainContent />} />
        <Route path='/orderlist' element={<OrderList />} />
        <Route path='/products/:productId' element={<ProductPage />} />
      </Routes>
    </>
  );
}

export default App;


