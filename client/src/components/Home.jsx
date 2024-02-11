import { useEffect, useState } from "react";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { SET_CURR_USER } from "../Slices/MySlice";
export default function Home() {
    const dispatch = useDispatch();
    const currUser = useSelector(state => state.currUser);
    const[user, setUser] = useState(null);
    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get(`${import.meta.env.VITE_BASE_URL}/isLogin`)
            .then(res => {
                if (res.data.success && res.data.success === true) {
                    setUser(res.data.user);
                    dispatch(SET_CURR_USER(res.data.user));
                }
            })
            .catch(e => console.log(e.message));
    }, [currUser]);
    return (
        <>
            {user ? (
                <div className="h-100 d-flex align-items-center justify-content-center" style={{
                    position: "relative",
                    margin: "10rem 0rem",
                    fontFamily: "'Poppins', sans-serif",
                }}>
                    <h1 style={{ fontWeight: "bold" }}>Hello {user.name}</h1>
                </div >
            ) : (
                <div className="h-100 d-flex align-items-center justify-content-center" style={{
                    position: "relative",
                    margin: "10rem 0rem",
                    fontFamily: "'Poppins', sans-serif",
                }}>
                    <h1 style={{ fontWeight: "bold" }}>Please Login to Read Post</h1>
                </div >
            )}
        </>
    )
}
