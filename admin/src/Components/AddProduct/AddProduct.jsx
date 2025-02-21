import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function AddProduct() {
    const navigate = useNavigate();
    const [image, setImage] = useState(false);

    const [productDetails, setProductDetails] = useState({
        name: '',
        image: '',
        category: 'men',
        new_price: '',
        old_price: '',
    });

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const addProduct = async () => {
        console.log(productDetails);
        let responseData;
        let product = productDetails;

        let formData = new FormData();
        formData.append('product', image);

        await fetch('http://localhost:4000/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                responseData = data;
            });
        if (responseData.success) {
            product.image = responseData.image_url;
            await fetch('http://localhost:4000/add-product', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(product),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        alert('Add Product Successfully');
                        navigate('/list-product');
                    } else alert('Add Product Failed');
                });
        }
    };

    return (
        <div className='addProduct'>
            <div className='addProduct-itemField'>
                <p>Product title</p>
                <input
                    value={productDetails.name}
                    onChange={changeHandler}
                    type='text'
                    name='name'
                    placeholder='Type here'
                />
            </div>
            <div className='addProduct-price'>
                <div className='addProduct-itemField'>
                    <p>Price</p>
                    <input
                        value={productDetails.old_price}
                        onChange={changeHandler}
                        type='text'
                        name='old_price'
                        placeholder='Type here'
                    />
                </div>
                <div className='addProduct-itemField'>
                    <p>Offer Price</p>
                    <input
                        value={productDetails.new_price}
                        onChange={changeHandler}
                        type='text'
                        name='new_price'
                        placeholder='Type here'
                    />
                </div>
            </div>
            <div className='addProduct-itemField'>
                <p>Product Category</p>
                <select
                    value={productDetails.category}
                    onChange={changeHandler}
                    name='category'
                    className='addProduct-selector'
                >
                    <option value='men'>Men</option>
                    <option value='women'>Women</option>
                    <option value='kids'>Kids</option>
                </select>
            </div>
            <div className='addProduct-itemField'>
                <label htmlFor='file-input'>
                    <img
                        className='addProduct-thumbnail-img'
                        src={image ? URL.createObjectURL(image) : upload_area}
                        alt=''
                    />
                </label>
                <input onChange={imageHandler} type='file' name='image' id='file-input' hidden />
            </div>
            <button onClick={addProduct} className='addProduct-btn'>
                ADD
            </button>
            <Link to={'/list-product'}>CANCEL</Link>
        </div>
    );
}

export default AddProduct;
