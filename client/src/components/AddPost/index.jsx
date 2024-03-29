import { Editor } from '@tinymce/tinymce-react';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { SET_ALERT } from '../../Slices/MySlice';
import useCheckLogin from '../../hooks/useCheckLogin'
import axios from 'axios';
export default function index() {
    const dispatch = useDispatch();
    useCheckLogin();
    const editorRef = useRef();
    const [editorLoading, setEditorLoading] = useState(true);
    const [Title, setTitle] = useState('');
    const [Slug, setSlug] = useState('');
    const [imageBase64, setImageBase64] = useState('');
    const [image, setImage] = useState('');
    const [isActive, setIsActive] = useState('active');
    const handleEditorInit = (evt, editor) => {
        setEditorLoading(false);
        editorRef.current = editor;
    };
    const onChange = e => {
        document.getElementById('titlePrompt').style.visibility = 'hidden';
        const value = e.target.value;
        setTitle(e.target.value);
        setSlug(value.replaceAll(" ", "-"));
    }
    const ImageUpload = e => {
        setImage(e.target.value);
        handleFileUpload(e);
    }
    const handleFileUpload = async e => {
        document.getElementById('imagePrompt').style.visibility = 'hidden';
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setImageBase64(base64);
    }
    const onSubmit = e => {
        e.preventDefault();
        if (Title.length === 0) document.getElementById('titlePrompt').style.visibility = 'visible';
        if (image.length === 0) document.getElementById('imagePrompt').style.visibility = 'visible';
        else {
            const body = {
                image: imageBase64,
                html: editorRef.current.getContent(),
                title: Title,
                slug: Slug,
                isActive: isActive
            };
            axios.post(`${import.meta.env.VITE_BASE_URL}/AddPost`, body)
                .then(res => {
                    dispatch(SET_ALERT({ success: true, message: "Post added successfully!" }));
                    setTitle('');
                    setSlug('');
                    editorRef.current.setContent("<p>Type here....</p>");
                    setImage('');
                })
                .catch(e => console.log(e.message));
        }
    }
    return (
        <div className='mt-4 px-5'>
            <form className='d-flex justify-content-around' onSubmit={onSubmit}>
                <div style={{ width: '60%' }}>
                    <div className="d-flex">
                        <h5 htmlFor="exampleInputEmail1" className="form-label mb-2 ms-1">Title:</h5>
                        <span className='ms-2' id='titlePrompt' style={{ color: 'red', visibility: 'hidden' }}>Title is required*</span>
                    </div>
                    <input type="text" className="form-control" id="title" name='title' value={Title} onChange={onChange} />
                    <h5 htmlFor="exampleInputEmail1" className="form-label mb-2 mt-4 ms-1">Slug:</h5>
                    <input type="text" className="form-control" id="slug" name='slug' value={Slug} readOnly />
                    <h5 htmlFor="exampleInputEmail1" className="form-label mb-2 mt-4 ms-1">Content:</h5>
                    <Editor
                        apiKey={import.meta.env.VITE_EDITOR_API_KEY}
                        onInit={handleEditorInit}
                        initialValue="<p>Type here....</p>"
                        init={{
                            height: 400,
                            menubar: true,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | fontsize | fontfamily |' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ',
                            content_style: 'body { font-family:Poppins,sans-serif; font-size:14px }'
                        }}
                    />
                    {editorLoading && <div class="d-flex justify-content-center">
                        <div class="spinner-border" role="status" style={{width:'5rem',height:'5rem'}}>
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>}
                </div>
                <div style={{ width: '35%' }}>
                    <div className="d-flex">
                        <h5 htmlFor="exampleInputEmail1" className="form-label">Featured Image:</h5>
                        <span className='ms-2' id='imagePrompt' style={{ color: 'red', visibility: 'hidden' }}>File is required*</span>
                    </div>
                    <div className="input-group mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        <input type="file" className="form-control" id="inputGroupFile02" value={image} onChange={ImageUpload} />
                    </div>
                    <select className="form-select" aria-label="Default select example" style={{ fontFamily: "'Poppins', sans-serif" }} value={isActive} onChange={e => setIsActive(e.target.value)}>
                        <option value="active">active</option>
                        <option value="inactive">In active</option>
                    </select>
                    <div className="d-grid gap-2 my-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        <button className="btn btn-primary" type="submit">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

const convertToBase64 = file => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result);
        }
        fileReader.onerror = e => reject(e);
    })
}
