import './Navbar.css';
import navLogo from '../../assets/nav-logo.svg';
import navProfile from '../../assets/nav-profile.svg';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <div className='navbar'>
            <Link to={'/'}>
                <img src={navLogo} alt='' className='nav-logo' />
            </Link>
            <img src={navProfile} className='nav-profile' alt='' />
        </div>
    );
}

export default Navbar;
