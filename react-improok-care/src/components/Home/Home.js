import { FcSearch } from "react-icons/fc";
import "./Home.css"
import { Link } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import googleplay from "../../assets/images/googleplay.svg"
import appstore from "../../assets/images/appstore.svg"

const Home = () => {
    return (
        <>
            <div className="Home_Wrapper">
                <div className="Home_Header">
                    <div>
                        <div className="Home_Content_1_Header">
                            <h3>Đặt khám bác sĩ</h3>
                            <h5>Đặt khám với hơn 500 bác sĩ đã kết nối chính thức với I'MPROOK CARE để có số thứ tự và khung giờ khám trước</h5>
                        </div>
                        <div className="Home_Content_1_Content">
                            <input type="text" placeholder="Nhập tên bác sĩ...." />
                            <button><FcSearch /></button>
                        </div>
                    </div>
                </div>
                <div className="Home_Content">

                </div>
                <div className="Home_Footer">
                    <div>
                        <div className="Home_Content_5_Left">
                            <h3>Tải ứng dụng I'MPROOK CARE</h3>
                            <ul>
                                <li>
                                    <TiTick />
                                    <span>Đặt khám bác sĩ</span>
                                </li>
                                <li>
                                    <TiTick />
                                    <span>Tiện lợi - Nhanh chóng - Dễ dàng</span>
                                </li>
                            </ul>
                            <div>
                                <Link to="/" style={{ marginRight: '1rem' }}><img src={googleplay} alt="GooglePlay" /></Link>
                                <Link to="/"><img src={appstore} alt="AppStore" /></Link>
                            </div>
                        </div>
                        <div className="Home_Content_5_Right">
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;