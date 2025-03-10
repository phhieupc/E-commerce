/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from 'react';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let i = 0; i <= 300; i++) {
        cart[i] = 0;
    }
    return cart;
};

const ShopContextProvider = ({ children }) => {
    const [all_product, setAll_product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(() => {
        fetch('http://localhost:4000/all-products')
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setAll_product(data);
                } else {
                    console.error('API không trả về mảng:', data);
                }
            })
            .catch((error) => console.error('Lỗi fetch sản phẩm:', error));

        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/get-cart', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => res.json())
                .then((data) => setCartItems(data));
        }
    }, []);

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));

        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/add-to-cart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemId: itemId }), // Fix key
            })
                .then((res) => res.json())
                .then((data) => console.log('Server response:', data))
                .catch((error) => console.error('Lỗi thêm vào giỏ hàng:', error));
        }

        alert('Sản phẩm đã được thêm vào giỏ hàng');
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
        }));
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/remove-from-cart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemId }), // Fix key
            })
                .then((res) => res.json())
                .then((data) => console.log('Server response:', data))
                .catch((error) => console.error('Lỗi thêm vào giỏ hàng:', error));
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                if (itemInfo) {
                    totalAmount += itemInfo.new_price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        return Object.values(cartItems).reduce((sum, quantity) => sum + quantity, 0);
    };

    const contextValue = {
        all_product,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getTotalCartItems,
    };

    return <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
