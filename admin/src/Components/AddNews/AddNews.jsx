import './AddNews.css';
import upload_area from '../../assets/upload_area.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function AddNews() {
    const navigate = useNavigate();
    const [image, setImage] = useState('');

    const [newsDetails, setNewsDetails] = useState({
        title: '',
        image: '',
        detail: '',
    });

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const changeHandler = (e) => {
        setNewsDetails({ ...newsDetails, [e.target.name]: e.target.value });
    };

    const addNews = async () => {
        console.log(newsDetails);
        let responseData;
        let news = newsDetails;

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
            news.image = responseData.image_url;
            await fetch('http://localhost:4000/add-news', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(news),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        alert('Add News Successfully');
                        navigate('/list-news');
                    } else alert('Add News Failed');
                });
        }
    };

    return (
        <div className='addProduct'>
            <div className='addProduct-itemField'>
                <p>News title</p>
                <input
                    value={newsDetails.title}
                    onChange={changeHandler}
                    type='text'
                    name='title'
                    placeholder='Type here'
                />
            </div>
            <div className='addProduct-itemField'>
                <p>News detail</p>
                <textarea
                    value={newsDetails.detail}
                    onChange={changeHandler}
                    type='text'
                    name='detail'
                    placeholder='Type here'
                />
            </div>

            <div className='addProduct-itemField'>
                <label htmlFor='file-input'>
                    <img
                        className='addNews-thumbnail-img'
                        src={image ? URL.createObjectURL(image) : upload_area}
                        alt=''
                    />
                </label>
                <input onChange={imageHandler} type='file' name='image' id='file-input' hidden />
            </div>
            <button onClick={addNews} className='addProduct-btn'>
                ADD
            </button>
            <Link to={'/list-news'}>CANCEL</Link>
        </div>
    );
}

export default AddNews;
