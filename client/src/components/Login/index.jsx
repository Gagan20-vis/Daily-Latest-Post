import { SET_ALERT, SET_CURR_USER } from '../../Slices/MySlice'
import useCheckLogin from '../../hooks/useCheckLogin';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import Logo from '/logo.png';
import axios from 'axios';
import './style.css';
export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useCheckLogin();
    const [users, setUsers] = useState({ email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const onChange = e => {
        document.getElementById(e.target.name + 'Prompt').style.visibility = "hidden";
        setUsers({ ...users, [e.target.name]: e.target.value });
    }
    const onSubmit = e => {
        e.preventDefault();
        if (!users.email) document.getElementById('emailPrompt').style.visibility = "visible";
        if (!users.password) document.getElementById('passwordPrompt').style.visibility = "visible";
        else {
            setIsLoading(true);
            const body = JSON.stringify({
                name: users.name,
                email: users.email,
                password: users.password
            })
            axios.defaults.withCredentials = true;
            axios.post(`${import.meta.env.VITE_BASE_URL}/login`, body, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => {
                    setIsLoading(false);
                    if (!res.data.success) {
                        if (res.data.field === 'user') dispatch(SET_ALERT({ success: false, message: "Please sign up yourself!" }))
                        else if (res.data.field === 'verify') dispatch(SET_ALERT({ success: false, message: "You are not verify yet" }));
                        else if (res.data.field === 'password') dispatch(SET_ALERT({ success: false, message: "Incorect password!" }));
                        else dispatch(SET_ALERT({ success: false, message: "Please try again" }));
                    }
                    else {
                        dispatch(SET_CURR_USER(res.data.user));
                        navigate('/');
                    }
                })
                .catch(e => {
                    setIsLoading(false);
                    console.log(e.message)
                });
        }
    }
    return (
        <div className='container my-5 px-5 py-3 signup'>
            <div className="d-flex flex-column align-items-center mb-4">
                <img src={Logo} alt="image" style={{ width: '20%' }} />
                <h2>Sign up to create account</h2>
                <p>Don't have an account ? <Link to="/signup">Sign up</Link></p>
            </div>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input type="email" className="form-control" id='email' name='email' placeholder='Email Address' onChange={onChange} value={users.email} />
                    <div id="emailPrompt" className="form-text" style={{ color: 'red', visibility: 'hidden' }}>Email is Required *</div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password:</label>
                    <input type="password" className="form-control" id='password' name='password' placeholder='Password' onChange={onChange} value={users.password} />
                    <div id="passwordPrompt" className="form-text" style={{ color: 'red', visibility: 'hidden' }}>Password Required *</div>
                </div>
                <div className='d-grid gap-2 col-12 mx-auto my-4'> {
                    isLoading ? (
                        <button class="btn btn-primary" type="button" disabled>
                            <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                            <span role="status">Loading...</span>
                        </button>
                    ) : (
                        <button type="submit" className="btn btn-primary">Login</button>
                    )
                }
                </div>
            </form>
        </div>
    )
}
