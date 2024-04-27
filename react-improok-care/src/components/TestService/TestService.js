import { useContext, useEffect } from 'react';
import './TestService.css'
import medicaltest from "../../assets/images/medical-test.png"
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { useState } from 'react';
import Apis, { authApi, endpoints } from '../../configs/Apis';
import { BookingManagementContext } from '../../App';

const TestService = () => {
    const [booking,] = useContext(BookingManagementContext)
    const [testType, setTestType] = useState([])
    const [testChoice, setTestChoice] = useState(null)
    const [testResult, setTestResult] = useState([])
    const [selectedImage, setSelectedImage] = useState('')

    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        const loadTestResult = async () => {
            try {
                let e = endpoints['load-test-result']
                e += `?profilePatientId=${booking.profilePatientId}`
                let res = await authApi().get(e)
                console.log(res.data.content)
                setTestResult(res.data.content)
            } catch (error) {
                console.log(error)
            }
        }
        loadTestResult()
    }, [testResult])

    useEffect(() => {
        const loadTestService = async () => {
            try {
                let res = await Apis.get(endpoints['load-test-service'])
                console.log(res.data.content)
                setTestType(res.data.content)
            } catch (error) {
                console.log(error)
            }
        }
        loadTestService()
    }, [])

    const addTestResult = async () => {
        try {
            let res = await authApi().post(endpoints['add-test-result'], {
                "testServiceId": testChoice === null ? "1" : testChoice,
                "bookingId": booking.bookingId
            })
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className='test-service-wrapper'>
                <div className='test-service'>
                    <h3 className="text-center">THÔNG TIN XÉT NGHIỆM</h3>
                    <div className='test-service-register'>
                        <h5>Đăng ký xét nghiệm</h5>
                        <div>
                            <h6>Loại xét nghiệm</h6>
                            <Form.Select className="test-choice-select" value={testChoice} name="testChoice" onChange={(e) => setTestChoice(e.target.value)}>
                                {Object.values(testType).map(tt => <option key={tt.testServiceId} value={tt.testServiceId}>{tt.testServiceName}</option>)}
                            </Form.Select>
                            <Button variant='primary' onClick={() => addTestResult()}>Đăng ký</Button>
                        </div>
                    </div>
                    <div className='test-service-history'>
                        <h5>Kết quả xét nghiệm</h5>
                        {testResult.length === 0 ?
                            <>
                                <div className="test-service-history-null">
                                    <h5 className="mb-4">Bệnh nhân này chưa có xét nghiệm nào</h5>
                                    <img src={medicaltest} alt="Not found" width={'20%'} />
                                </div>
                            </> :
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
                                            {Object.values(testResult).map(tr => {
                                                return <>
                                                    <tr key={tr.testResultId}>
                                                        <td>{tr.testResultId}</td>
                                                        <td>{tr.bookingId.profilePatientId.name}</td>
                                                        <td>{tr.testServiceId.testServiceName}</td>
                                                        <td>{tr.testResultValue}</td>
                                                        <td>{tr.testResultDiagnosis}</td>
                                                        <td>{tr.bookingId.scheduleId.profileDoctorId.specialtyId.specialtyName}</td>
                                                        <td>{tr.bookingId.scheduleId.profileDoctorId.name}</td>
                                                        {/* <td>{tr.userId.lastname} {tr.userId.firstname}</td> */}
                                                        <td><Button variant="primary" onClick={() => setShowModal(true)}>Chi tiết</Button></td>
                                                    </tr>
                                                </>
                                            })}
                                        </tbody>
                                    </Table>
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
                                                            <Form.Control type="text" value="Hồng Nhung" disabled />
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
                                                            <Form.Select className="test-choice-select" value={testChoice} name="testChoice" onChange={(e) => setTestChoice(e.target.value)}>
                                                                {Object.values(testType).map(tt => <option key={tt.testServiceId} value={tt.testServiceId}>{tt.testServiceName}</option>)}
                                                            </Form.Select>
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
                                                                    <img src={medicaltest} alt="medical test" />
                                                                </div>
                                                            )}
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
                                </div>
                            </>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default TestService;