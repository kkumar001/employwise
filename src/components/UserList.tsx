import { useEffect, useState } from "react"
import logo from "../assets/logo.png"
import UserCard from "./UserCard";

type UserType = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}


const UserList = () => {
  const [currPage, setCurrPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<UserType[]>([]);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const fetchUsers = async () => {
    setLoading(true);
    const baseUrl = import.meta.env.VITE_BASE_URL;
    try {
      const response = await fetch(`${baseUrl}/api/users?page=${currPage}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      if (result) {
        setTotalPages(result.total_pages);
        setUsers(result.data);
        setLoading(false);
      } else {
        alert("Something went wrong!");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isDeleted) {
      fetchUsers();
      setIsDeleted(false);
    }
  }, [isDeleted])

  useEffect(() => {
    fetchUsers();
  }, [currPage])

  return (
    <div className="flex items-center gap-8 flex-col p-4 pr-1 w-[100%] h-[100vh]">
      <img loading="lazy" src={logo} width={200} />
      <h1 className="font-bold text-4xl text-primary underline">User List</h1>
      <div style={{ justifyContent: loading ? "center" : "start" }} className="flex items-center flex-col gap-4 w-[100%] overflow-y-auto h-[calc(100vh-192px)] p-2 pr-4">
        {loading ? (
          <div className="loaderUser"></div>
        ) : (
          users.length > 0 ? (
            users.map((user: UserType) => (
              <UserCard setIsDeleted={setIsDeleted} key={user.id} id={user.id} first_name={user.first_name} last_name={user.last_name} avatar={user.avatar} />
            ))
          ) : (
            <p className="text-red-500 font-semibold text-2xl">No User!</p>
          )
        )}
      </div>
      <div className="flex w-[100%] items-center justify-center gap-4 -mt-4">
        <button
          onClick={() => setCurrPage(prev => prev - 1)}
          disabled={currPage === 1}
          className="rounded-2xl bg-gray-200 shadow-md p-2 font-semibold text-sm">
          Prev
        </button>
        <p>{currPage}/{totalPages}</p>
        <button
          onClick={() => setCurrPage(prev => prev + 1)}
          disabled={currPage === totalPages}
          className="rounded-2xl bg-gray-200 shadow-md p-2 text-sm font-semibold">
          Next
        </button>
      </div>
    </div>
  )
}

export default UserList