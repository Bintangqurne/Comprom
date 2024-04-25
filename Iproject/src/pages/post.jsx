import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchPost } from "../store/appSlice";
import Navbar from "./Navbar";
import {BiHome} from "react-icons/bi"
import {BiSearch} from "react-icons/bi"
import {BiHeart} from "react-icons/bi"
import Navbar1 from "./Navbar1";


export default function Post() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { post } = useSelector((state) => state.appReducer);
  console.log(localStorage.access_token);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  useEffect(() => {
    dispatch(fetchPost());
    console.log(fetchPost(), "ini data");
  }, []);

  return (
    <>
    <Navbar1/>

    </>
  );
  
}
