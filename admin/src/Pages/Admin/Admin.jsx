import AddProduct from '../../Components/AddProduct/AddProduct';
import ListProduct from '../../Components/ListProduct/ListProduct';
import Sidebar from '../../Components/Sidebar/Sidebar';
import './Admin.css';
import { Routes, Route } from 'react-router-dom';

function Admin() {
    return (
        <div className='admin'>
            <Sidebar />
            <Routes>
                <Route path='/add-product' element={<AddProduct />} />
                <Route path='/list-product' element={<ListProduct />} />
            </Routes>
        </div>
    );
}

export default Admin;
