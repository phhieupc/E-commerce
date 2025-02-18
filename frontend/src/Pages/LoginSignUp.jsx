import { useState } from 'react';
import './CSS/LoginSignUp.css';
import { Link } from 'react-router-dom';

function LoginSignUp() {
    const [state, setState] = useState('Login');

    const [formData, setFormData] = useState({
        username: '',
        fullname: '',
        email: '',
        password: '',
    });

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const login = async () => {
        console.log('Login', formData);
        let responseData;
        await fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => (responseData = data));

        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace('/');
        } else {
            alert(responseData.error);
        }
    };

    const signup = async () => {
        console.log('Signup', formData);
        let responseData;
        await fetch('http://localhost:4000/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => (responseData = data));

        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace('/');
        } else {
            alert(responseData.error);
        }
    };

    return (
        <div className='loginSignup'>
            <div className='loginSignup-container'>
                <h1>{state === 'Login' ? 'Đăng nhập' : 'Đăng ký'}</h1>
                <div className='loginSignup-fields'>
                    <label htmlFor='username'>Tên đăng nhập:</label>
                    <input
                        onChange={changeHandler}
                        type='text'
                        placeholder='User name'
                        name='username'
                        value={formData.username}
                        id='username'
                    />
                    {state === 'Sign up' ? (
                        <>
                            <label htmlFor='name'>Họ tên:</label>
                            <input
                                onChange={changeHandler}
                                type='text'
                                placeholder='Your name'
                                name='fullname'
                                value={formData.fullname}
                                id='name'
                            />
                        </>
                    ) : (
                        <></>
                    )}
                    {state === 'Sign up' ? (
                        <>
                            <label htmlFor='email'>Email:</label>
                            <input
                                onChange={changeHandler}
                                type='email'
                                placeholder='Email address'
                                name='email'
                                value={formData.email}
                                id='email'
                            />
                        </>
                    ) : (
                        <></>
                    )}
                    <label htmlFor='password'>Mật khẩu:</label>
                    <input
                        onChange={changeHandler}
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={formData.password}
                        id='password'
                    />
                </div>
                <div className='loginSignup-btn'>
                    {state === 'Sign up' ? (
                        <button
                            onClick={() => {
                                signup();
                            }}
                        >
                            Đăng ký
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                login();
                            }}
                        >
                            Đăng nhập
                        </button>
                    )}

                    <Link to='/'>Quay lại</Link>
                </div>
                {state === 'Sign up' ? (
                    <p className='loginSignup-login'>
                        Bạn đã có tài khoản? <span onClick={() => setState('Login')}>Đăng nhập</span>
                    </p>
                ) : (
                    <p className='loginSignup-login'>
                        Đăng ký tài khoản mới? <span onClick={() => setState('Sign up')}>Tại đây</span>
                    </p>
                )}
            </div>
        </div>
    );
}

export default LoginSignUp;
