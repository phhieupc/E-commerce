import { useEffect, useState } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png';

function ListProduct() {
    const [allProducts, setAllProducts] = useState([]);

    const fetchInfo = async () => {
        await fetch('http://localhost:4000/all-products')
            .then((response) => response.json())
            .then((data) => {
                setAllProducts(data);
            });
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    const removeProduct = async (id) => {
        await fetch('http://localhost:4000/remove-product', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ id: id }),
        });
        await fetchInfo();
    };

    return (
        <div className='listProduct'>
            <h1>All products list</h1>
            <div className='listProduct-format-main'>
                <p>#</p>
                <p>Products</p>
                <p>Title</p>
                <p>Old price</p>
                <p>New price</p>
                <p>Category</p>
                <p>Remove</p>
            </div>
            <div className='listProduct-allProducts'>
                <hr />
                {allProducts.map((product, index) => {
                    return (
                        <>
                            <div className='listProduct-format-main listProduct-format' key={index}>
                                <p>{product.id}</p>
                                <img className='listProduct-product-icon' src={product.image} alt='' />
                                <p>{product.name}</p>
                                <p>
                                    {product.old_price}
                                    <span className='listProduct--product-d'>đ</span>
                                </p>
                                <p>
                                    {product.new_price}
                                    <span className='listProduct--product-d'>đ</span>
                                </p>
                                <p>{product.category}</p>
                                <img
                                    onClick={() => {
                                        removeProduct(product.id);
                                    }}
                                    className='listProduct-remove-icon'
                                    src={cross_icon}
                                    alt=''
                                />
                            </div>
                            <hr />
                        </>
                    );
                })}
            </div>
        </div>
    );
}

export default ListProduct;
