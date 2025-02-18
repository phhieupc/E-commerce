/* eslint-disable react/prop-types */
import './Breadcrumb.css';
import arrow_icon from '../Assets/breadcrumb_arrow.png';

function Breadcrumb({ product }) {
    return (
        <div className='breadcrumb'>
            Trang chủ <img src={arrow_icon} alt='' />
            {product.category === 'men' ? 'Nam' : product.category === 'women' ? 'Nữ' : 'Trẻ em'}{' '}
            <img src={arrow_icon} alt='' /> {product.name}
        </div>
    );
}

export default Breadcrumb;
