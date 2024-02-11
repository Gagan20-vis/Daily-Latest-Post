import { Link, useNavigate } from 'react-router-dom';
import { SET_ALERT } from '../../Slices/MySlice'
import { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Logo from '/logo.png';
import axios from 'axios';
import './style.css';
export default function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get(`${import.meta.env.VITE_BASE_URL}/isLogin`)
            .then(res => {
                if (res.data.success && res.data.success === true) {
                    dispatch(SET_CURR_USER(res.data.user));
                    navigate('/');
                }
            })
            .catch(e => console.log(e.message));
    }, []);
    const [users, setUsers] = useState({ name: '', email: '', password: '' });
    const onChange = e => {
        document.getElementById(e.target.name + 'Prompt').style.visibility = "hidden";
        setUsers({ ...users, [e.target.name]: e.target.value });
    }
    const onSubmit = e => {
        e.preventDefault();
        if (!users.name) document.getElementById('namePrompt').style.visibility = "visible";
        if (!users.email) document.getElementById('emailPrompt').style.visibility = "visible";
        if (!users.password) document.getElementById('passwordPrompt').style.visibility = "visible";
        else {
            const body = JSON.stringify({
                name: users.name,
                email: users.email,
                password: users.password
            })
            axios.defaults.withCredentials = true;
            axios.post(`${import.meta.env.VITE_BASE_URL}/createAccount`, body, { headers: { "Content-Type": "application/json" } })
                .then(res => {
                    if (!res.data.success) {
                        if (res.data.field === 'email') {
                            dispatch(SET_ALERT({ success: false, message: "Email already registered" }));
                        }
                        else if (res.data.field === 'error') {
                            dispatch(SET_ALERT({ success: false, message: "Some error occurred" }));
                        }
                    }
                    else {
                        dispatch(SET_ALERT({ success: true, message: "User Registered Successfully" }));
                        navigate('/login');
                    }
                })
                .catch(e => console.log(e.message))
        }
    }
    return (
        <div className='container my-5 px-5 py-3 signup'>
            <div className="d-flex flex-column align-items-center mb-4">
                <img src={Logo} alt="image" style={{ width: '20%' }} />
                <h2>Sign up to create account</h2>
                <p>Already have an account ? <Link to="/login">Sign in</Link></p>
            </div>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label className="form-label">Full Name:</label>
                    <input type="text" className="form-control" placeholder='Full Name' id='name' name='name' onChange={onChange} value={users.name} />
                    <div id="namePrompt" className="form-text" style={{ color: 'red', visibility: 'hidden' }}>Name is Required *</div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input type="email" className="form-control" id='email' name='email' placeholder='Email Address' onChange={onChange} value={users.email} />
                    <div id="emailPrompt" className="form-text" style={{ color: 'red', visibility: 'hidden' }}>Email is Required *</div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password:</label>
                    <input type="password" className="form-control" id='password' name='password' placeholder='Password' onChange={onChange} value={users.password} />
                    <div id="passwordPrompt" className="form-text" style={{ color: 'red', visibility: 'hidden' }}>Password is Required *</div>
                </div>
                <div className='d-grid gap-2 col-12 mx-auto my-4'>
                    <button type="submit" className="btn btn-primary">Create Account</button>
                </div>
            </form>
        </div>
    )
}
