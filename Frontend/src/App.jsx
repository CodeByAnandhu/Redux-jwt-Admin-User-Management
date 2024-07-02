
import {Route, Routes} from 'react-router-dom'
import AdminHome from './Components/AdminHome'
import SignIn from './Components/SignIn'
import UserHome from './Components/UserHome'
import UserHero from './Components/UserHero'
import AdminLogin from './Components/AdminLogin'
import Register from './Components/Register'
import EditProfile from './Components/EditProfile'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; 
function App() {
  return (
    <div>
       <ToastContainer/>
      <Routes>
        <Route path='/admin' element={<AdminHome/>}/>
        <Route path='/' element={<SignIn/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/user' element={<UserHome/>}/>
        <Route path='/editProfile' element={<EditProfile/>}/>
        <Route path='/userHome' element={<UserHero/>}/>
        <Route path='/adminLogin' element={<AdminLogin/>}/>
      </Routes>
    </div>
  )
}

export default App
