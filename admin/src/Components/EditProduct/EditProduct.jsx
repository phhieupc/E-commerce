import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import upload_area from '../../assets/upload_area.svg';
import { Link } from 'react-router-dom';

function EditProduct() {
    const { id } = useParams(); // Lấy id từ URL
    const navigate = useNavigate();
    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name: '',
        image: '',
        category: 'men',
        new_price: '',
        old_price: '',
    });

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await fetch(`http://localhost:4000/get-product/${id}`);
            const data = await res.json();
            if (data.success) {
                setProductDetails(data.product);
            }
        };
        fetchProduct();
    }, [id]);

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const updateProduct = async () => {
        let updatedProduct = productDetails;

        if (image) {
            let formData = new FormData();
            formData.append('product', image);

            const res = await fetch('http://localhost:4000/upload', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                },
                body: formData,
            });
            const data = await res.json();
            if (data.success) {
                updatedProduct.image = data.image_url;
            }
        }

        const response = await fetch('http://localhost:4000/edit-product', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
        });

        const result = await response.json();
        if (result.success) {
            alert('Product updated successfully');
            navigate('/list-product');
        } else {
            alert('Failed to update product');
        }
    };

    return (
        <div className='addProduct'>
            <div className='addProduct-itemField'>
                <p>Product title</p>
                <input value={productDetails.name} onChange={changeHandler} type='text' name='name' />
            </div>
            <div className='addProduct-price'>
                <div className='addProduct-itemField'>
                    <p>Price</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type='text' name='old_price' />
                </div>
                <div className='addProduct-itemField'>
                    <p>Offer Price</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type='text' name='new_price' />
                </div>
            </div>
            <div className='addProduct-itemField'>
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name='category'>
                    <option value='men'>Men</option>
                    <option value='women'>Women</option>
                    <option value='kids'>Kids</option>
                </select>
            </div>
            <div className='addProduct-itemField'>
                <label htmlFor='file-input'>
                    <img
                        className='addProduct-thumbnail-img'
                        src={image ? URL.createObjectURL(image) : productDetails.image || upload_area}
                        alt=''
                    />
                </label>
                <input onChange={imageHandler} type='file' name='image' id='file-input' hidden />
            </div>
            <button onClick={updateProduct} className='addProduct-btn'>
                SAVE
            </button>
            <Link to={'/list-product'}>CANCEL</Link>
        </div>
    );
}

export default EditProduct;
