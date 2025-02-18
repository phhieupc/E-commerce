/* eslint-disable react/prop-types */
import { useContext } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';

function ShopCategory(props) {
    const { all_product } = useContext(ShopContext);

    return (
        <div className='shop-category'>
            <img className='shopCategory-banner' src={props.banner} alt='' />
            <div className='shopCategory-indexSort'>
                <p>
                    <span>Hiển thị 12</span> trong tổng số {all_product.length} sản phẩm
                </p>
                <div className='shopCategory-sort'>
                    Sắp xếp theo <img src={dropdown_icon} alt='' />
                </div>
            </div>
            <div className='shopCategory-products'>
                {all_product.map((item, i) => {
                    if (props.category === item.category) {
                        return <Item key={i} data={item} />;
                    } else {
                        return null;
                    }
                })}
            </div>
            <div className='shopCategory-loadMore'>Xem thêm</div>
        </div>
    );
}

export default ShopCategory;
