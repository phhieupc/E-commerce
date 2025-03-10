import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignUp from './Pages/LoginSignUp';
import './App.css';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kids_banner from './Components/Assets/banner_kids.png';
import News from './Pages/News';
import Contact from './Pages/Contact';
import PayMentReturn from './Pages/PayMentReturn';

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Shop />} />
                    <Route path='/men' element={<ShopCategory banner={men_banner} category='men' />} />
                    <Route path='/women' element={<ShopCategory banner={women_banner} category='women' />} />
                    <Route path='/kids' element={<ShopCategory banner={kids_banner} category='kids' />} />
                    <Route path='/news' element={<News />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/payment-return' element={<PayMentReturn />} />
                    <Route path='/product' element={<Product />}>
                        <Route path=':productId' element={<Product />} />
                    </Route>
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/login' element={<LoginSignUp />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
