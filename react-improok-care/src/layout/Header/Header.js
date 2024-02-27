// import { useEffect, useState } from "react";
// import { FaSeedling } from "react-icons/fa"
//import { FaSearch } from "react-icons/fa"
// import { FaTimesCircle } from "react-icons/fa";
// import Apis, { endpoints } from "../configs/Apis";
import "./Header.css"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Dropdown, NavDropdown } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
// import logo from "../../assets/images/tech-health-care.png"

const Header = () => {
    // const [currentUser,] = useContext(MyUserContext);
    const nav = useNavigate();
    const [loading, setLoading] = useState(true)

    return (<>
        <div className="Header">
            <header>
                <div className="Header1">
                    {/* <Link to="/" className="Link_Title"><h2 className="Title">IM'PROOK CARE.</h2></Link> */}
                    <a href="/" className="Link_Title"><h2 className="Title">IM'PROOK CARE.</h2></a>
                    {/* <Link to="/">
                    <img src={logo} alt="IMPROOKCARE" />
                </Link> */}
                </div>
                <div className="Header2">
                    <ul className="Menu-bar">
                        <li>
                            <Link to="/booking">Đặt khám</Link>
                            <span>Đặt khám ngay</span>
                        </li>
                        <li>
                            <Link to="/">Chuyên khoa</Link>
                            <span>Tìm bác sĩ theo chuyên khoa</span>
                        </li>
                        {/* <li>
                        <a href="/">Cơ sở y tế</a>
                        <span>Chọn bệnh viện, phòng khám</span>
                        </li> */}
                        <li>
                            <Link to="/">Tin tức</Link>
                            <span>Tin tức về y tế thế giới</span>
                        </li>
                        <li>
                            <Dropdown>
                                <NavDropdown title='Hợp tác bác sĩ ' id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/collaboration">Đăng ký</NavDropdown.Item>
                                </NavDropdown>
                            </Dropdown>
                            <span>Đăng ký ngay</span>
                        </li>
                    </ul>
                </div>
                <div className="Header3">
                    {/* {user === null ? */}
                    <><button className="Sign-in"><Link to="/phoneverification">Đăng ký</Link></button>
                        <button className="Log-in"><Link to="/login">Đăng nhập</Link></button></>
                    {/* : */}
                    {/* <>
                    {user.roleId.roleId === 1 ?
                        <>
                            <button class="Admin"><Link to="/admin">Quản trị</Link></button>
                        </> :
                        <>
                            {user.roleId.roleId === 2 ?
                                <>
                                    <button class="Doctor"><Link to="/doctor">Bác sĩ</Link></button>
                                </> :
                                <></>}
                        </>
                    }
                    <span class="User-profile"><a href="/">Chào {user.lastname} {user.firstname}</a></span>
                    <Dropdown>
                        <NavDropdown title={`Chào ${user.lastname} ${user.firstname}`} id="basic-nav-dropdown">
                        <NavDropdown title="Chào Teesa Reesa" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/" >Về trang chủ</NavDropdown.Item>
                            <NavDropdown.Item href="/personalpage" >Thông tin cá nhân</NavDropdown.Item>
                            <NavDropdown.Item href="/medicalrecord" >Lịch sử khám bệnh</NavDropdown.Item>
                            <NavDropdown.Item href="/changepassword" >Thay đổi mật khẩu</NavDropdown.Item>
                            <NavDropdown.Item>Đăng xuất</NavDropdown.Item>
                        </NavDropdown>
                    </Dropdown>
                </>
                } */}
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