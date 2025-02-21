import { useEffect, useState } from 'react';
import NewsItem from '../Components/NewsItem/NewsItem';

function News() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/all-news')
            .then((res) => res.json())
            .then((data) => setNews(data));
    }, []);

    return (
        <div className='news'>
            {news.map((new_one) => (
                <NewsItem data={new_one} key={new_one.id} />
            ))}
        </div>
    );
}

export default News;
