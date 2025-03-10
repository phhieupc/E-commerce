import { useContext, useState } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

function CartItems() {
    const { all_product, cartItems, removeFromCart, getTotalCartAmount } = useContext(ShopContext);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        email: '',
    });

    const [loading, setLoading] = useState(false);

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const payment = async () => {
        if (!formData.name || !formData.phone || !formData.address || !formData.email) {
            alert('Vui lòng nhập đầy đủ thông tin khách hàng!');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:4000/create_payment_url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: getTotalCartAmount(),
                    bankCode: '',
                    orderDescription: 'payment',
                    orderType: 'billpayment',
                    language: 'vn',
                }),
            });

            const data = await response.json();

            if (response.ok && data.paymentUrl) {
                if (data?.paymentUrl) {
                    window.open(data.paymentUrl, '_blank');
                } else {
                    console.error('paymentUrl is undefined or invalid.');
                }
            } else {
                throw new Error(data.message || 'Không thể tạo thanh toán!');
            }
        } catch (error) {
            console.error('Lỗi thanh toán:', error);
            alert('Lỗi khi tạo thanh toán!');
        }

        setLoading(false);
    };

    const handleOrder = async () => {
        const orderItems = all_product
            .filter((e) => cartItems[e.id] > 0)
            .map((e) => ({
                productId: e.id,
                name: e.name,
                price: e.new_price,
                quantity: cartItems[e.id],
                total: e.new_price * cartItems[e.id],
            }));

        if (orderItems.length === 0) {
            alert('Giỏ hàng đang trống!');
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customerName: formData.name,
                    phone: formData.phone,
                    address: formData.address,
                    email: formData.email,
                    totalAmount: getTotalCartAmount(),
                    status: 'Chờ thanh toán',
                    items: orderItems,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Đặt hàng thành công!');
                // navigate('/payment'); // Chuyển hướng sau khi đặt hàng thành công
            } else {
                throw new Error(data.message || 'Có lỗi xảy ra khi đặt hàng!');
            }
        } catch (error) {
            console.error('Lỗi đặt hàng:', error);
            alert(error.message);
        }
    };

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
                </div>
                <div className='cartItems-promoCode'>
                    <p>Nếu bạn có mã khuyến mãi, hãy nhập tại đây</p>
                    <div className='cartItems-promoBox'>
                        <input type='text' placeholder='Mã khuyến mãi' />
                        <button>Xác nhận</button>
                    </div>
                </div>
            </div>
            <div className='pay-info'>
                <h1>Thông tin khách hàng</h1>
                <label htmlFor='name'>Họ tên khách hàng:</label>
                <input value={formData.name} onChange={changeHandler} type='text' id='name' name='name' />
                <label htmlFor='phone'>Số điện thoại:</label>
                <input value={formData.phone} onChange={changeHandler} type='text' id='phone' name='phone' />
                <label htmlFor='address'>Địa chỉ nhận hàng:</label>
                <input value={formData.address} onChange={changeHandler} type='text' id='address' name='address' />
                <label htmlFor='email'>Email:</label>
                <input value={formData.email} onChange={changeHandler} type='text' id='email' name='email' />
                <button onClick={handleOrder}>ĐẶT HÀNG</button>
                <button onClick={payment} disabled={loading}>
                    {loading ? 'Đang xử lý...' : 'THANH TOÁN'}
                </button>
            </div>
        </div>
    );
}

export default CartItems;
