import './Navbar.css';
import logo from '../Assets/logo.png';
import 'tippy.js/dist/tippy.css';
import HeadLessTippy from '@tippyjs/react/headless';
import cart_icon from '../Assets/cart_icon.png';
import remove_icon from '../Assets/cart_cross_icon.png';
import search_icon from '../Assets_2/magnifying-glass-solid.svg';
import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import useDebounce from '../../Hooks/useDebounce';

function Navbar() {
    const [menu, setMenu] = useState('shop');
    const [search, setSearch] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const { getTotalCartItems } = useContext(ShopContext);

    const debouncedValue = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            try {
                const response = await fetch(`http://localhost:4000/search?q=${encodeURIComponent(debouncedValue)}`);
                const data = await response.json();
                setSearchResult(data.data);
            } catch (error) {
                console.error('Error fetching search results:', error);
                setSearchResult([]);
            }
        };

        fetchApi();
    }, [debouncedValue]);

    const handleShowResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };

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
                <div className='nav-search-group'>
                    <img
                        onClick={() => {
                            setSearch(!search);
                            setSearchValue('');
                        }}
                        className='nav-search-icon'
                        src={search_icon}
                        alt=''
                    />
                    <HeadLessTippy
                        interactive
                        visible={showResult && searchResult.length > 0}
                        render={(attrs) => (
                            <div className='nav-search-result' tabIndex='-1' {...attrs}>
                                {searchResult.map((product) => {
                                    return (
                                        <Link
                                            className='nav-search-result-item'
                                            onClick={() => {
                                                setSearch(false);
                                                setShowResult(false);
                                            }}
                                            to={`/product/${product.id}`}
                                            key={product.id}
                                        >
                                            {product.name}
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                        onClickOutside={handleShowResult}
                    >
                        <div className='nav-search-container'>
                            {search && (
                                <input
                                    value={searchValue}
                                    type='text'
                                    className='nav-search-input'
                                    placeholder='Tìm kiếm sản phẩm...'
                                    spellCheck={false}
                                    onChange={handleChange}
                                    onFocus={() => setShowResult(true)}
                                    autoFocus
                                />
                            )}
                        </div>
                    </HeadLessTippy>
                </div>
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
