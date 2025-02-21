import AddNews from '../../Components/AddNews/AddNews';
import AddProduct from '../../Components/AddProduct/AddProduct';
import EditNews from '../../Components/EditNews/EditNews';
import EditProduct from '../../Components/EditProduct/EditProduct';
import ListAccount from '../../Components/ListAccount/ListAccount';
import ListNews from '../../Components/ListNews/ListNews';
import ListProduct from '../../Components/ListProduct/ListProduct';
import Sidebar from '../../Components/Sidebar/Sidebar';
import './Admin.css';
import { Routes, Route } from 'react-router-dom';

function Admin() {
    return (
        <div className='admin'>
            <Sidebar />
            <Routes>
                <Route path='/' element={<></>} />
                <Route path='/add-product' element={<AddProduct />} />
                <Route path='/add-news' element={<AddNews />} />
                <Route path='/list-product' element={<ListProduct />} />
                <Route path='/list-news' element={<ListNews />} />
                <Route path='/list-account' element={<ListAccount />} />
                <Route path='/edit-product/:id' element={<EditProduct />} />
                <Route path='/edit-news/:id' element={<EditNews />} />
            </Routes>
        </div>
    );
}

export default Admin;
