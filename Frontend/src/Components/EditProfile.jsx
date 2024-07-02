import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useUpdateUserMutation } from "../slices/userApiSlice";
import UserNav from "./UserNav";
import axios from 'axios';

function EditProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  console.log("userInfo", userInfo);
  const [updateProfile] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setProfilePicUrl(userInfo.profilePic);
  }, [userInfo.name, userInfo.email ,userInfo.profilePic]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
  };


  const handleRegister = async (e) => {
    e.preventDefault();
  
    let imageUrl = profilePicUrl;
    if (profilePic) {
      const formData = new FormData();
      formData.append('profilePic', profilePic);
      console.log('formData', formData);
      try {
        const { data } = await axios.post('/api/user/updateProfile', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        imageUrl = data.profilePic; 
        console.log('imageUrl', imageUrl);
      } catch (err) {
        console.error('Image upload failed:', err);
        toast.error('Image upload failed');
        return;
      }
    }
  
    try {
      const res = await updateProfile({
        _id: userInfo._id,
        name,
        email,
        password,
        profilePic: imageUrl,
      }).unwrap();
      console.log('res', res);
      dispatch(setCredentials({ ...res }));
      toast.success('Profile updated successfully');
      navigate('/user');
    } catch (err) {
      console.error('Profile update failed:', err);
      toast.error(err?.data?.message || err.error);
    }
  };
  



  return (
    <div>
      <UserNav />
      <div className="flex items-center justify-center min-h-screen font-poppins bg-gray-100 select-none">
        <div className="w-full max-w-sm bg-white border rounded-2xl mt-20 shadow-md flex flex-col p-6 h-full gap-3">
          <form onSubmit={handleRegister} className="flex flex-col gap-3">
            <i
              onClick={() => navigate("/user")}
              className="fa-solid fa-xmark cursor-pointer w-3 text-lg"
            ></i>
            <img
              className="w-14"
              src={
                profilePic
                  ? profilePic
                  : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="Profile"
            />
            <label htmlFor="name">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 outline-blue-100 border rounded-2xl"
              type="text"
              name="name"
              placeholder="Name"
            />
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 outline-blue-100 border rounded-2xl"
              type="email"
              name="email"
              placeholder="Email"
            />
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 outline-blue-100 border rounded-2xl"
              type="password"
              name="password"
              placeholder="Password"
            />
            <label htmlFor="profilePic">Set your Avatar</label>
            <input
               onChange={handleFileChange}
              className="w-full p-2 outline-blue-100 border rounded-2xl cursor-pointer"
              type="file"
              name="profilePic"
            />
            <button className="w-full p-2 bg-blue-500 text-white rounded-2xl mt-5">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
