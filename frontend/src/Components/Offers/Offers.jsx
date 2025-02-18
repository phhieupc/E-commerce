import './Offers.css';
import exclusive_image from '../Assets/exclusive_image.png';

function Offers() {
    return (
        <div className='offers'>
            <div className='offers-left'>
                <h1>Khuyến mãi</h1>
                <h1>Dành cho bạn</h1>
                <p>CHỈ NHỮNG SẢN PHẨM BÁN CHẠY NHÂT</p>
                <div className='offers-left-btn'>Xem ngay</div>
            </div>
            <div className='offers-right'>
                <img className='offers-image' src={exclusive_image} alt='' />
            </div>
        </div>
    );
}

export default Offers;
