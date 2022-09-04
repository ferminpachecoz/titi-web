import './App.css';
import Home from './pages/Home';
import Category from './pages/Category';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import FormDemo from './pages/FormDemo';
import Admin from './pages/Admin';
import About from './pages/About';
import Contact from './pages/Contact'
import {Routes, Route} from 'react-router-dom';

function App() {
  console.log(sessionStorage);
  let x = JSON.parse(sessionStorage.getItem("products"))
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/category' element={<Category />} />
        <Route path='/product' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/form' element={<FormDemo />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
