import { createBrowserRouter, redirect } from "react-router-dom"
import Login from "./pages/Login"
import Post from "./pages/post"
import GitHub from "./pages/GitHubLogin"
import MyUsers from "./pages/MyUsers"
import UpdateUser from "./pages/UpdateUser"
import MyPost from "./pages/MyPost"
import Register from "./pages/Register"
import Add from "./pages/Add"
import Edit from "./pages/Edit"


const authHome = () => {
    if (!localStorage.access_token) {
        return redirect("/login")
    }
    return null
}

const authLogin = () => {
    if (localStorage.access_token) {
        return redirect("/post")
    }
    return null
}

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login/>,
        loader: authLogin
    },
    {
        path: '/post',
        element: <Post/>,
        loader: authHome
    },
    {
        path: '/',
        loader: () => {
            if (!localStorage.access_token) {
               return redirect ("/login") 
            } else if (localStorage.access_token) {
                return redirect ("/post") 
             } 
            return null
        }
    },
    {
        path: '/gitHubLogin/:access_token',
        element: <GitHub/>,
    },
    {
        path: '/myusers',
        element: <MyUsers/>,
        loader: authHome
    },
    {
        path: '/update/:id',
        element: <UpdateUser/>,
        loader: authHome
    },
    {
        path: '/myPost',
        element: <MyPost/>,
        loader: authHome
    },
    {
        path: '/register',
        element: <Register/>,
    },
    {
        path: '/add',
        element: <Add/>,
       
    },
    {
        path: "/userProfile/:id",
        element: <Edit/>,
        loader: authHome
    }
])

export default router