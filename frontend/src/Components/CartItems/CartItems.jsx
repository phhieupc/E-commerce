import { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

function CartItems() {
    const { all_product, cartItems, removeFromCart, getTotalCartAmount } = useContext(ShopContext);

    return (
        <div className='cartItems'>
            <div className='cartItems-format-main'>
                <p>Sản phẩm</p>
                <p>Tên sản phẩm</p>
                <p>Giá</p>
                <p>Số lượng</p>
                <p>Thành tiền</p>
                <p>Xóa</p>
            </div>
            <hr />
            {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    return (
                        <div key={e.id}>
                            <div className='cartItems-format cartItems-format-main'>
                                <img className='cartIcon-product-icon' src={e.image} alt='' />
                                <p>{e.name}</p>
                                <p>${e.new_price}</p>
                                <button className='cartItems-quantity'>{cartItems[e.id]}</button>
                                <p>${e.new_price * cartItems[e.id]}</p>
                                <img
                                    className='cartIcon-remove-icon'
                                    src={remove_icon}
                                    onClick={() => {
                                        removeFromCart(e.id);
                                    }}
                                    alt=''
                                />
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null;
            })}
            <div className='cartItems-down'>
                <div className='cartItems-total'>
                    <h1>Tổng tiền giỏ hàng</h1>
                    <div>
                        <div className='cartItems-total-item'>
                            <p>Tổng tiền hàng</p>
                            <p>
                                {getTotalCartAmount()}
                                <span className='cartItems-total-d'>đ</span>
                            </p>
                        </div>
                        <hr />
                        <div className='cartItems-total-item'>
                            <p>Phí vận chuyển</p>
                            <p>Miễn phí</p>
                        </div>
                        <hr />
                        <div className='cartItems-total-item'>
                            <h3>Tổng thanh toán</h3>
                            <h3>
                                {getTotalCartAmount()}
                                <span className='cartItems-total-d'>đ</span>
                            </h3>
                        </div>
                    </div>
                    <button>THANH TOÁN</button>
                </div>
                <div className='cartItems-promoCode'>
                    <p>Nếu bạn có mã khuyến mãi, hãy nhập tại đây</p>
                    <div className='cartItems-promoBox'>
                        <input type='text' placeholder='Mã khuyến mãi' />
                        <button>Xác nhận</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItems;
