import { useEffect, useState } from 'react';
import React from 'react';
import './ListProduct.css';
import { Link } from 'react-router-dom';
import delete_icon from '../../assets/xmark-solid.svg';
import edit_icon from '../../assets/pen-solid.svg';
import add_icon from '../../assets/plus-solid.svg';

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
        const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?');
        if (confirmDelete) {
            await fetch('http://localhost:4000/remove-product', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ id: id }),
            });
            await fetchInfo();
        }
    };

    return (
        <div className='listProduct'>
            <h1>All products list</h1>
            <Link to={'/add-product'} className='listProduct-btn'>
                Add Product
                <img className='listProduct-btn-image' src={add_icon} alt='' />
            </Link>
            <div className='listProduct-format-main'>
                <p>#</p>
                <p>Products</p>
                <p>Title</p>
                <p>Old price</p>
                <p>New price</p>
                <p>Category</p>
                <p></p>
            </div>
            <div className='listProduct-allProducts'>
                <hr />
                {allProducts.map((product, index) => {
                    return (
                        <React.Fragment key={index}>
                            <div className='listProduct-format-main listProduct-format'>
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
                                <div className='listProduct-icon'>
                                    <Link to={`/edit-product/${product.id}`}>
                                        <img className='listProduct-edit-icon' src={edit_icon} alt='' />
                                    </Link>
                                    <img
                                        onClick={() => {
                                            removeProduct(product.id);
                                        }}
                                        className='listProduct-remove-icon'
                                        src={delete_icon}
                                        alt=''
                                    />
                                </div>
                            </div>
                            <hr />
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
}

export default ListProduct;
