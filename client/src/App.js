import './App.css';
import TopBar from './components/TopBar';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from './components/About';
import Contact from './components/Contact';
import Policy from './components/Policy';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Order from "./components/Orders";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllPizzaListAction } from './redux/actions/pizzaListAction';
import PizzaListContainer from './components/PizzaListContainer';
import CartListContainer from './components/CartListContainer';
import Register from './components/Register';
import AdminPanel from './components/AdminPanel';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPizzaListAction("just some saga testing data"));
  }, [dispatch])


  return (
    <BrowserRouter>
      <div className='app'>
        <TopBar />
        <Navbar />
        <Routes>
          <Route path='/' element={<PizzaListContainer />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/policy' element={<Policy />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/cart' element={<CartListContainer />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/orders' element={<Order/>}></Route>
          <Route path="/admin-panel/*" element={<AdminPanel/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
