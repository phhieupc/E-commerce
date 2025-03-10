/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import './Item.css';
import { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';

function Item({ data }) {
    const { addToCart } = useContext(ShopContext);

    return (
        <div className='item'>
            <Link to={`/product/${data.id}`}>
                <img className='item-image' onClick={() => window.scrollTo(0, 0)} src={data.image} alt={data.name} />
            </Link>
            <p>{data.name}</p>
            <div className='item-prices'>
                <div className='item-price-new'>
                    {data.new_price}
                    <span className='item-price-d'>đ</span>
                </div>
                <div className='item-price-old'>
                    {data.old_price}
                    <span className='item-price-d'>đ</span>
                </div>
            </div>
            <div className='item-btn'>
                <button
                    onClick={() => {
                        if (localStorage.getItem('auth-token')) {
                            addToCart(data.id);
                        } else {
                            alert('Vui lòng đăng nhập để thực hiện!');
                            window.location.replace('/login');
                        }
                    }}
                >
                    THÊM VÀO GIỎ
                </button>
            </div>
        </div>
    );
}

export default Item;
