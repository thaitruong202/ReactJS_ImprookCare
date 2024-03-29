import { useContext, useState } from "react";
// import Apis, { endpoints } from "../configs/Apis";
import "./Header.css"
import { useNavigate, Link } from "react-router-dom"
import { Dropdown, Image, NavDropdown } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from "../../App";
import { FaHome, FaInfoCircle, FaHistory } from "react-icons/fa";
import { MdSecurity, MdLogout, MdAccountCircle, MdAdminPanelSettings } from "react-icons/md";
// import logo from "../../assets/images/tech-health-care.png"

const Header = () => {
    // const [currentUser,] = useContext(UserContext);
    const [user, dispatch] = useContext(UserContext);
    const nav = useNavigate();
    const [loading, setLoading] = useState(true)

    const logout = () => {
        dispatch({
            "type": "logout"
        })
        nav("/")
    }

    return (<>
        <div className="Header">
            <header>
                <div className="Header1">
                    {/* <Link to="/" className="Link_Title"><h2 className="Title">IM'PROOK CARE.</h2></Link> */}
                    <a href="/improok" className="Link_Title"><h2 className="Title" style={{ textAlign: 'center' }}>IM'PROOK CARE.</h2></a>
                    {/* <Link to="/">
                    <img src={logo} alt="IMPROOKCARE" />
                </Link> */}
                </div>
                <div className="Header2">
                    <ul className="Menu-bar">
                        <li className="Hover">
                            <Link to="/booking">Đặt khám</Link>
                            <span>Đặt khám ngay</span>
                        </li>
                        <li>
                            <Link to="/">Chuyên khoa</Link>
                            <span>Tìm bác sĩ theo chuyên khoa</span>
                        </li>
                        <li>
                            <Link to="/">Tin tức</Link>
                            <span>Tin tức về y tế thế giới</span>
                        </li>
                        <li>
                            <Dropdown>
                                <NavDropdown title='Hợp tác bác sĩ ' id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/improok/collaboration">Đăng ký</NavDropdown.Item>
                                </NavDropdown>
                            </Dropdown>
                            <span>Đăng ký ngay</span>
                        </li>
                    </ul>
                </div>
                <div className="Header3">
                    {user === null ?
                        <><button className="Sign-in"><Link to="/phoneverification">Đăng ký</Link></button>
                            <button className="Log-in"><Link to="/login">Đăng nhập</Link></button></>
                        :
                        <>
                            {/* <span class="User-profile"><a href="/">Chào {user.lastname} {user.firstname}</a></span> */}
                            <Dropdown style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', alignItems: 'center' }}>
                                <Image src={user?.avatar} style={{ width: "13%" }} alt="Avatar" roundedCircle />
                                <NavDropdown title={`Chào, ${user.lastname} ${user.firstname}!`} id="basic-nav-dropdown">
                                    <NavDropdown.Item style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}><Link to="/"><FaHome />Về trang chủ</Link></NavDropdown.Item>
                                    <NavDropdown.Item style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}><Link to="/personal"><FaInfoCircle />Thông tin cá nhân</Link></NavDropdown.Item>
                                    <NavDropdown.Item style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}><Link to="/history"><FaHistory />Lịch sử khám bệnh</Link></NavDropdown.Item>
                                    <NavDropdown.Item style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}><Link to="/changepassword"><MdSecurity />Thay đổi mật khẩu</Link></NavDropdown.Item>
                                    {user.roleId.roleId === 1 ?
                                        <>
                                            <NavDropdown.Item style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}><Link to="/admin"><MdAdminPanelSettings />Quản trị</Link></NavDropdown.Item>
                                            {/* <button class="Admin"><Link to="/admin">Quản trị</Link></button> */}
                                        </> :
                                        <>
                                            {user.roleId.roleId === 2 ?
                                                <>
                                                    <NavDropdown.Item style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}><Link to="/doctor"><MdAccountCircle />Bác sĩ</Link></NavDropdown.Item>
                                                    {/* <button class="Doctor"><Link to="/doctor">Bác sĩ</Link></button> */}
                                                </> : <></>}
                                        </>
                                    }
                                    <NavDropdown.Item onClick={logout} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}><MdLogout />Đăng xuất</NavDropdown.Item>
                                </NavDropdown>
                            </Dropdown>
                        </>
                    }
                    {/* <button class="Little-menu">
                    <div><FaEllipsisV /></div>
                    <ul>
                        <li><FaLanguage /> Ngôn ngữ</li>
                        <li><FaQuestionCircle /> Trợ giúp và phản hồi</li>
                    </ul>
                </button> */}
                </div>
            </header>
        </div >
        {/* <ul>
            {users.map(u => <li key={u.userId}>{u.lastname}</li>)}
        </ul> */}
    </>)
}

export default Header;