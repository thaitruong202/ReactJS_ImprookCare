import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import cookie from "react-cookies"
import { createContext, useReducer } from "react";
import UserReducer from "./reducers/UserReducer";
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import Home from "./components/Home/Home";
import Header from "./layout/Header/Header";
import Footer from "./layout/Footer/Footer";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword"
import Collaboration from "./components/Collaboration/Collaboration"
import Personal from "./components/Personal/Personal"
import Profile from "./components/Profile/Profile";
import { ToastContainer } from "react-toastify";
import Admin from "./components/Admin/Admin";
import ChangePassword from "./components/ChangePassword/ChangePassword"
import PhoneVerification from "./components/PhoneVerification/PhoneVerification";
import Appointment from "./components/Appointment/Appointment";
import History from "./components/History/History";
import Doctor from "./components/Doctor/Doctor";
import Booking from "./components/Booking/Booking";
import BookingDoctor from "./components/Booking/BookingDoctor";
import ProfileDoctor from "./components/Doctor/ProfileDoctor";
import BookingDetail from "./components/Booking/BookingDetail";
import DoctorMessage from "./components/Doctor/DoctorMessage";
import Message from "./components/Message/Message"
import PaymentResult from "./components/Payment/PaymentResult";

export const UserContext = createContext();

const App = () => {

  const [user, dispatch] = useReducer(UserReducer, cookie.load("user") || null)
  return (
    <UserContext.Provider value={[user, dispatch]}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgetpassword' element={<ForgetPassword />} />
          <Route path='/collaboration' element={<Collaboration />} />
          <Route path='/personal' element={<Personal />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/changepassword' element={<ChangePassword />} />
          <Route path='/phoneverification' element={<PhoneVerification />} />
          <Route path='/appointment' element={<Appointment />} />
          <Route path='/history' element={<History />} />
          <Route path='/doctor' element={<Doctor />} />
          <Route path='/profiledoctor' element={<ProfileDoctor />} />
          <Route path='/booking' element={<Booking />} />
          <Route path='/doctor/:profileDoctorId' element={<BookingDoctor />} />
          <Route path='/booking/doctor/:profileDoctorId' element={<BookingDetail />} />
          <Route path='/doctormessage' element={<DoctorMessage />} />
          <Route path='/message' element={<Message />} />
          <Route path='/paymentresult' element={<PaymentResult />} />
        </Routes>
        <Footer />
        <ToastContainer />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
