import { useContext } from "react";
import { FaCalendarCheck, FaInfoCircle } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdEditCalendar, MdLogout, MdMessage } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import "./DoctorMenu.css"

const DoctorMenu = () => {
    const nav = useNavigate();
    const [, dispatch] = useContext(UserContext);

    const logout = () => {
        dispatch({
            "type": "logout"
        })
        nav("/")
    }

    return (
        <ul className="DoctorMenu">
            <li><FaInfoCircle /><Link to="/doctor">Thông tin cá nhân</Link></li>
            <li><MdEditCalendar /><Link to="/schedule">Đăng ký lịch khám</Link></li>
            <li><FaCalendarCheck /><Link to="/bookingmanagement">Lịch hẹn</Link></li>
            <li><ImProfile /><Link to="/profiledoctor">Hồ sơ</Link></li>
            <li><MdMessage /><Link to="/doctormessage">Tin nhắn</Link></li>
            <li onClick={logout}><MdLogout />Đăng xuất</li>
        </ul>
    )
}

export default DoctorMenu;