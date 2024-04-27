import { useContext, useEffect, useRef, useState } from "react";
import "./MedicalTest.css"
import medicaltest from "../../assets/images/medical-test.png"
import { UserContext } from "../../App";
import { authApi, endpoints } from "../../configs/Apis";
import { Form, Table } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const MedicalTest = () => {
    const [current_user,] = useContext(UserContext)
    const [testList, setTestList] = useState([])
    const [showModal, setShowModal] = useState(false)

    const [selectedImage, setSelectedImage] = useState('');
    const testImage = useRef();

    useEffect(() => {
        const loadtestList = async () => {
            try {
                let res = await authApi().get(endpoints['load-test-result'])
                console.log(res.data.content)
                setTestList(res.data.content)
            } catch (error) {
                console.log(error)
            }
        }
        loadtestList()
    }, [])

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setSelectedImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    // const returnTestResult = async () => {
    //     try {
    //         setShowModal(true)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    return (
        <>
            <div className="medical-test-wrapper">
                <div className="medical-test">
                    <div className="medical-test-list">
                        {testList.length === 0 ? <>
                            <h3>Danh sách xét nghiệm</h3>
                            <div className="medical-test-list-null">
                                <h5 className="mb-4">Chưa có yêu cầu xét nghiệm nào</h5>
                                <img src={medicaltest} alt="Not found" width={'20%'} />
                            </div>
                        </>
                            :
                            <>
                                <div>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Tên bệnh nhân</th>
                                                <th>Loại xét nghiệm</th>
                                                <th>Kết quả</th>
                                                <th>Chẩn đoán</th>
                                                <th>Chuyên khoa</th>
                                                <th>Bác sĩ</th>
                                                {/* <th>Người thực hiện</th> */}
                                                <th>Chi tiết</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.values(testList).map(tl => {
                                                return <>
                                                    <tr key={tl.testResultId}>
                                                        <td>{tl.testResultId}</td>
                                                        <td>{tl.bookingId.profilePatientId.name}</td>
                                                        <td>{tl.testServiceId.testServiceName}</td>
                                                        <td>{tl.testResultValue}</td>
                                                        <td>{tl.testResultDiagnosis}</td>
                                                        <td>{tl.bookingId.scheduleId.profileDoctorId.specialtyId.specialtyName}</td>
                                                        <td>{tl.bookingId.scheduleId.profileDoctorId.name}</td>
                                                        {/* <td>{tr.userId.lastname} {tr.userId.firstname}</td> */}
                                                        <td><Button variant="primary" onClick={() => setShowModal(true)}>Chi tiết</Button></td>
                                                    </tr>
                                                </>
                                            })}
                                        </tbody>
                                    </Table>
                                </div>
                                {showModal && (
                                    // <div
                                    //     className="modal show"
                                    //     style={{ display: 'block', backgroundColor: 'rgba(0.0.0.0.5)', position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, zIndex: 9999 }}
                                    // >
                                    <Modal fullscreen={true} show={showModal} onHide={() => { setShowModal(false) }}
                                        style={{ display: 'block', backgroundColor: 'rgba(0.0.0.0.5)', position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, zIndex: 9999 }}
                                    >
                                        <Modal.Header closeButton>
                                            <Modal.Title>Thông tin xét nghiệm</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <div className="test-body">
                                                <div className="test-body-info">
                                                    <div>
                                                        <Form.Label style={{ width: "50%" }}>Bệnh nhân</Form.Label>
                                                        <Form.Control type="text" value="Trần My" disabled />
                                                    </div>
                                                    <div>
                                                        <Form.Label style={{ width: "50%" }}>Bác sĩ</Form.Label>
                                                        <Form.Control type="text" value="Hiếu Nguyễn" disabled />
                                                    </div>
                                                    <div>
                                                        <Form.Label style={{ width: "50%" }}>Người thực hiện</Form.Label>
                                                        <Form.Control type="text" value={`${current_user?.lastname} ${current_user?.firstname}`} disabled />
                                                    </div>
                                                    <div>
                                                        <Form.Label style={{ width: "50%" }}>Tình trạng</Form.Label>
                                                        <Form.Control type="text" value="Test_Result_Value" disabled />
                                                    </div>
                                                    <div>
                                                        <Form.Label style={{ width: "50%" }}>Chẩn đoán</Form.Label>
                                                        <Form.Control type="text" value="Test_Result_Diagnosis" disabled />
                                                    </div>
                                                    <div>
                                                        <Form.Label style={{ width: "50%" }}>Loại xét nghiệm</Form.Label>
                                                        <Form.Control type="text" value="Xét nghiệm máu" disabled />
                                                    </div>
                                                </div>
                                                <div className="test-body-image">
                                                    <h4>Kết quả</h4>
                                                    <div className="Avatar_Choice">
                                                        {selectedImage ? (
                                                            <div>
                                                                <img src={selectedImage} alt="Selected" width="100%" />
                                                            </div>
                                                        ) : (
                                                            <div className="Avatar_Null">
                                                                <span>Vui lòng chọn ảnh</span>
                                                                <img src={medicaltest} alt="medical test" />
                                                            </div>
                                                        )}
                                                        <Form.Control type="File" ref={testImage} onChange={handleImageChange} width={'50%'} />
                                                    </div>
                                                </div>
                                            </div>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={() => setShowModal(false)}>Đóng</Button>
                                            <Button variant="primary">Lưu</Button>
                                        </Modal.Footer>
                                    </Modal>
                                    // </div>
                                )}
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default MedicalTest;