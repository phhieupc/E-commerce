import './Sidebar.css';
import { Link } from 'react-router-dom';
import home_icon from '../../assets/house-solid.svg';
import product_icon from '../../assets/table-cells-solid.svg';
import account_icon from '../../assets/users-solid.svg';
import news_icon from '../../assets/newspaper-solid.svg';
import order_icon from '../../assets/clipboard-solid.svg';

function Sidebar() {
    return (
        <div className='sidebar'>
            <h1 className='sidebar-title'>
                <span className='sidebar-title-admin'>Administration</span> Menu
            </h1>
            <ul className='sidebar-items'>
                <Link to={'/'}>
                    <li className='sidebar-item'>
                        <img className='sidebar-item-icon' src={home_icon} alt='' />
                        <p>Home</p>
                    </li>
                </Link>
                <Link to={'/list-product'}>
                    <li className='sidebar-item'>
                        <img className='sidebar-item-icon' src={product_icon} alt='' />
                        <p>Product</p>
                    </li>
                </Link>
                <Link to={'/list-account'}>
                    <li className='sidebar-item'>
                        <img className='sidebar-item-icon' src={account_icon} alt='' />
                        <p>Account</p>
                    </li>
                </Link>
                <Link to={'/list-news'}>
                    <li className='sidebar-item'>
                        <img className='sidebar-item-icon' src={news_icon} alt='' />
                        <p>News</p>
                    </li>
                </Link>
                <Link to={'/list-order'}>
                    <li className='sidebar-item'>
                        <img className='sidebar-item-icon' src={order_icon} alt='' />
                        <p>Order</p>
                    </li>
                </Link>
            </ul>
        </div>
    );
}

export default Sidebar;
