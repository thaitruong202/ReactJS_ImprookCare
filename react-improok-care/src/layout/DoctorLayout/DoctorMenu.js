import { useContext, useEffect, useState } from "react";
import { FaCalendarCheck, FaInfoCircle } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdEditCalendar, MdLogout, MdMessage } from "react-icons/md";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { UserContext } from "../../App";
import "./DoctorMenu.css";

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
      type: "logout",
    });
    nav("/");
  };

  return (
    // <ul className="DoctorMenu">
    //     <li><FaInfoCircle /><Link to="/doctor">Thông tin cá nhân</Link></li>
    //     <li><MdEditCalendar /><Link to="/schedule">Đăng ký lịch khám</Link></li>
    //     <li><FaCalendarCheck /><Link to="/bookingmanagement">Lịch hẹn</Link></li>
    //     <li><ImProfile /><Link to="/profiledoctor">Hồ sơ</Link></li>
    //     <li>activeCMdMessage activeto="/doctormessage">Tin nhắn</Link></li>
    //     <li onClick={logout}><MdLogout />Đăng xuất</li>
    // </ul>
    // <ul className="DoctorMenu">
    //     <li
    //         activeClassName={activeItem === "info" ? "selected" : ""}
    //         onClick={() => handleItemClick("info")}
    //     >activeC    //    activeInfoCircle /><Link className={selectedItem === "info" ? "selectedText" : ""} onClick={() => handleItemClick("info")} to="/doctor">Thông tin cá nhân</Link>
    //     </li>
    //     <li
    //         activeClassName={activeItem === "schedule" ? "selected" : ""}
    //         onClick={() => handleItemClick("schedule")}
    //     >activeC    //    activeEditCalendar /><Link className={selectedItem === "schedule" ? "selectedText" : ""} onClick={() => handleItemClick("schedule")} to="/schedule">Đăng ký lịch khám</Link>
    //     </li>
    //     <li
    //         activeClassName={activeItem === "bookingmanagement" ? "selected" : ""}
    //         onClick={() => handleItemClick("bookingmanagement")}
    //     >activeC    //    activeCalendarCheck /><Link className={selectedItem === "bookingmanagement" ? "selectedText" : ""} onClick={() => handleItemClick("bookingmanagement")} to="/bookingmanagement">Lịch hẹn</Link>
    //     </li>
    //     <li
    //         activeClassName={activeItem === "profiledoctor" ? "selected" : ""}
    //         onClick={() => handleItemClick("profiledoctor")}
    //     >activeC    //    activeProfile /><Link className={selectedItem === "profiledoctor" ? "selectedText" : ""} onClick={() => handleItemClick("profiledoctor")} to="/profiledoctor">Hồ sơ</Link>
    //     </li>
    //     <li activeClassName={activeItem === "message" ? "selected" : ""}
    //         onClick={() => handleItemClick("message")}>activeC    //    activeMessage /><Link className={selectedItem === "message" ? "selectedText" : ""} onClick={() => handleItemClick("message")} to="/doctormessage">Tin nhắn</Link>
    //     </liactiveC
    //   activeClick={logout}>
    //         <MdLogout />Đăng xuất
    //     </li>
    // </ul>
    <div className="DoctorMenu">
      <NavLink
        // className={selectedItem === "doctor" ? "selected" : ""}
        activeClassName="active"
        onClick={() => handleItemClick("doctor", "/doctor")}
        to="/doctor"
      >
        <FaInfoCircle />
        {/* <div>Thông tin cá nhân</div> */}
        Thông tin cá nhân
      </NavLink>
      <NavLink
        // className={selectedItem === "schedule" ? "selected" : ""}
        activeClassName="active"
        onClick={() => handleItemClick("schedule", "/schedule")}
        to="/schedule"
      >
        <MdEditCalendar />
        {/* <div>Đăng ký lịch khám</div> */}
        Đăng ký lịch khám
      </NavLink>
      <NavLink
        // className={selectedItem === "bookingmanagement" ? "selected" : ""}
        activeClassName="active"
        onClick={() =>
          handleItemClick("bookingmanagement", "/bookingmanagement")
        }
        to="/bookingmanagement"
      >
        <FaCalendarCheck />
        <div>Lịch hẹn</div>
      </NavLink>
      <NavLink
        // className={selectedItem === "profiledoctor" ? "selected" : ""}
        activeClassName="active"
        onClick={() => handleItemClick("profiledoctor", "/profiledoctor")}
        to="/profiledoctor"
      >
        <ImProfile />
        <div>Hồ sơ</div>
      </NavLink>
      {/* <div
        activeClassName={activeItem === "message" ? "selected" : ""}
        onClick={() => handleItemClick("message", "/doctormessage")}
      >
        <MdMessage />
        <div>Tin nhắn</div>
      </divactiveC
      <diactivek={logout}>
        <MdLogout />
        Đăng xuất
      </div> */}
    </div>
  );
};

export default DoctorMenu;
