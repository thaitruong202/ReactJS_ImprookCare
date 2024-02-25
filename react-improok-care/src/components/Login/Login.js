import "./Login.css"
import LoginLogo from "../../assets/images/login-banner.png"
import { useState } from "react";
import { Link } from "react-router-dom"
import Form from 'react-bootstrap/Form'
import Spinner from "../../layout/Spinner"
import { Facebook, Google, Lock, Person, Visibility, VisibilityOff } from "@mui/icons-material";
import { InputGroup } from "react-bootstrap";

const Login = () => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (<>
        <div className="Login_Wrapper">
            <div className="Login_Content">
                <div className="Login_Form">
                    <div className="Login_Left">
                        <img src={LoginLogo} alt="IMPROOKCARE" />
                    </div>
                    <div className="Login_Right">
                        <Form className="Login_Form">
                            <div className="Login_Detail">
                                <div className="Login_Header">
                                    <div>ĐĂNG NHẬP</div>
                                </div>
                                <div className="Login_Fill">
                                    {/* <div className="Login_User">
                                        <div className="Login_User_Input">
                                            <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Số điện thoại/Tên Đăng Nhập"></input>
                                        </div>
                                        <div className="Separate"></div>
                                    </div>
                                    <div className="Login_Password">
                                        <div className="Login_Password_Input">
                                            <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Nhập mật khẩu"></input>
                                            <button type="button" onClick={toggleShowPassword}>
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </button>
                                        </div>
                                        <div className="Separate"></div>
                                    </div> */}
                                    <Form>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text><Person /></InputGroup.Text>
                                            <Form.Control
                                                placeholder="Username/Phone"
                                                aria-label="Username"
                                                aria-describedby="basic-addon1"
                                                required
                                            />
                                        </InputGroup>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text><Lock /></InputGroup.Text>
                                            <Form.Control
                                                placeholder="Password"
                                                aria-label="Password"
                                                type={showPassword ? 'text' : 'password'}
                                                aria-describedby="basic-addon1"
                                                required
                                            />
                                            <button type="button" className="Show_Pass" onClick={toggleShowPassword}>
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </button>
                                        </InputGroup>
                                    </Form>
                                    {loading === true ? <Spinner /> : <button className="Login_Butt">Login</button>}
                                    <div className="Login_Help">
                                        <span>
                                            <span><input className="Remember_Check" type="checkbox" /> Remember Me</span>
                                        </span>
                                        <Link to="/forgetpassword">Forget Password?</Link>
                                    </div>
                                    <div className="Login_Option">
                                        <div className="Login_Or">
                                            <div></div>
                                            <span>Or</span>
                                            <div></div>
                                        </div>
                                        <div className="Login_Another">
                                            <button><Google /> Google</button>
                                            <button><Facebook /> Facebook</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="To_Register">
                                    <div>
                                        Bạn mới biết đến I'MPROOK Care?
                                        <Link to="/register"> Đăng ký</Link>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Login;