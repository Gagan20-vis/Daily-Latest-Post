import { useEffect } from 'react';
import { SET_CURR_USER } from '../Slices/MySlice';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useCheckLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get(`${import.meta.env.VITE_BASE_URL}/isLogin`)
            .then(res => {
                if (res.data.success && res.data.success === true) {
                    dispatch(SET_CURR_USER(res.data.user));
                } else {
                    navigate('/login');
                }
            })
            .catch(e => console.log(e.message));
    }, [dispatch, navigate]);
};
export default useCheckLogin
    