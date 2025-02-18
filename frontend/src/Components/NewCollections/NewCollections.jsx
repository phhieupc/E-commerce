import './NewCollections.css';
import Item from '../Item/Item';
import { useEffect, useState } from 'react';

function NewCollections() {
    const [newCollection, setNewCollection] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/new-collection')
            .then((response) => response.json())
            .then((data) => setNewCollection(data));
    }, []);

    return (
        <div className='new-collections'>
            <h1>BỘ SƯU TẬP MỚI</h1>
            <hr />
            <div className='collections'>
                {newCollection.map((item, i) => (
                    <Item key={i} data={item} />
                ))}
            </div>
        </div>
    );
}

export default NewCollections;
