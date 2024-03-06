import { useContext } from "react";
import { FaCalendar, FaHistory, FaInfoCircle } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdLogout, MdMessage } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import "./UserMenu.css"

const UserMenu = () => {
    const nav = useNavigate();
    const [, dispatch] = useContext(UserContext);

    const logout = () => {
        dispatch({
            "type": "logout"
        })
        nav("/")
    }

    return (
        <ul className="UserMenu">
            <li><FaInfoCircle /><Link to="/personal">Thông tin cá nhân</Link></li>
            <li><FaCalendar /><Link to="/appointment">Lịch khám</Link></li>
            <li><FaHistory /><Link to="/history">Lịch sử khám</Link></li>
            <li><ImProfile /><Link to="/profile">Hồ sơ</Link></li>
            <li><MdMessage /><Link to="/message">Tin nhắn</Link></li>
            <li onClick={logout}><MdLogout />Đăng xuất</li>
        </ul>
    )
}

export default UserMenu;