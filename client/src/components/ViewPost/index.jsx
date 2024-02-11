import { useNavigate, useParams } from 'react-router-dom';
import useCheckLogin from '../../hooks/useCheckLogin';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import Swal from 'sweetalert2';
import axios from 'axios';
export default function index() {
  useCheckLogin();
  const allPosts = useSelector(state => state.allPosts);
  const currUser = useSelector(state => state.currUser);
  const [currPost, setCurrPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    try {
      allPosts.forEach(element => {
        if (element._id === id) {
          setCurrPost(element);
        }
      });
    } catch (error) {
      navigate('/allpost')
    }
  }, [allPosts])
  const DeletePost = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#9b2a29",
      cancelButtonColor: "#42803b",
      confirmButtonText: "Delete"
    }).then((result) => {
      if (result.isConfirmed) {
        const body = { id: id }
        axios.defaults.withCredentials = true;
        axios.delete(`${import.meta.env.VITE_BASE_URL}/DeletePost`, {
          data: body
        })
          .then(res => {
            Swal.fire({
              title: "Post Deleted!",
              text: "Your post has been deleted.",
              icon: "success"
            });
            navigate('/allpost');
          })
          .catch(e => console.log(e.message));
      }
    });
  }
  return (
    currPost ? (
      <div className='mx-5 mt-4'>
        <div className='d-flex justify-content-center mb-3 p-3' style={{ border: '2px solid #d8d8d8', borderRadius: '1rem' }}>
          <img src={currPost.image} alt="image" style={{ width: "50%", borderRadius: '1rem' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>{currPost.title}</h3>
          {currPost.user === currUser._id &&
            <div>
              <Link className='btn btn-success me-3 px-3' to={`/edit/${id}`} style={{ borderRadius: '50px' }}>Edit</Link>
              <button className='btn btn-danger px-3' onClick={DeletePost} style={{ borderRadius: '50px' }}>Delete</button>
            </div>}
        </div>
        <div>{parse(currPost.html)}</div>
      </div>
      ) : (
      <div class="d-flex justify-content-center" style={{
        position: "relative",
        margin: "10rem 0rem",
        fontFamily: "'Poppins', sans-serif",
      }}>
        <div class="spinner-border" role="status" style={{ width: '5rem', height: '5rem' }}>
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  )
}
