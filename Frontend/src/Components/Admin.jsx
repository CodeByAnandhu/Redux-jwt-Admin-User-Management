import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Admin() {
    const [userData, setUserData] = useState([]);
    const [isEditing, setIsEditing] = useState({ name: null, email: null, profilePic: null, userId: null, modal: false });
    const [isCreated, setIsCreated] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userId, setId] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/admin/userData", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({}) 
                });
                if (!response.ok) {
                    throw new Error(`Failed to fetch user data: ${response.statusText}`);
                }
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                toast.error("Failed to load user data");
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);
   
 
    
    const editUser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/api/admin/editUser/${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    userId
                }) 
            });
            if (!response.ok) {
                throw new Error(`Failed to edit user data: ${response.statusText}`);
            }
            const data = await response.json();
            setUserData(data);
            setName("");
            setEmail("");
            setPassword("");
            toast.success("User updated successfully");
            setIsEditing({ name: null, email: null, profilePic: null, userId: null, modal: false }); 
        } catch (error) {
            toast.error("Failed to update user data");
            console.error("Error editing user data:", error);
        }
    };


    const deleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/api/admin/deleteUser/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({})
            });
            if (!response.ok) {
                throw new Error(`Failed to delete user: ${response.statusText}`);
            }
            const data = await response.json();
            setUserData(data);
            toast.success("User deleted successfully");
        } catch (error) {
            toast.error("Failed to delete user");   
            console.error("Error deleting user:", error);
        }
    };


    const createUser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/api/admin/createUser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                }) 
            });
            if (!response.ok) {
                throw new Error(`Failed to create user: ${response.statusText}`);
            }
            const data = await response.json();
            setUserData(data);
            setName("");
            setEmail("");
            setPassword("");
            toast.success("User created successfully");
        } catch (error) {   

            toast.error("Failed to create user");
            console.error("Error creating user:", error);
        }
    };





    return (
        <div className="pt-10 bg-gray-100 min-h-screen font-poppins select-none">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 bg-white mt-20 p-20 rounded-xl drop-shadow-md">
                <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                                <button className="bg-blue-400 text-white absolute right-10 p-2 top-6 rounded-xl hover:bg-blue-500 hover:transition-all duration-200" onClick={()=>setIsCreated(true)}>Create</button>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 rounded-lg">
                        {userData.map((item) => (
                            <tr key={item._id} className="bg-gray-100">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <img className="h-10 w-10 rounded-full" src={item.profilePic ? item.profilePic : "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="" />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {item.name}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {item.email}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {item.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <a href="#" className="text-indigo-600 hover:text-indigo-900 bg-gray-100 p-2 rounded-lg hover:bg-gray-300 hover:transition-all duration-200" onClick={() => {
                                        setIsEditing({ name: item.name, email: item.email, userId: item._id, modal: true });
                                        setId(item._id);
                                        setName(item.name);
                                        setEmail(item.email);
                                    }}>Edit</a>
                                    <a href="#" className="ml-2 text-red-600 hover:text-red-900 bg-gray-100 p-2 rounded-lg hover:bg-gray-300 hover:transition-all duration-200" onClick={() => deleteUser(item._id)}>Delete</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

         {isCreated && <div className="fixed inset-0 bg-black bg-opacity-40 z-50">
                <div className="w-1/3 bg-white p-20 rounded-xl drop-shadow-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <i onClick={() => setIsCreated(false)} className="fa-solid fa-xmark cursor-pointer w-3 text-xl absolute right-10 top-10"></i>
                    <form onSubmit={createUser} className="flex flex-col gap-4">
                        <label className="text-gray-800" htmlFor="">Name</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-100 p-2 border-2 border-blue-100 rounded-lg" type="text" />
                        <label htmlFor="">Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-100 p-2 border-2 border-blue-100 rounded-lg" type="email" />
                        <label htmlFor="">Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-100 p-2 border-2 border-blue-100 rounded-lg" type="password" />
                        <button className="bg-blue-400 text-white p-2 rounded-xl hover:bg-blue-500 hover:transition-all duration-200">Create</button>
                    </form>
                    
                </div>
            </div>}

            {isEditing.modal && 
                <div className="fixed inset-0 bg-black bg-opacity-40 z-50">
                <div className="w-1/3 bg-white p-10 rounded-xl drop-shadow-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <i onClick={() => setIsEditing({ name: null, email: null, profilePic: null, userId: null, modal: false })} className="fa-solid fa-xmark cursor-pointer w-3 text-xl absolute right-10 top-10"></i>
                    <form onSubmit={editUser} className="flex flex-col gap-4">
                        <label className="text-gray-800" htmlFor="">Name</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-100 p-2 border-2 border-blue-100 rounded-lg" placeholder={isEditing.name} type="text" />
                        <label htmlFor="">Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-100 p-2 border-2 border-blue-100 rounded-lg" placeholder={isEditing.email} type="text" />
                        <label htmlFor="">Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-100 p-2 border-2 border-blue-100 rounded-lg" placeholder="Password" type="text" />
                        <button className="bg-blue-400 mt-5 text-white p-2 rounded-xl hover:bg-blue-500 hover:transition-all duration-200">Save</button>
                    </form>
                </div>
                </div>
            }
           
        </div>
    );
}

export default Admin;
