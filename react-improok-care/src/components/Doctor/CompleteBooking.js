import { useEffect, useState } from "react";
import { Badge, Button, Table } from "react-bootstrap";
import { authApi, endpoints } from "../../configs/Apis";

const CompleteBooking = (props) => {
    const [completeBooking, setCompleteBooking] = useState([]);
    const loadCompleteBooking = async () => {
        try {
            let res = await authApi().post(endpoints['booking-doctor-view-page'], {

                "profileDoctorId": props.profileDoctorId,
                "bookingStatusId": "4",
                "pageNumber": "0"
            })
            console.log(res.data.content)
            setCompleteBooking(res.data.content)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadCompleteBooking()
    }, [props.profileDoctorId])

    return <>
        <div>
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tên bệnh nhân</th>
                            <th>Ngày</th>
                            <th>Khung giờ</th>
                            <th>Tình trạng</th>
                            <th>Tái khám</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(completeBooking).map((cb, index) => {
                            const timeBegin = new Date(cb[3]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                            const timeEnd = new Date(cb[4]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                            return <>
                                <tr key={index}>
                                    <td>{cb[0]}</td>
                                    <td>{cb[6]}</td>
                                    <td>{cb[2]}</td>
                                    <td>{timeBegin} - {timeEnd}</td>
                                    <td><Badge bg="warning">{cb[5]}</Badge></td>
                                    <td><Button variant="primary">Tạo tái khám</Button></td>
                                </tr>
                            </>
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    </>
}

export default CompleteBooking;