import OrderList from "./components/OrderList";
import FetchProducts from "./components/FetchProducts";
import Header from "./components/Header";
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
      <Header />
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