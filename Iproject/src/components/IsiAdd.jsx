import { useEffect, useState } from "react";
import instance from "../config/instance";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BiImage, BiPaperPlane, BiUser } from "react-icons/bi";
import { BiLock } from "react-icons/bi";
import { BiLogoGithub } from "react-icons/bi";

const IsiAdd = () => {
  const navigate = useNavigate();
  const [add, setAdd] = useState({
    title: "",
    imageUrl: "",
    description: "",
  });

  const submitHandler = async (event) => {
    try {
      event.preventDefault();
      const { data } = await instance.post(
        "/add",
        {
          title: add.title,
          imageUrl: add.imageUrl,
          description: add.description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      navigate("/post");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdd({ ...add, [name]: value });
  };

  return (
    <div className="">
      <div className="bg-slate-800 border border-slate-400 rounded-md p-20 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative items-center">
        <h1
          className="text-4xl text-white font-bold text-center  "
          style={{ fontFamily: "cursive" }}
        >
          Posting
        </h1>
        <form onSubmit={submitHandler}>
          <div className="relative my-4">
            <input
              type="title"
              name="title"
              value={add.title}
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
              Title
            </label>
          </div>
          <div className="relative my-4">
            <input
              type="imageUrl"
              name="imageUrl"
              value={add.imageUrl}
              onChange={handleChange}
              style={{ width: "440px" }}
              className="block pt-3.5 pb-3 text-sm text-white bg-transparent border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer:"
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
              type="description"
              name="description"
              value={add.description}
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
            ADD
          </button>
        </form>
      </div>
    </div>
  );
};

export default IsiAdd;
