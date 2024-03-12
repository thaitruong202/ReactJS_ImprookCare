import { useContext, useEffect, useState } from "react";
import { FaCalendarCheck, FaInfoCircle } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdEditCalendar, MdLogout, MdMessage } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import "./DoctorMenu.css"

const DoctorMenu = () => {
    const nav = useNavigate();
    const [, dispatch] = useContext(UserContext);
    const [selectedItem, setSelectedItem] = useState(null);
    // const handleItemClick = (item) => {
    //     setSelectedItem(item);
    // };

    const handleItemClick = (item, path) => {
        setSelectedItem(item);
        nav(path);
    };

    const logout = () => {
        dispatch({
            "type": "logout"
        })
        nav("/")
    }

    return (
        // <ul className="DoctorMenu">
        //     <li><FaInfoCircle /><Link to="/doctor">Thông tin cá nhân</Link></li>
        //     <li><MdEditCalendar /><Link to="/schedule">Đăng ký lịch khám</Link></li>
        //     <li><FaCalendarCheck /><Link to="/bookingmanagement">Lịch hẹn</Link></li>
        //     <li><ImProfile /><Link to="/profiledoctor">Hồ sơ</Link></li>
        //     <li><MdMessage /><Link to="/doctormessage">Tin nhắn</Link></li>
        //     <li onClick={logout}><MdLogout />Đăng xuất</li>
        // </ul>
        // <ul className="DoctorMenu">
        //     <li
        //         className={selectedItem === "info" ? "selected" : ""}
        //         onClick={() => handleItemClick("info")}
        //     >
        //         <FaInfoCircle /><Link className={selectedItem === "info" ? "selectedText" : ""} onClick={() => handleItemClick("info")} to="/doctor">Thông tin cá nhân</Link>
        //     </li>
        //     <li
        //         className={selectedItem === "schedule" ? "selected" : ""}
        //         onClick={() => handleItemClick("schedule")}
        //     >
        //         <MdEditCalendar /><Link className={selectedItem === "schedule" ? "selectedText" : ""} onClick={() => handleItemClick("schedule")} to="/schedule">Đăng ký lịch khám</Link>
        //     </li>
        //     <li
        //         className={selectedItem === "bookingmanagement" ? "selected" : ""}
        //         onClick={() => handleItemClick("bookingmanagement")}
        //     >
        //         <FaCalendarCheck /><Link className={selectedItem === "bookingmanagement" ? "selectedText" : ""} onClick={() => handleItemClick("bookingmanagement")} to="/bookingmanagement">Lịch hẹn</Link>
        //     </li>
        //     <li
        //         className={selectedItem === "profiledoctor" ? "selected" : ""}
        //         onClick={() => handleItemClick("profiledoctor")}
        //     >
        //         <ImProfile /><Link className={selectedItem === "profiledoctor" ? "selectedText" : ""} onClick={() => handleItemClick("profiledoctor")} to="/profiledoctor">Hồ sơ</Link>
        //     </li>
        //     <li className={selectedItem === "message" ? "selected" : ""}
        //         onClick={() => handleItemClick("message")}>
        //         <MdMessage /><Link className={selectedItem === "message" ? "selectedText" : ""} onClick={() => handleItemClick("message")} to="/doctormessage">Tin nhắn</Link>
        //     </li>
        //     <li onClick={logout}>
        //         <MdLogout />Đăng xuất
        //     </li>
        // </ul>
        <div className="DoctorMenu">
            <div
                className={selectedItem === "doctor" ? "selected" : ""}
                onClick={() => handleItemClick("doctor", "/doctor")}
            >
                <FaInfoCircle /><div>Thông tin cá nhân</div>
            </div>
            <div
                className={selectedItem === "schedule" ? "selected" : ""}
                onClick={() => handleItemClick("schedule", "/schedule")}
            >
                <MdEditCalendar /><div>Đăng ký lịch khám</div>
            </div>
            <div
                className={selectedItem === "bookingmanagement" ? "selected" : ""}
                onClick={() => handleItemClick("bookingmanagement", "/bookingmanagement")}
            >
                <FaCalendarCheck /><div>Lịch hẹn</div>
            </div>
            <div
                className={selectedItem === "profiledoctor" ? "selected" : ""}
                onClick={() => handleItemClick("profiledoctor", "/profiledoctor")}
            >
                <ImProfile /><div>Hồ sơ</div>
            </div>
            <div className={selectedItem === "message" ? "selected" : ""}
                onClick={() => handleItemClick("message", "/doctormessage")}>
                <MdMessage /><div>Tin nhắn</div>
            </div>
            <div onClick={logout}>
                <MdLogout />Đăng xuất
            </div>
        </div>
    )
}

export default DoctorMenu;