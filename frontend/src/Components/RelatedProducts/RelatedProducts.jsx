/* eslint-disable react/prop-types */
import './RelatedProducts.css';
import Item from '../Item/Item';
import { useEffect, useState } from 'react';

function RelatedProducts({ product }) {
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:4000/popular-in-${product.category}`)
            .then((res) => res.json())
            .then((data) => setRelatedProducts(data));
    }, [product.category]);

    return (
        <div className='relatedProducts'>
            <h1>Sản phẩm liên quan</h1>
            <hr />
            <div className='relatedProducts-item'>
                {relatedProducts.map((item, i) => {
                    return <Item key={i} data={item} />;
                })}
            </div>
        </div>
    );
}

export default RelatedProducts;
