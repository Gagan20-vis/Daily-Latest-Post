import { Link } from "react-router-dom"
export default function index(props) {
    const { post } = props
    return (
        <div className="card p-3 mb-3" style={{ width: "18rem" }}>
            <Link to={`/post/${post._id}`} style={{ textDecoration: 'none', color: "black" }}>
                <img src={post.image} className="card-img-top" alt="image" />
                <div className="card-body">
                    <h5 className="card-title" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>{post.title}</h5>
                </div>
            </Link>
        </div>
    )
}
