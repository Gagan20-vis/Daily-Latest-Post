import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './app/store.js'
import Login from './components/Login/index.jsx';
import Signup from './components/Signup/index.jsx';
import Home from './components/Home.jsx';
import AddPost from './components/AddPost/index.jsx'
import AllPosts from './components/AllPosts/index.jsx'
import ViewPost from './components/ViewPost/index.jsx'
import EditPost from './components/EditPost/index.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: '/addPost',
        element: <AddPost />
      },
      {
        path: '/allpost',
        element: <AllPosts />
      },
      {
        path: 'post/:id',
        element: <ViewPost />
      },
      {
        path: 'edit/:id',
        element: <EditPost/>
      }
    ]
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
