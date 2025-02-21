/* eslint-disable react/prop-types */
import './NewsItem.css';

function NewsItem({ data }) {
    return (
        <div className='newsItem'>
            <div className='newsItem-div'>
                <img className='newsItem-image' src={data.image} alt='' />
            </div>
            <div className='newsItem-group'>
                <h1 className='newsItem-title'>{data.title}</h1>
                <p className='newsItem-detail'>{data.detail}</p>
            </div>
        </div>
    );
}

export default NewsItem;
