import { useEffect, useState } from "react";
import logo from "../assets/logo.png"
import { useNavigate, useParams } from "react-router-dom";

type UserEditType = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

const EditUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userLoading, setUserLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<UserEditType>({ id: "", first_name: "", last_name: "", email: "" })

  const nagivate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const getUserById = async () => {
    setUserLoading(true);
    const baseUrl = import.meta.env.VITE_BASE_URL;
    try {
      const response = await fetch(`${baseUrl}/api/users/${id}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.data) {
        setFormData({ ...(data.data) });
        setUserLoading(false);
      } else {
        setUserLoading(false);
      }
    } catch (error) {
      setUserLoading(false);
    }
  }

  const handleSubmit = async (data: any) => {
    setLoading(true);
    const baseUrl = import.meta.env.VITE_BASE_URL;
    try {
      const response = await fetch(`${baseUrl}/api/users/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
        })
      });
      const result = await response.json();
      if (result) {
        setLoading(false);
        nagivate("/");
        alert(`User with id ${id} updated successfull!`);
      } else {
        setLoading(false);
        alert("Updation Failed!");
      }
    } catch (error) {
      console.error('Error fetching token:', error);
      setLoading(false);
      alert("Updation Failed!");
    }
  }

  useEffect(() => {
    getUserById();
  }, [id])

  return (
    <div className="flex items-center justify-center h-[100vh] w-[100%]">
      <div className="flex items-center flex-col max-w-[450px] w-[100%] p-4 gap-8">
        <img loading="lazy" src={logo} width={200} />
        {userLoading ? (
          <div className="loaderUser"></div>
        ) : (
          <form
            onSubmit={
              (e) => {
                e.preventDefault();
                const data = { ...formData };
                handleSubmit(data);
              }
            }
            className="w-[100%]"
          >
            <div className="flex flex-col gap-6 w-[100%] text-[16px]">
              <div className="flex flex-col gap-2  w-[100%]">
                <label htmlFor="first_name" className="font-bold">First Name</label>
                <input
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  type="text"
                  required
                  name="first_name"
                  className="rounded-[6px] w-[100%] px-2 h-10 border-[#000] border focus:outline-none" />
              </div>
              <div className="flex flex-col gap-2  w-[100%]">
                <label htmlFor="last_name" className="font-bold">Last Name</label>
                <input
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  type="text"
                  required
                  name="last_name"
                  className="rounded-[6px] w-[100%] px-2 h-10 border-[#000] border focus:outline-none" />
              </div>
              <div className="flex flex-col gap-2  w-[100%]">
                <label htmlFor="email" className="font-bold">Email</label>
                <input
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  type="email"
                  required
                  name="email"
                  className="rounded-[6px] w-[100%] px-2 h-10 border-[#000] border focus:outline-none" />
              </div>
            </div>
            <button
              type="submit"
              className="w-[100%] flex justify-center items-center mt-8 bg-blue-600 h-10 rounded-md font-bold text-white"
            >
              {loading ?
                <div className="loader"></div>
                :
                "Update"
              }
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default EditUser