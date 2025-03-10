import { useEffect, useState } from 'react';
import React from 'react';
import './ListNews.css';
import { Link } from 'react-router-dom';
import delete_icon from '../../assets/xmark-solid.svg';
import edit_icon from '../../assets/pen-solid.svg';
import add_icon from '../../assets/plus-solid.svg';

function ListNews() {
    const [allNews, setAllNews] = useState([]);

    const fetchNews = async () => {
        await fetch('http://localhost:4000/all-news')
            .then((response) => response.json())
            .then((data) => {
                setAllNews(data);
            });
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const removeNews = async (id) => {
        const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa tin tức này không?');
        if (confirmDelete) {
            await fetch('http://localhost:4000/delete-news', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ id: id }),
            });
            await fetchNews();
        }
    };

    return (
        <div className='listProduct'>
            <h1>All news list</h1>
            <Link to={'/add-news'} className='listProduct-btn'>
                Add News
                <img className='listProduct-btn-image' src={add_icon} alt='' />
            </Link>
            <div className='listNews-format-main'>
                <p>#</p>
                <p>Image</p>
                <p>Title</p>
                <p>Detail</p>
                <p></p>
            </div>
            <div className='listProduct-allProducts'>
                <hr />
                {allNews.map((news, index) => {
                    return (
                        <React.Fragment key={index}>
                            <div className='listNews-format-main listProduct-format'>
                                <p>{news.id}</p>
                                <img className='listProduct-product-icon' src={news.image} alt='' />
                                <p>{news.title}</p>
                                <p>{news.detail}</p>
                                <div className='listProduct-icon'>
                                    <Link to={`/edit-news/${news.id}`}>
                                        <img className='listProduct-edit-icon' src={edit_icon} alt='' />
                                    </Link>
                                    <img
                                        onClick={() => {
                                            removeNews(news.id);
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

export default ListNews;
