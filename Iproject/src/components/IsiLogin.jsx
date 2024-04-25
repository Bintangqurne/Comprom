import { useEffect, useState } from "react";
import instance from "../config/instance";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BiUser } from "react-icons/bi";
import { BiLock } from "react-icons/bi";
import { BiLogoGithub } from "react-icons/bi";

const IsiLogin = () => {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });

  const submitHandler = async (event) => {
    try {
      event.preventDefault();
      const { data } = await instance.post("/login", {
        email: loginForm.email,
        password: loginForm.password,
      });
      console.log(data.access_token);
      localStorage.setItem("access_token", data.access_token);
      navigate("/post");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleCredentialResponse = async ({ credential }) => {
    console.log(credential);
    try {
      const { data } = await instance.post(
        "/google-login",
        {},
        {
          headers: {
            ["google-token"]: credential,
          },
        }
      );
      console.log(data.access_token);
      localStorage.setItem("access_token", data.access_token);
      navigate("/post");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    google.accounts.id.initialize({
      // ditaruh di .env
      client_id:
        "226340901131-ihklr7d0frg6tqv0sc7gcpta5nkvfc3c.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById("google-login"),
      { theme: "outline", size: "large" } // customization attributes
    );
    google.accounts.id.prompt(); // also display one tap dialog
  }, []);

  return (
    <div className="">
      <div className="bg-slate-800 border border-slate-400 rounded-md p-20 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative items-center">
        <h1
          className="text-4xl text-white font-bold text-center  "
          style={{ fontFamily: "cursive" }}
        >
          Login
        </h1>
        <form onSubmit={submitHandler}>
          <div className="relative my-4">
            <input
              type="email"
              name="email"
              value={loginForm.email}
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
              Email
            </label>
          </div>
          <div className="relative my-4">
            <input
              type="password"
              name="password"
              value={loginForm.password}
              onChange={handleChange}
              style={{ width: "440px" }}
              className="block pt-3.5 pb-3 text-sm text-white bg-transparent border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer:"
            />
            {loginForm.password ? null : ( 
              <BiLock className="absolute top-3 right-0 size-6" />
            )}
            <label
              htmlFor=""
              style={{ fontSize: "25px", fontFamily: "monospace" }}
              className="absolute text-lg text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-5 origin-[0] peer-focus:translate-y-0 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:translate-y-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-grey-400 peer-focus:dark:border-blue-500"
            >
              Password
            </label>
          </div>
          <button
            type="submit"
            style={{ fontFamily: "monospace" }}
            className="w-full mb-4 text-[18px] mt-2 rounded-3xl bg-pink-500 hover:bg-pink-600 active:bg-pink-700 focus:outline-none focus:ring focus:ring-pink-300 py-2 opacity-90"
          >
            Login
          </button>
        </form>
        <div
          className="relative w-full mb-4 text-[18px] mt-2 rounded-3xl bg-white text-black hover:bg-pink-600 hover:text-black py-2 text-center"
          style={{ fontFamily: "monospace" }}
        >
          <a href="https://github.com/login/oauth/authorize?client_id=c61e218869c0da3553a3">
            Login with GitHub
          </a>
          <BiLogoGithub className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 size-10" />
        </div>

        <div
          id="google-login"
          style={{
            alignItems: "center",
            justifyItems: "center",
            justifyContent: "center",
            paddingBottom: "20PX",
            paddingLeft: "90px",
            paddingRight: "50px",
            paddingTop: "20px",
          }}
        ></div>
        <div
          style={{
            alignItems: "center",
            justifyItems: "center",
            justifyContent: "center",
            paddingBottom: "20PX",
            paddingLeft: "75px",
            paddingRight: "50px",
            paddingTop: "20px",
          }}
        >
          Belum Punya Akun? Register Disini{" "}
          <button
            onClick={() => navigate("/register")}
            style={{ color: "blue" }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default IsiLogin;
