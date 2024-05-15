import { useContext, useEffect, useState } from "react";
import { UserContext, BookingManagementContext } from "../../App";
import { Badge, Button, Table } from "react-bootstrap";
import cookie from "react-cookies"
import Apis, { authApi, endpoints } from "../../configs/Apis";
import moment from "moment"

const ReexaminationBooking = (props) => {
    const [reexaminationBooking, setReexaminationBooking] = useState([]);
    const [current_user,] = useContext(UserContext);
    const [booking, dispatchBooking] = useContext(BookingManagementContext)
    const [bookingInfo, setBookingInfo] = useState({
        bookingId: null,
        profilePatientName: null,
        profileDoctorName: null,
        bookingPrice: null
    })
    const [profileDoctor, setProfileDoctor] = useState();
    const [selectedBookingId, setSelectedBookingId] = useState("");
    const [selectedProfilePatientName, setSelectedProfilePatientName] = useState("");
    const [loading, setLoading] = useState(false);

    const removePres = () => {
        cookie.remove("pres");
    }

    const loadReexaminationBooking = async () => {
        try {
            let res = await authApi().post(endpoints['booking-doctor-view-page'], {
                "profileDoctorId": props.profileDoctorId,
                "bookingStatusId": "5",
                "pageNumber": "0"
            })
            console.log(res.data.content)
            setReexaminationBooking(res.data.content)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadReexaminationBooking()
    }, [props.profileDoctorId])

    const loadDoctorById = async () => {
        try {
            setLoading(true);
            console.log(props.profileDoctorId)
            let res = await Apis.get(endpoints['load-profile-doctor-by-Id'](props.profileDoctorId))
            setProfileDoctor(res.data);
            setLoading(false);
            console.log("Đây là userInfo");
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    // const handleMeetingClick = (roomID) => {
    //     const url = `/zego/?roomID=${roomID}`;
    //     window.open(url, "_blank");
    // };

    useEffect(() => {
        loadDoctorById()
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
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(reexaminationBooking).map((rb, index) => {
                            const timeBegin = new Date(rb[3]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                            const timeEnd = new Date(rb[4]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                            const name = rb[6];
                            return <>
                                <tr key={index}>
                                    <td>{rb[0]}</td>
                                    <td>{name}</td>
                                    <td>{moment(rb[2]).format('DD-MM-YYYY')}</td>
                                    <td>{timeBegin} - {timeEnd}</td>
                                    <td><Badge bg="secondary">{rb[5]}</Badge></td>
                                </tr>
                            </>
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    </>
}

export default ReexaminationBooking;