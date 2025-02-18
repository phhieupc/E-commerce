import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import remove_icon from '../Assets/cart_cross_icon.png';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

function Navbar() {
    const [menu, setMenu] = useState('shop');
    const { getTotalCartItems } = useContext(ShopContext);

    return (
        <div className='navbar'>
            <Link to='/'>
                <div className='nav-logo'>
                    <img className='nav-logo-logo' src={logo} alt='Shopper' />
                    <p>SHOPPER</p>
                </div>
            </Link>
            <ul className='nav-menu'>
                <li onClick={() => setMenu('shop')}>
                    <Link to='/'>Trang chủ</Link>
                    {menu === 'shop' ? <hr /> : <></>}
                </li>
                <li onClick={() => setMenu('men')}>
                    <Link to='/men'>Nam</Link>
                    {menu === 'men' ? <hr /> : <></>}
                </li>
                <li onClick={() => setMenu('women')}>
                    <Link to='/women'>Nữ</Link>
                    {menu === 'women' ? <hr /> : <></>}
                </li>
                <li onClick={() => setMenu('kids')}>
                    <Link to='/kids'>Trẻ em</Link>
                    {menu === 'kids' ? <hr /> : <></>}
                </li>
                <li onClick={() => setMenu('news')}>
                    <Link to='/news'>Tin tức</Link>
                    {menu === 'news' ? <hr /> : <></>}
                </li>
                <li onClick={() => setMenu('contact')}>
                    <Link to='/contact'>Liên hệ</Link>
                    {menu === 'contact' ? <hr /> : <></>}
                </li>
            </ul>
            <div className='nav-login-cart'>
                {localStorage.getItem('auth-token') ? (
                    <button
                        onClick={() => {
                            localStorage.removeItem('auth-token');
                            window.location.replace('/');
                        }}
                    >
                        Đăng xuất
                    </button>
                ) : (
                    <Link to='/login'>
                        <button>Đăng nhập</button>
                    </Link>
                )}

                <Link to='/cart'>
                    <img className='nav-cart-icon' src={cart_icon} alt='Icon-cart' />
                </Link>
                <div className='nav-cart-count'>{getTotalCartItems()}</div>
            </div>

            <input type='checkbox' name='' className='nav-bars-input' id='nav-bars-input' hidden />

            <label htmlFor='nav-bars-input' className='nav-overlay'></label>

            <ul className='nav-menu-mobile'>
                <label htmlFor='nav-bars-input' className='nav-menu-mobile-close'>
                    <img src={remove_icon} alt='' />
                </label>
                <li onClick={() => setMenu('shop')}>
                    <Link to='/'>Trang chủ</Link>
                    {menu === 'shop' ? <hr /> : <></>}
                </li>
                <li onClick={() => setMenu('men')}>
                    <Link to='/men'>Nam</Link>
                    {menu === 'men' ? <hr /> : <></>}
                </li>
                <li onClick={() => setMenu('women')}>
                    <Link to='/women'>Nữ</Link>
                    {menu === 'women' ? <hr /> : <></>}
                </li>
                <li onClick={() => setMenu('kids')}>
                    <Link to='/kids'>Trẻ em</Link>
                    {menu === 'kids' ? <hr /> : <></>}
                </li>
                <li onClick={() => setMenu('news')}>
                    <Link to='/news'>Tin tức</Link>
                    {menu === 'news' ? <hr /> : <></>}
                </li>
                <li onClick={() => setMenu('contact')}>
                    <Link to='/contact'>Liên hệ</Link>
                    {menu === 'contact' ? <hr /> : <></>}
                </li>
            </ul>

            <label htmlFor='nav-bars-input' className='nav-bars-btn'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
                    <path d='M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z' />
                </svg>
            </label>
        </div>
    );
}

export default Navbar;
