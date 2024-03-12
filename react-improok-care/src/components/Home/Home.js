import { FcSearch } from "react-icons/fc";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./Home.css"
import { Link } from "react-router-dom";
import { FaBriefcaseMedical, FaEye, FaHandshake, FaHospital, FaStethoscope } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { AiFillSecurityScan } from "react-icons/ai";
import { MdAccessTimeFilled, MdPayments } from "react-icons/md";
import googleplay from "../../assets/images/googleplay.svg"
import appstore from "../../assets/images/appstore.svg"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Home = () => {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
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
                    <div className="Home_Service">
                        <div>
                            <h3>Dịch vụ</h3>
                            <div className="Split_Bar"></div>
                            <Carousel responsive={responsive}>
                                <div>Item 1</div>
                                <div>Item 2</div>
                                <div>Item 3</div>
                                <div>Item 4</div>
                            </Carousel>
                        </div>
                    </div>
                    <div className="Home_Doctor">
                        <div>
                            <h3>Bác sĩ</h3>
                            <div className="Split_Bar"></div>
                        </div>
                    </div>
                    <div className="Home_Specialty">
                        <div>
                            <h3>Chuyên khoa</h3>
                            <div className="Split_Bar"></div>
                        </div>
                    </div>
                    <div className="Home_News">
                        <div>
                            <h3>Tin tức</h3>
                            <div className="Split_Bar"></div>
                        </div>
                    </div>
                    <div className="Home_Why">
                        <div>
                            <h3>5000+ người dùng chọn I'MPROOK CARE</h3>
                            <div className="Split_Bar"></div>
                            <ul>
                                <li>
                                    <div><FaUserDoctor /></div>
                                    <span>Bác sĩ chuyên nghiệp</span>
                                </li>
                                <li>
                                    <div><FaBriefcaseMedical /></div>
                                    <span>Dịch vụ đa dạng</span>
                                </li>
                                <li>
                                    <div><MdAccessTimeFilled /></div>
                                    <span>Giờ giấc linh hoạt</span>
                                </li>
                                <li>
                                    <div><MdPayments /></div>
                                    <span>Thanh toán tiện lợi</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="Home_Stats">
                        <div>
                            <h3>Thống kê</h3>
                            <div className="Split_Bar"></div>
                            <ul>
                                <li>
                                    <div><FaStethoscope /></div>
                                    <span>1.1M+ lượt khám</span>
                                </li>
                                <li>
                                    <div><FaUserDoctor /></div>
                                    <span>500+ bác sĩ</span>
                                </li>
                                <li>
                                    <div><FaHospital /></div>
                                    <span>25+ bệnh viện</span>
                                </li>
                                <li>
                                    <div><FaEye /></div>
                                    <span>3200+ lượt truy cập</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="Home_Footer">
                    <div>
                        <div className="Home_Content_5_Left">
                            <h3>Tải ứng dụng I'MPROOK CARE</h3>
                            <ul>
                                <li>
                                    <FaHospital />
                                    <span>Đặt lịch khám bệnh</span>
                                </li>
                                <li>
                                    <FaHandshake />
                                    <span>Tư vấn trực tuyến</span>
                                </li>
                                <li>
                                    <AiFillSecurityScan />
                                    <span>Lưu trữ hồ sơ sức khỏe</span>
                                </li>
                                <li>
                                    <MdPayments />
                                    <span>Thanh toán dịch vụ trực tuyến</span>
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