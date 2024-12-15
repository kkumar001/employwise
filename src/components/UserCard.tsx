import { useState } from "react";
import { useNavigate } from "react-router-dom";

type UserType = {
    id: string;
    first_name: string;
    last_name: string;
    avatar: string;
    setIsDeleted: (bol: boolean) => void;
}

const UserCard = ({ id, first_name, last_name, avatar , setIsDeleted}: UserType) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    const handleDelete = async () => {
        setLoading(true);
        const baseUrl = import.meta.env.VITE_BASE_URL;
        try {
            const response = await fetch(`${baseUrl}/api/users/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status) {
                alert(`User with id ${id} deleted successfully!`);
                setLoading(false);
                setIsDeleted(true);
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

    return (
        <div
            style={{ boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px" }}
            className='flex items-center justify-between p-4 w-[100%] rounded-xl'>
            <div className='flex gap-3 items-center'>
                <img loading="lazy" src={avatar} width={64} height={64} alt={first_name} className="rounded-full" />
                <div className='flex flex-col gap-2'>
                    <p className='text-[16px] font-medium'>First Name : <span className='text-primary'>{first_name}</span></p>
                    <p className='text-[16px] font-medium'>Last Name : <span className='text-primary'>{last_name}</span></p>
                </div>
            </div>
            <div className='flex gap-4 items-center'>
                <button
                    disabled={loading}
                    onClick={() => navigate(`/user/${id}`)}
                    className="h-8 px-3 text-white font-bold bg-blue-600 rounded-md w-[100px]">
                    Edit
                </button>
                <button
                    onClick={handleDelete}
                    disabled={loading}
                    style={{ opacity: loading ? 0.5 : 1 }}
                    className="h-8 px-3 text-white font-bold bg-red-600 rounded-md w-[100px]">
                    {loading ? "..." : "Delete"}
                </button>
            </div>
        </div>
    )
}

export default UserCard