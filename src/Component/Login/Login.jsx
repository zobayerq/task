import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import "react-toastify/dist/ReactToastify.css";
import { FaRegEye, FaRegEyeSlash} from "react-icons/fa6";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { setlocation, loginUser, GoogleLogin, user } = useAuth();
  const location = useLocation();
  console.log(location.state);
  setlocation(location.state);
  const [pass ,setpass] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

  const from = location.state || '/';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    console.log(formData);
    try {
      const loginResult = await loginUser(formData.email, formData.password);
      console.log(loginResult.user);

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/jwt`,
        {
          email: loginResult?.user?.email,
        },
        { withCredentials: true }
      );
      console.log(data);
      toast.success('Signin Successful');
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  };
  
  const typ = pass ? "password" : "text";
  const eyeIconClassNameopen = pass ? "text-xl absolute top-3 right-4  hidden" : "text-xl absolute top-3 right-4 cursor-pointer";
  const eyeIconClassNameclos = pass ? "text-xl absolute top-3 right-4 cursor-pointer" : "text-xl absolute top-3 right-4 hidden";

  const togglepass = () => {
    setpass(false);
  };

  const togglepasstr = () => {
    setpass(true);
  };

  const handleSocialLogin = async () => {
    try {
      const result = await GoogleLogin();
      console.log(result.user);

      // const { data } = await axios.post(
      //   `${import.meta.env.VITE_API_URL}/jwt`,
      //   {
      //     email: result?.user?.email,
      //   },
      //   { withCredentials: true }
      // );
      // console.log(data);
      toast.success('Signin Successful');
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  };

  return (
    <div>
      <Helmet>
        <title>ChallengeMe || Login</title>
      </Helmet>
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl border  font-sans mx-auto border-custom-bg">
        <h1 className="text-3xl font-bold text-center text-custom-bg">
          Login
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2 text-sm">
            <label htmlFor="username" className="block ">
              Your email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              name="email"
              placeholder="Email"
              className="w-full border-b-2 bg-transparent outline-none placeholder:italic focus:outline-none "
            />
             {errors.email && <span className="text-red-500">email field is required</span>}
          </div>
          <div className="space-y-2 text-sm">
            <div className="space-y-2 text-sm">
              <label className="block">
                Password
              </label>
              <div className="relative">
                <input
                  {...register("password", { required: true })}
                  type={typ}
                  placeholder="Password"
                  className="w-full border-b-2 bg-transparent outline-none placeholder:italic focus:outline-none "
                />
                {errors.password && <span className="text-red-500">password field is required</span>}
                <FaRegEyeSlash onClick={togglepass} className={eyeIconClassNameclos}/>
                <FaRegEye onClick={togglepasstr} className={eyeIconClassNameopen} />
              </div>
            </div>
            <div className="flex justify-end text-xs ">
              <a href="#" className="hover:underline">
                Forgot Password?
              </a>
            </div>
          </div>
          <button className="text-lg rounded-xl relative p-[10px] block w-full bg-custom-bg text-white border-y-4 duration-500 overflow-hidden focus:border-custom-bg z-50 group">
            Log In
            <span className="absolute opacity-0 group-hover:opacity-100 duration-100 group-hover:duration-1000 ease-out flex justify-center inset-0 items-center z-10 text-white">
              Let s go
            </span>
            <span className="bg-[#fab817] absolute inset-0 -translate-y-full group-hover:translate-y-0 group-hover:duration-1000"></span>
            <span className="bg-[#fab817] absolute inset-0 translate-y-full group-hover:translate-y-0 group-hover:duration-1000"></span>
            <span className="bg-[#fab817] absolute inset-0 translate-x-full group-hover:translate-x-0 group-hover:delay-300 delay-100 duration-1000"></span>
            <span className="bg-[#fab817] absolute inset-0 -translate-x-full group-hover:translate-x-0 group-hover:delay-300 delay-100 duration-1000"></span>
          </button>
        </form>
        <div className="flex items-center pt-4 space-x-2">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="text-sm text-gray-600">Login with social accounts</p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
        <div className="flex justify-center space-x-4">
          <button onClick={handleSocialLogin} aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-3 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-custom-bg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current ">
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
            <p className="text-xl font-semibold"> Login with Google</p>
          </button>
        </div>
        <div className="flex gap-2 items-center justify-center">
          <div className="text-sm text-center">
            Dont have an account?
          </div>
          <Link to="/Rejistition" className="underline text-custom-bg text-lg">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
