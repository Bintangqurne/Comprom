import { useEffect } from "react"
import { redirect, useLocation, useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom";
export default function GitHub() {
    const navigate = useNavigate()
    const location = useLocation();
    const {access_token} = useParams()
    useEffect(() => {
        // console.log(access_token, '<<<<<<');
        if (access_token) {
            localStorage.setItem('access_token', access_token);
            navigate('/post')
            console.log(access_token);
        } else {
            navigate('/login')
        }
    }, [])
    return(
        <>
        </>
    )
}