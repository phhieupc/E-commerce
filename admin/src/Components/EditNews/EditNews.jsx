import './EditNews.css';
import upload_area from '../../assets/upload_area.svg';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';

function EditNews() {
    const { id } = useParams(); // Lấy id từ URL
    const navigate = useNavigate();
    const [image, setImage] = useState('');
    const [newsDetails, setNewsDetails] = useState({
        title: '',
        image: '',
        detail: '',
    });

    useEffect(() => {
        const fetchNews = async () => {
            const res = await fetch(`http://localhost:4000/get-news/${id}`);
            const data = await res.json();
            if (data.success) {
                setNewsDetails(data.news);
            }
        };
        fetchNews();
    }, [id]);

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const changeHandler = (e) => {
        setNewsDetails({ ...newsDetails, [e.target.name]: e.target.value });
    };

    const updateNews = async () => {
        let updatedNews = newsDetails;

        if (image) {
            let formData = new FormData();
            formData.append('product', image);

            const res = await fetch('http://localhost:4000/upload', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: formData,
            });
            const data = await res.json();
            if (data.success) {
                updatedNews.image = data.image_url;
            }
        }

        const response = await fetch('http://localhost:4000/edit-news', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(updatedNews),
        });

        const result = await response.json();
        if (result.success) {
            alert('News updated successfully');
            navigate('/list-news');
        } else {
            alert('Failed to update news');
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
                <textarea value={newsDetails.detail} onChange={changeHandler} name='detail' placeholder='Type here' />
            </div>

            <div className='addProduct-itemField'>
                <label htmlFor='file-input'>
                    <img
                        className='addNews-thumbnail-img'
                        src={image ? URL.createObjectURL(image) : newsDetails.image || upload_area}
                        alt=''
                    />
                </label>
                <input onChange={imageHandler} type='file' name='image' id='file-input' hidden />
            </div>
            <button onClick={updateNews} className='addProduct-btn'>
                SAVE
            </button>
            <Link to={'/list-news'}>CANCEL</Link>
        </div>
    );
}

export default EditNews;
