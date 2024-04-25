import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMyPost, fetchPost, fetchUsers, fetchLike } from "../store/appSlice";
import { BiHome, BiSolidHeart } from "react-icons/bi";
import { BiSearch } from "react-icons/bi";
import { BiHeart } from "react-icons/bi";
import axios from "../config/instance"
import { IoChatbubbleOutline } from "react-icons/io5";
import { VscInbox } from "react-icons/vsc";


export default function Post() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

        const [isExpanded, setIsExpanded] = useState(false);
      
        const toggleExpand = () => {
          setIsExpanded(!isExpanded);
        };

  const { post } = useSelector((state) => state.appReducer);
  const { mypost } = useSelector((state) => state.appReducer);
  const { user } = useSelector((state) => state.appReducer);
  const { like } = useSelector((state) => state.appReducer);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };
  
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  
  async function Add(id) {
    try {
      const Add = await axios.post(`/like/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      })
      dispatch(fetchMyPost())
      dispatch(fetchLike())
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    dispatch(fetchMyPost());
  }, []);
  
  useEffect(() => {
      dispatch(fetchLike());
    }, []);
    console.log(post, 'ini post');
    
  return (
    <>
      <div className="h-screen w-screen flex position-fixed">
        <aside className="flex flex-col items-center bg-white text-gray-700 shadow h-full">
          <div className="h-16 flex items-center w-full">
            <a href="http://localhost:5173/myusers" className="h-16 px-6 flex justify-center items-center w-full focus:text-orange-500">
              <img className="h-10 w-10 rounded-full" src={user.image ? user.image : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"} />
            </a>
          </div>
          <ul>
            <li className="hover:bg-gray-100">
              <a href="http://localhost:5173/post" className="h-16 px-6 flex justify-center items-center w-full focus:text-orange-500">
                <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <BiHome className="pt-8"/> 
                </svg>
              </a>
            </li>
            <li className="hover:bg-gray-100">
              <a href="http://localhost:5173/myPost" className="h-16 px-6 flex justify-center items-center w-full focus:text-orange-500">
                <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <VscInbox className="pt-8"/> 
                </svg>
              </a>
            </li>
          </ul>
          <div className="mt-auto h-16 flex items-center w-full">
            <button className="h-16 w-10 mx-auto flex flex justify-center items-center w-full focus:text-orange-500 hover:bg-red-200 focus:outline-none" onClick={handleLogout}>
              <svg className="h-5 w-5 text-red-700" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1={21} y1={12} x2={9} y2={12} />
              </svg>
            </button>
          </div>
        </aside>
        <div  className="flex flex-grow overflow-y-scroll">
        <div className="h-screen pl-96">
          <div className="flex items-stretch md:items-center">
            <div className="p-4">
            {mypost.length === 0 ? (
    <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold items-center p-40">Data Not Found!!</h1>
    </div>
) : (
    mypost.map((el, i) => (
        <div className="bg-white border rounded-sm max-w-md my-2">
      <div className="flex items-center px-4 py-3">
        <img
          className="h-8 w-8 rounded-full"
          key={el.User.id}
          src={el.User.image ? el.User.image : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"}
        />
        <div className="ml-3">
          <span className="text-sm font-semibold antialiased block leading-tight" key={el.User.id}>
            {el.User.fullName}
          </span>
        </div>
      </div>
      <img src={el.imageUrl} />
      <div className="flex items-center justify-between mx-4 mt-3 mb-2">
        <div className="flex gap-5">
          {el.Likes.some((like) => like.UserId === user.id) ? (
            <button style={{ width: "24px", height: "24px", fontSize: "30px", paddingBottom: "5px", color: "red" }} onClick={() => Add(el.id)}>
              <BiSolidHeart />
            </button>
          ) : (
            <button style={{ width: "24px", height: "24px", fontSize: "30px", paddingBottom: "5px" }} onClick={() => Add(el.id)}>
              <BiHeart />
            </button>
          )}
          <button style={{ width: "24px", height: "24px", fontSize: "30px", paddingBottom: "5px" }}>
            <IoChatbubbleOutline />
          </button>
        </div>
        <div className="flex">
          <svg fill="#262626" height={24} viewBox="0 0 48 48" width={24}>
            <path d="M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z" />
          </svg>
        </div>
      </div>
      <div className="font-semibold text-sm mx-4 mt-2 mb-2">
        {el.Likes.length} Likes
      </div>
      <p className="pl-6">
        <span style={{ fontWeight: "bold" }}>{el.User.fullName}</span>{" "}
        {isExpanded ? el.description : `${el.description.slice(0, 10)}...`}
        <button onClick={toggleExpand}>
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      </p>
    </div>

    ))
)}
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
