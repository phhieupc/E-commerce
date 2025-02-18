import './Popular.css';
import Item from '../Item/Item';
import { useEffect, useState } from 'react';

function Popular() {
    const [popular, setPopular] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/popular-in-men')
            .then((response) => response.json())
            .then((data) => setPopular(data));
    }, []);

    return (
        <div className='popular'>
            <h1>PHỔ BIẾN NHẤT</h1>
            <hr />
            <div className='popular-item'>
                {popular.map((item) => (
                    <Item key={item.id} data={item} />
                ))}
            </div>
        </div>
    );
}

export default Popular;
