import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"
import { useState } from "react";
import Cookies from "js-cookie";

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const nagivate = useNavigate();

  const handleSubmit = async (data: any) => {
    setLoading(true);
    const baseUrl = import.meta.env.VITE_BASE_URL;
    try {
      const response = await fetch(`${baseUrl}/api/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        })
      });
      const result = await response.json();
      const newToken = result.token;
      if (newToken) {
        Cookies.set('accesstoken', newToken, { expires: 1, secure: true, sameSite: 'strict' });
        setLoading(false);
        nagivate("/");
        alert("Login Successfull!");
      } else {
        setLoading(false);
        alert("Login Failed!");
      }
    } catch (error) {
      console.error('Error fetching token:', error);
      setLoading(false);
      alert("Login Failed!");
    }
  }

  return (
    <div className="flex items-center justify-center h-[100vh] w-[100%]">
      <div className="flex items-center flex-col max-w-[450px] w-[100%] p-4 gap-8">
        <img loading="lazy" src={logo} width={200} />
        <form
          onSubmit={
            (e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              const data = Object.fromEntries(formData.entries());
              handleSubmit(data);
            }
          }
          className="w-[100%]"
        >
          <div className="flex flex-col gap-6 w-[100%] text-[16px]">
            <div className="flex flex-col gap-2  w-[100%]">
              <label htmlFor="email" className="font-bold">Email</label>
              <input
                type="email"
                required
                name="email"
                className="rounded-[6px] w-[100%] px-2 h-10 border-[#000] border focus:outline-none" />
            </div>
            <div className="flex flex-col gap-2 w-[100%]">
              <label htmlFor="password" className="w-[100%] font-bold">Password</label>
              <input
                type="password"
                required
                name="password"
                className="rounded-[6px] w-[100%] px-2 h-10 border-[#000] border focus:outline-none"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-[100%] flex justify-center items-center mt-8 bg-primary h-10 rounded-md font-bold text-white"
          >
            {loading ?
              <div className="loader"></div>
              :
              "Login"
            }
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login