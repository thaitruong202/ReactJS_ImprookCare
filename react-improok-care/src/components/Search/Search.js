import React, { useEffect, useState } from "react"
import "./Search.css"
import { FcSearch } from "react-icons/fc";
import { Accordion, Form } from "react-bootstrap";
import Apis, { endpoints } from "../../configs/Apis";
import doctorprofile from "../../assets/images/doctor-profile-icon.png"
import { Link } from "react-router-dom";
import googleplay from "../../assets/images/googleplay.svg"
import appstore from "../../assets/images/appstore.svg"

const Search = () => {
    const [listSpecialty, setListSpecialty] = useState([]);
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
        const loadSpecialty = async () => {
            try {
                let res = await Apis.get(endpoints['specialty']);
                setListSpecialty(res.data);
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        loadProfileDoctor();
        loadSpecialty();
    }, [])

    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    return (
        <>
            <div className="search-wrapper">
                <div className="search-header">
                    <div>
                        <div className="search-input">
                            <input type="text" placeholder="Tìm theo bác sĩ, chuyên khoa, triệu chứng,.." />
                            <button><FcSearch /></button>
                        </div>
                    </div>
                </div>
                <div className="search-content">
                    <div className="search-specialty">
                        <Accordion defaultActiveKey={['0']} alwaysOpen>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Chuyên khoa</Accordion.Header>
                                <Accordion.Body>
                                    <div className="search-specialty-input">
                                        <div>
                                            <input type="text" placeholder="Tìm nhanh chuyên khoa" />
                                            <button><FcSearch /></button>
                                        </div>
                                    </div>
                                    <div className="search-specialty-tick">
                                        <div>
                                            {Object.values(listSpecialty).map(ls => {
                                                return (
                                                    <Form.Check
                                                        key={ls.specialtyId}
                                                        type="radio"
                                                        label={ls.specialtyName}
                                                        checked={selectedOption === ls.specialtyId}
                                                        onChange={() => handleOptionChange(ls.specialtyId)}
                                                    />
                                                )
                                            })}
                                        </div>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                    <div className="search-result">
                        <div className="search-count-result">
                            <p>Đã tìm thấy <strong>10</strong> kết quả</p>
                        </div>
                        <div className="search-result-detail">
                            {Object.values(listDoctor).map(ld => {
                                let url = `/doctor/${ld.profileDoctorId}`
                                return (
                                    <div>
                                        <div className="image-frame"><img src={ld.userId?.avatar === null ? doctorprofile : ld.userId?.avatar} alt="404" /></div>
                                        <div className="search-doctor-info">
                                            <span>{ld.name}</span>
                                            <span>{ld.specialtyId.specialtyName}</span>
                                            <span>{ld.workAddress}</span>
                                        </div>
                                        <button className="booking-butt"><Link to={url} style={{ color: 'white' }}>Đặt khám</Link></button>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="search-footer">
                    <div>
                        <span>Đặt lịch khám Bác sĩ dễ dàng</span>
                        <h3>Tải ngay I'MPROOK CARE</h3>
                        <div>
                            <Link to="/" style={{ marginRight: '1rem' }}><img src={googleplay} alt="GooglePlay" /></Link>
                            <Link to="/"><img src={appstore} alt="AppStore" /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search;