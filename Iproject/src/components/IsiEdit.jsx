import { useEffect, useState } from "react";
import axios from "../config/instance";
import { useNavigate, useParams } from "react-router-dom";
import { BiHome, BiImage, BiPaperPlane, BiUser } from "react-icons/bi";
import { BiLock } from "react-icons/bi";
import { BiLogoGithub } from "react-icons/bi";
import { fetchUsers, fetchMyUsers } from "../store/appSlice";
import { useDispatch, useSelector } from "react-redux";

const IsiEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.appReducer);
  const [edit, setEdit] = useState({
    fullName: user.fullName,
    image: user.image,
    address: user.address,
    description: user.description,
  });
  const dispatch = useDispatch()

  const { myuser } = useSelector((state) => state.appReducer);


  useEffect(() => {
    dispatch(fetchMyUsers(id));
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEdit({ ...edit, [name]: value });
  };
  
  console.log(edit, 'ini user');

  async function handlerEdit(e) {
    try {
      e.preventDefault();
      const { data } = await axios.put(`/users/${id}`, edit, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log(data, "ini data");
      navigate("/myusers");
      dispatch(fetchUsers());
    } catch (error) {
      console.log(error, "error ini");
    }
  }

  return (
    <div className="">
      <div className="bg-slate-800 border border-slate-400 rounded-md p-20 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative items-center">
        <h1
          className="text-4xl text-white font-bold text-center  "
          style={{ fontFamily: "cursive" }}
        >
          Edit User Profile
        </h1>
        <form onSubmit={handlerEdit}>
          <div className="relative my-4">
            <input
              type="fullName"
              name="fullName"
              value={edit.fullName}
              onChange={handleChange}
              style={{ width: "440px" }}
              className="block pt-3.5 pb-3 text-sm text-white bg-transparent border-b-2  border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer:"
            />
            <BiUser className="absolute top-3 right-0 size-6" />
            <label
              htmlFor=""
              style={{ fontSize: "25px", fontFamily: "monospace" }}
              className="absolute text-lg text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-5 origin-[0] peer-focus:translate-y-0 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-grey-400 peer-focus:dark:border-blue-500"
            >
              Full Name
            </label>
          </div>
          <div className="relative my-4">
            <input
              type="text"
              name="image"
              value={edit.image}
              onChange={handleChange}
              style={{ width: "440px" }}
              className="block pt-3.5 pb-3 text-sm text-white bg-transparent border-b-2  border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer:"
            />
            <BiImage className="absolute top-3 right-0 size-6" />
            <label
              htmlFor=""
              style={{ fontSize: "25px", fontFamily: "monospace" }}
              className="absolute text-lg text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-5 origin-[0] peer-focus:translate-y-0 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-grey-400 peer-focus:dark:border-blue-500"
            >
              Image
            </label>
          </div>
          <div className="relative my-4">
            <input
              type="address"
              name="address"
              value={edit.address}
              onChange={handleChange}
              style={{ width: "440px" }}
              className="block pt-3.5 pb-3 text-sm text-white bg-transparent border-b-2  border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer:"
            />
            <BiHome className="absolute top-3 right-0 size-6" />
            <label
              htmlFor=""
              style={{ fontSize: "25px", fontFamily: "monospace" }}
              className="absolute text-lg text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-5 origin-[0] peer-focus:translate-y-0 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-grey-400 peer-focus:dark:border-blue-500"
            >
              Address
            </label>
          </div>
          <div className="relative my-4">
            <input
              type="description"
              name="description"
              value={edit.description}
              onChange={handleChange}
              style={{ width: "440px" }}
              className="block pt-3.5 pb-3 text-sm text-white bg-transparent border-b-2  border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer:"
            />
            <BiPaperPlane className="absolute top-3 right-0 size-6" />
            <label
              htmlFor=""
              style={{ fontSize: "25px", fontFamily: "monospace" }}
              className="absolute text-lg text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-5 origin-[0] peer-focus:translate-y-0 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-grey-400 peer-focus:dark:border-blue-500"
            >
              Description
            </label>
          </div>

          <button
            type="submit"
            style={{ fontFamily: "monospace" }}
            className="w-full mb-4 text-[18px] mt-2 rounded-3xl bg-pink-500 hover:bg-pink-600 active:bg-pink-700 focus:outline-none focus:ring focus:ring-pink-300 py-2 opacity-90"
          >
            edit
          </button>
        </form>
      </div>
    </div>
  );
};

export default IsiEdit;
