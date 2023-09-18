
import OrderList from "./components/OrderList";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainContent from "./components/MainContent";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <>
      <h1>Webbshop</h1>
      <Router>
        <Routes>
          <Route path='/' element={<MainContent />} />
          <Route path='/orderlist' element={<OrderList />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
