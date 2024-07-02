import { useSelector } from "react-redux";

function UserNav() {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div>
      <header
        className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border
     border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 
     md:rounded-3xl lg:max-w-screen-lg select-none"
      >
        <div className="px-4">
          <div className="flex items-center justify-between">
            <div className="flex shrink-0">
              <a aria-current="page" className="flex items-center" href="#">
                <img className="h-7 w-auto" src="/crocodile.png" alt="" />
                <p className="sr-only">Website Title</p>
              </a>
            </div>
            <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
              How{`'`}s it going ? {userInfo.name}
            </div>
            <div className="flex items-center justify-end gap-3">
              <img
                className="h-8 w-8"
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default UserNav;
