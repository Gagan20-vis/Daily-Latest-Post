import { useEffect } from 'react';
import useCheckLogin from '../../hooks/useCheckLogin'
import { useDispatch, useSelector } from 'react-redux';
import { SET_ALL_POST } from '../../Slices/MySlice';
import axios from 'axios';
import Post from '../Post/index'
export default function index() {
    const allPosts = useSelector(state => state.allPosts);
    const currUser = useSelector(state => state.currUser);
    const dispatch = useDispatch();
    useCheckLogin();
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/ShowPost`)
            .then(res => {
                if (res.data.posts) {
                    dispatch(SET_ALL_POST(res.data.posts));
                }
            })
            .catch(e => console.log(e.message));
    }, [])
    return (
        <div className='container my-4'>
            <div className="row">
                {allPosts ? allPosts.map((item, ind) => {
                    return (
                        (item.isActive === "active" || (item.isActive === "inactive" && item.user === currUser._id)) && <div className="col-md-3 mb-3" key={ind} >
                            <Post post={item} />
                        </div>
                    )
                }) : (
                    <div class="d-flex justify-content-center" style={{
                        position: "relative",
                        margin: "10rem 0rem",
                        fontFamily: "'Poppins', sans-serif",
                    }}>
                        <div class="spinner-border" role="status" style={{ width: '5rem', height: '5rem' }}>
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}