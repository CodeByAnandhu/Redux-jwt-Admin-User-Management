import { Link } from "react-router-dom";
import UserNav from "./UserNav";
import { useSelector } from "react-redux";

function UserHero() {
  const {userInfo} = useSelector((state) => state.auth);
  return (
    <div className="flex items-center justify-center 
     px-6 py-8 mx-auto flex-col select-none">
      <UserNav />
      
      <div className="w-[80%] flex flex-col items-center justify-center mt-52">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight 
        text-gray-800 md:text-5xl lg:text-6xl dark:text-white">
          <span className="text-transparent bg-clip-text bg-gradient-to-r
           to-emerald-600 from-sky-400">
            We Discover
          </span>{" "}
          new features for your profile
        </h1>
        <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          Keep your information up to date to {userInfo? (userInfo.name) : "welss"} ensure a personalized experience.{" "}
          <br />
          Visit your profile to make changes and add new details.
        </p>
      
        <Link
          to="/user"
          className=" cursor-pointer flex items-center justify-center 
          px-5 py-3 text-base font-medium text-center 
          text-white bg-blue-700 rounded-lg
           hover:bg-blue-800 focus:ring-4 focus:ring-blue-300
            dark:focus:ring-blue-900"
        >
          Go To Profile
          <svg
            className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path stroke="currentColor" d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </Link>
        
      </div>
        <img className="w-[35%] absolute left-[5pc] top-[18pc]
        " src="/file1.svg" alt="" />
      
    </div>
  );
}

export default UserHero;
