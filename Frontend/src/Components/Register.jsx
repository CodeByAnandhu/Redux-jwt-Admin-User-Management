import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../slices/authSlice";
import { useDispatch , useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../slices/userApiSlice";
export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      
        navigate("/userHome")
    }
   }, [navigate,userInfo])

  const [register] = useRegisterMutation();
  const handleRegister = async (e) => {
    e.preventDefault();
      try {
        const res = await register({ name , email , password}).unwrap();
        console.log("register",res);
        dispatch(setCredentials({...res}));
        navigate("/userHome")
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
  };

  return (
    <div className="font-[sans-serif] md:pl-20 sm:pl-1 pt-8 bg-gray-100 flex min-h-screen justify-center items-center gap-40 select-none">
      <div className="bg-white rounded-xl sm:px-6 px-4 py-8 max-w-md w-full h-max shadow-[0_2px_10px_-3px_rgba(6,81,232,0.2)] max-lg:mx-auto">
        <form onSubmit={handleRegister}>
          <div className="mb-8">
            <h3 className="text-3xl font-extrabold text-gray-800">Sign up</h3>
          </div>
          <div>
            <label className="text-gray-800 text-sm mb-2 block">Name</label>
            <div className="relative flex items-center">
              <input
                onChange={(e) => setName(e.target.value)}
                name="name"
                type="text"
                required
                className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                placeholder="Enter name"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#bbb"
                stroke="#bbb"
                className="w-[18px] h-[18px] absolute right-4"
                viewBox="0 0 24 24"
              >
                <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                <path
                  d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                  data-original="#000000"
                ></path>
              </svg>
            </div>
            <label className="text-gray-800 text-sm mb-2 block mt-4">Email</label>
            <div className="relative flex items-center ">
              <input
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="text"
                required
                className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                placeholder="Enter email"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#bbb"
                stroke="#bbb"
                className="w-[18px] h-[18px] absolute right-4"
                viewBox="0 0 24 24"
              >
                <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                <path
                  d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                  data-original="#000000"
                ></path>
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <label className="text-gray-800 text-sm mb-2 block">Password</label>
            <div className="relative flex items-center">
              <input
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                type="password"
                required
                className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                placeholder="Enter password"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#bbb"
                stroke="#bbb"
                className="w-[18px] h-[18px] absolute right-4 cursor-pointer"
                viewBox="0 0 128 128"
              >
                <path
                  d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                  data-original="#000000"
                ></path>
              </svg>
            </div>
          </div>
          <div className="mt-4 text-right">
            <a
              href="jajvascript:void(0);"
              className="text-blue-600 text-sm font-semibold hover:underline"
            >
              Forgot your password?
            </a>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full shadow-xl py-3 px-6 text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
            >
              Log in
            </button>
          </div>
          <p className="text-sm mt-8 text-center text-gray-800">
            Already have an account{" "}
            <a onClick={() => navigate("/")}
              href="javascript:void(0);"
              className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
            >
              Login here
            </a>
          </p>
        </form>
      </div>

      <div className="w-1/3 sm:display-none">
        <h1 className="text-5xl font-bold font-sans mb-3 text-gray-400 flex justify-center items-center">
          Redux By Anandhu{" "}
          <img className="w-10 ml-2 " src="/crocodile.png" alt="" />
        </h1>
        <img className="w-100" src="/file0.svg" alt="" />
      </div>
    </div>
  );
}
