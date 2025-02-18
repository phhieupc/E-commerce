import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';

function ProductDisplay(data) {
    const { product } = data;
    const { addToCart } = useContext(ShopContext);

    return (
        <div className='productDisplay'>
            <div className='productDisplay-left'>
                <div className='productDisplay-img-list'>
                    <img src={product.image} alt='' />
                    <img src={product.image} alt='' />
                    <img src={product.image} alt='' />
                    <img src={product.image} alt='' />
                </div>
                <div className='productDisplay-img'>
                    <img className='productDisplay-main-img' src={product.image} alt='' />
                </div>
            </div>
            <div className='productDisplay-right'>
                <h1>{product.name}</h1>
                <div className='productDisplay-right-stars'>
                    <img src={star_icon} alt='' />
                    <img src={star_icon} alt='' />
                    <img src={star_icon} alt='' />
                    <img src={star_icon} alt='' />
                    <img src={star_dull_icon} alt='' />
                    <p>(122)</p>
                </div>
                <div className='productDisplay-right-prices'>
                    <div className='productDisplay-right-old-price'>
                        {product.old_price}
                        <span className='productDisplay-price-d'>đ</span>
                    </div>
                    <div className='productDisplay-right-new-price'>
                        {product.new_price}
                        <span className='productDisplay-price-d'>đ</span>
                    </div>
                </div>
                <div className='productDisplay-right-description'>
                    Một chiếc áo chui đầu nhẹ, thường được đan, bó sát và có cổ tròn, tay ngắn, mặc như áo lót hoặc áo
                    khoác ngoài.
                </div>
                <div className='productDisplay-right-size'>
                    <h1>Size</h1>
                    <div className='productDisplay-right-sizes'>
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div>
                <button
                    onClick={() => {
                        if (localStorage.getItem('auth-token')) {
                            addToCart(product.id);
                        } else {
                            alert('Vui lòng đăng nhập để thực hiện!');
                        }
                    }}
                >
                    THÊM VÀO GIỎ
                </button>
                <p className='productDisplay-right-category'>
                    <span>Danh mục: </span>
                    {product.category === 'men' ? 'Nam' : product.category === 'women' ? 'Nữ' : 'Trẻ em'}
                    {', '}
                    {product.category === 'men'
                        ? product.name.slice(0, 9)
                        : product.category === 'women'
                        ? 'Váy'
                        : product.name.slice(0, 9)}
                </p>
                <p className='productDisplay-right-category'>
                    <span>Thẻ: </span>
                    Fashion, Mới nhất
                </p>
            </div>
        </div>
    );
}

export default ProductDisplay;
