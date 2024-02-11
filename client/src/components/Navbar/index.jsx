import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Logo from '/logo.png';
import './style.css';
import { SET_CURR_USER } from '../../Slices/MySlice';
export default function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currUser = useSelector(state => state.currUser)
    const location = useLocation();
    const [user, setUser] = useState(null);
    const Logout = () => {
        axios.delete(`${import.meta.env.VITE_BASE_URL}/logout`)
            .then(res => {
                dispatch(SET_CURR_USER(null));
                setUser(null)
                navigate('/');
            })
            .catch(e => console.log(e.message));
    }
    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get(`${import.meta.env.VITE_BASE_URL}/isLogin`)
            .then(res => {
                if (res.data.success && res.data.success === true) {
                    setUser(res.data.user);
                }
            })  
            .catch(e => console.log(e.message));
    }, [currUser]);
    return (
        <nav className="navbar navbar-expand-lg" style={{ padding: '0px' }}>
            <div className="container-fluid">
                <img src={Logo} alt="logo" />
                <div className="collapse navbar-collapse justify-content-end " id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item me-5">
                            <Link className={location.pathname === '/' ? "nav-link active" : "nav-link"} aria-current="page" to="/">Home</Link>
                        </li>
                        {user ? (
                            <>
                                <li className="nav-item me-5">
                                    <Link className={location.pathname === '/login' ? "nav-link active" : "nav-link"} to="/allpost">AllPost</Link>
                                </li>
                                <li className="nav-item me-5">
                                    <Link className={location.pathname === '/signup' ? "nav-link active" : "nav-link"} to="/addPost">Add Post</Link>
                                </li>
                                <li className="nav-item me-5">
                                    <button className={location.pathname === '/signup' ? "nav-link active" : "nav-link"} onClick={Logout}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item me-5">
                                    <Link className={location.pathname === '/login' ? "nav-link active" : "nav-link"} to="/login">Login</Link>
                                </li>
                                <li className="nav-item me-5">
                                    <Link className={location.pathname === '/signup' ? "nav-link active" : "nav-link"} to="/signup">Signup</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}
