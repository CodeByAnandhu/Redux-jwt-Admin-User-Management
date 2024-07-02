import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react";
import {useLogoutMutation} from "../slices/userApiSlice"
import {logout} from "../slices/authSlice"
function User() {

  const [logoutApiCall] = useLogoutMutation()
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isdropDown, setIsDropDown] = useState(false);

  function setDropDown(){
    isdropDown? setIsDropDown(false) : setIsDropDown(true)
  }

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen 
         font-poppins bg-gray-100 select-none">
      <div className="w-full max-w-sm bg-white border rounded-2xl shadow-md ">
        
        <div className="flex justify-end px-6 pt-5 mb-6">
        <i onClick={()=>setDropDown()} className="fa-solid fa-ellipsis"></i>
        </div>
       {isdropDown ? <p onClick={logoutHandler} className="text-center bg-gray-100 w-20 text-sm cursor-pointer hover:bg-gray-200 transition-all p-1 rounded-lg text-red-600 relative right-[-290px] ">Log Out</p>:null} 
        <div className="flex flex-col items-center pb-10">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={userInfo.profilePic ? userInfo.profilePic :"/9434619.webp"}
            alt="Bonnie image"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {userInfo.name}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {userInfo.email}
          </span>
          <div className="flex mt-4 md:mt-6">
            <a onClick={() => navigate("/editProfile")}
              href="#"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center
               text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none
                focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Edit Profile

            </a>
           
            <a onClick={() => navigate("/userHome")}
              href="#"
              className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none
               bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 
               focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800
                dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Back To Home
            </a>
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
