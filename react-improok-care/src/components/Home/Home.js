import { FcSearch } from "react-icons/fc";
import "./Home.css"
import { Link } from "react-router-dom";
import { FaBriefcaseMedical, FaEye, FaHandshake, FaHeartbeat, FaHospital, FaStethoscope } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { AiFillSecurityScan } from "react-icons/ai";
import { MdPayments } from "react-icons/md";
import googleplay from "../../assets/images/googleplay.svg"
import appstore from "../../assets/images/appstore.svg"
import doctor from "../../assets/images/stethoscope.png"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import React, { useEffect, useState } from "react";
import Apis, { endpoints } from "../../configs/Apis";
import doctorprofile from "../../assets/images/doctor-profile-icon.png"

const Home = () => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
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

    const [listDoctor, setListDoctor] = useState([]);
    useEffect(() => {
        const loadProfileDoctor = async () => {
            try {
                let res = await Apis.get(endpoints['load-profile-doctor']);
                setListDoctor(res.data);
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        loadProfileDoctor();
    }, [])

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
                        <div className="Home_Service_Cont">
                            <h3>Dịch vụ</h3>
                            <div className="Split_Bar"></div>
                        </div>
                        <Carousel
                            responsive={responsive}
                            sliderClass="Service_Carousel"
                            itemClass="custom-item"
                            centerMode={true}
                        >
                            <div className="card">
                                <img src={doctor} alt="Doctor" style={{ width: "40%" }} />
                                <span>Đặt khám bác sĩ</span>
                            </div>
                            <div className="card">
                                <img src={doctor} alt="Doctor" style={{ width: "40%" }} />
                                <span>Tư vấn khám bệnh</span>
                            </div>
                            <div className="card">
                                <img src={doctor} alt="Doctor" style={{ width: "40%" }} />
                                <span>Đặt lịch xét nghiệm</span>
                            </div>
                            <div className="card">
                                <img src={doctor} alt="Doctor" style={{ width: "40%" }} />
                                <span>Gói khám sức khỏe</span>
                            </div>
                            <div className="card">
                                <img src={doctor} alt="Doctor" style={{ width: "40%" }} />
                                <span>Y tế tại nhà</span>
                            </div>
                            <div className="card">
                                <img src={doctor} alt="Doctor" style={{ width: "40%" }} />
                                <span>Thanh toán viện phí</span>
                            </div>
                        </Carousel>
                    </div>
                    <div className="Home_Doctor">
                        <div className="Home_Doctor_Cont">
                            <h3>Bác sĩ</h3>
                            <div className="Split_Bar"></div>
                        </div>
                        <Carousel
                            responsive={responsive}
                            sliderClass="Doctor_Carousel"
                            itemClass="custom-item"
                            centerMode={true}
                        >
                            {Object.values(listDoctor).map(ld => {
                                let url = `/doctor/${ld.profileDoctorId}`
                                return (
                                    <div className="card">
                                        <div className="image-container"><img src={ld.userId?.avatar === null ? doctorprofile : ld.userId?.avatar} alt="404" /></div>
                                        <span style={{ fontSize: '1.2rem' }}><strong>{ld.name}</strong></span>
                                        <span>{ld.specialtyId.specialtyName}</span>
                                        <button className="Booking_Now"><Link to={url} style={{ color: 'white' }}>Đặt khám ngay</Link></button>
                                    </div>
                                )
                            })}
                        </Carousel>
                    </div>
                    <div className="Home_Specialty">
                        <div className="Home_Specialty_Cont">
                            <h3>Chuyên khoa</h3>
                            <div className="Split_Bar"></div>
                        </div>
                        <Carousel
                            responsive={responsive}
                            sliderClass="Service_Carousel"
                            itemClass="custom-item"
                            centerMode={true}
                        >
                            <div className="card">
                                <img src={doctor} alt="Doctor" style={{ width: "40%" }} />
                                <span>Khoa thần kinh</span>
                            </div>
                            <div className="card">
                                <img src={doctor} alt="Doctor" style={{ width: "40%" }} />
                                <span>Khoa phụ sản</span>
                            </div>
                            <div className="card">
                                <img src={doctor} alt="Doctor" style={{ width: "40%" }} />
                                <span>Khoa cơ - xương - khớp</span>
                            </div>
                            <div className="card">
                                <img src={doctor} alt="Doctor" style={{ width: "40%" }} />
                                <span>Khoa nhi</span>
                            </div>
                            <div className="card">
                                <img src={doctor} alt="Doctor" style={{ width: "40%" }} />
                                <span>Khoa răng - hàm - mặt</span>
                            </div>
                            <div className="card">
                                <img src={doctor} alt="Doctor" style={{ width: "40%" }} />
                                <span>Đặt khám bác sĩ</span>
                            </div>
                        </Carousel>
                    </div>
                    <div className="Home_News">
                        <div>
                            <h3>Tin tức</h3>
                            <div className="Split_Bar"></div>
                            <div className="Home_News_Content">
                                <div>
                                    <div>
                                        <img src={doctor} alt="Doctor" />
                                        <div className="brand_name">I'MPROOK</div>
                                        <div><span>Bản tin y tế hàng ngày đài truyền hình quốc gia ngộ ha thuyết minh bởi Sonder Nguyễn lạ lùng dị ăn gì mà đòi ăn quài</span></div>
                                        <div><p>Thành phố Hồ Chí Minh, ngày 10 tháng 3 năm 2024: Hướng đến kỷ niệm 27 năm thành lập (10/03/1997 – 10/03/2024), Tập đoàn Y khoa Hoàn Mỹ chính thức khai trương thêm mấy chục chi nhánh nữa</p></div>
                                    </div>
                                    <button>Đọc thêm</button>
                                </div>
                                <div>
                                    <div>
                                        <img src={doctor} alt="Doctor" />
                                        <div className="brand_name">I'MPROOK</div>
                                        <div><span>Bản tin y tế hàng ngày đài truyền hình quốc gia ngộ ha thuyết minh bởi Sonder Nguyễn lạ lùng dị ăn gì mà đòi ăn quài</span></div>
                                        <div><p>Thành phố Hồ Chí Minh, ngày 10 tháng 3 năm 2024: Hướng đến kỷ niệm 27 năm thành lập (10/03/1997 – 10/03/2024), Tập đoàn Y khoa Hoàn Mỹ chính thức bla bla</p></div>
                                    </div>
                                    <button>Đọc thêm</button>
                                </div>
                                <div>
                                    <div>
                                        <img src={doctor} alt="Doctor" />
                                        <div className="brand_name">I'MPROOK</div>
                                        <div><span>Bản tin y tế hàng ngày đài truyền hình quốc gia ngộ ha thuyết minh bởi Sonder Nguyễn lạ lùng dị ăn gì mà đòi ăn quài</span></div>
                                        <div><p>Thành phố Hồ Chí Minh, ngày 10 tháng 3 năm 2024: Hướng đến kỷ niệm 27 năm thành lập (10/03/1997 – 10/03/2024), Tập đoàn Y khoa Hoàn Mỹ chính thức khai trương thêm mấy chục chi nhánh nữa</p></div>
                                    </div>
                                    <button>Đọc thêm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="Home_Why">
                        <div>
                            <h3>5000+ người dùng chọn I'MPROOK CARE</h3>
                            <div className="Split_Bar"></div>
                            <ul>
                                <li>
                                    <div><FaUserDoctor className="why_icon" /></div>
                                    <span>Bác sĩ chuyên nghiệp</span>
                                    <p>Hệ thống bệnh viện và phòng khám của chúng tôi sở hữu đội ngũ bác sĩ siêng năng và tận tụy, hết mình nâng cao sức khỏe cho cộng đồng Việt Nam.</p>
                                </li>
                                <li>
                                    <div><FaBriefcaseMedical className="why_icon" /></div>
                                    <span>Người bệnh là trung tâm</span>
                                    <p>Cam kết đem lại sự xuất sắc trong chuyên môn y khoa, đồng thời cung cấp dịch vụ chăm sóc chất lượng cao, giá cả phải chăng, tập trung vào sức khỏe của người bệnh.</p>
                                </li>
                                <li>
                                    <div><FaHeartbeat className="why_icon" /></div>
                                    <span>Chăm sóc tận tình</span>
                                    <p>Các dịch vụ cấp cứu và điều trị 24/24 tại các bệnh viện đảm bảo người bệnh luôn luôm nhận được sự an tâm và các dịch vụ chăm sóc y tế kịp thời.</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="Home_Stats">
                        <div>
                            <h3>Những con số</h3>
                            <div className="Split_Bar"></div>
                            <ul>
                                <li>
                                    <div><FaStethoscope className="stats_icon" /></div>
                                    <span>1.1M+ lượt khám</span>
                                </li>
                                <li>
                                    <div><FaUserDoctor className="stats_icon" /></div>
                                    <span>500+ bác sĩ</span>
                                </li>
                                <li>
                                    <div><FaHospital className="stats_icon" /></div>
                                    <span>25+ bệnh viện</span>
                                </li>
                                <li>
                                    <div><FaEye className="stats_icon" /></div>
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
            </div >
        </>
    )
}

export default Home;