import {useSelector,useDispatch} from 'react-redux'
import {SET_ALERT} from '../Slices/MySlice'
import Swal from 'sweetalert2'
export default function Alert() {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();
    const success = alert.success ? "success" : "error";
    setTimeout(() => {
        dispatch(SET_ALERT({success:true,message:null}));
    },2000)
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    alert.message && Toast.fire({
        icon: success,
        title: alert.message
    });
}
