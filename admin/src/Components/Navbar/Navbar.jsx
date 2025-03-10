import './Navbar.css';
import navLogo from '../../assets/nav-logo.svg';
import avatar from '../../assets/avatar.jpeg';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div className='navbar'>
            <Link to={'/'}>
                <img src={navLogo} alt='' className='nav-logo' />
            </Link>
            <img src={avatar} className='nav-avatar' alt='' />
        </div>
    );
}

export default Navbar;
