import { useContext, useEffect, useState } from "react";
import { UserContext, BookingManagementContext } from "../../App";
import { Badge, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import cookie from "react-cookies"
import Apis, { authApi, endpoints } from "../../configs/Apis";
import moment from "moment";
import { FaBookMedical, FaVideo } from "react-icons/fa";
import Pagination from "../../utils/Pagination"
import Swal from "sweetalert2";

const AcceptBooking = (props) => {
    const [allowBooking, setAllowBooking] = useState([]);
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
    const [totalPages, setTotalPages] = useState('1');
    const [selectedPage, setSelectedPage] = useState('1');


    const removePres = () => {
        cookie.remove("pres");
    }

    const loadAllowBooking = async () => {
        try {
            let res = await authApi().post(endpoints['booking-doctor-view-page'], {
                "profileDoctorId": props.profileDoctorId,
                "bookingStatusId": "2",
                "pageNumber": "0"
            })
            console.log(res.data.content)
            setAllowBooking(res.data.content)
        } catch (error) {
            console.log(error)
        }
    }

    const loadAllowBookingPage = async (pageNumber) => {
        try {
            let res = await authApi().post(endpoints['booking-doctor-view-page'], {
                "profileDoctorId": props.profileDoctorId,
                "bookingStatusId": "2",
                "pageNumber": pageNumber - 1
            })
            console.log(res.data.content)
            setAllowBooking(res.data.content)
            setTotalPages(res.data.totalPages)
        } catch (error) {
            console.log(error)
        }
    }

    const handleCreatePrescription = (e, bookingId, profilePatientName, profilePatientId, profileDoctorId) => {
        setSelectedBookingId(bookingId);
        setSelectedProfilePatientName(profilePatientName);
        loadDoctorById();
        console.log(bookingId)
        console.log(profilePatientName)
        console.log(selectedBookingId);
        console.log(selectedProfilePatientName);
        const updatedBookingInfo = {
            bookingId: bookingId,
            profilePatientId: profilePatientId,
            profileDoctorId: profileDoctorId,
            profilePatientName: profilePatientName,
            profileDoctorName: profileDoctor.name,
            bookingPrice: profileDoctor.bookingPrice
        };

        setBookingInfo(updatedBookingInfo);
        dispatchBooking({
            type: "booking",
            payload: updatedBookingInfo
        });
        cookie.save("bookingInfo", updatedBookingInfo);
        console.log(bookingInfo);
        console.log(current_user);
    };

    useEffect(() => {
        loadAllowBooking()
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

    const handleMeetingClick = (roomID) => {
        const url = `/zego/?roomID=${roomID}`;
        window.open(url, "_blank");
    };

    useEffect(() => {
        loadDoctorById()
    }, [props.profileDoctorId])

    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
    const handlePageChange = (pageNumber) => {
        // TODO: Xử lý sự kiện khi người dùng chuyển trang
        setSelectedPage(pageNumber);
        loadAllowBookingPage(pageNumber);
        console.log(`Chuyển đến trang ${pageNumber}`);
    };

    const cancelBooking = async (bookingId) => {
        try {
            const requestBody = bookingId.toString()
            let res = await authApi().post(endpoints['cancel-booking'], requestBody, {
                headers: {
                    'Content-Type': 'text/plain'
                }
            })
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getPaymentHistory = async (bookingId, name) => {
        try {
            let res = await authApi().get(endpoints['get-payment-by-booking'](bookingId))
            console.log(res.data)
            let e = endpoints['add-payment']
            e += `?bookingId=${bookingId}&vnp_ResponseId=${res.data.vnpResponseid}&vnp_command=${res.data.vnpCommand}&vnp_ResponseCode=${`01`}&vnp_Message=${res.data.vnpMessage}&vnp_tmncode=${res.data.vnpTmncode}&vnp_txnref=${res.data.vnpTxnref}&vnp_amount=${res.data.vnpAmount}&vnp_orderinfo=${name + ` đã được hoàn tiền thành công`}&vnp_bankcode=${res.data.vnpBankcode}&vnp_PayDate=${res.data.vnpPaydate}&vnp_TransactionNo=${res.data.vnpTransactionno}&vnp_TransactionStatus=${res.data.vnpTransactionstatus}&vnp_securehash=${res.data.vnpSecurehash}`;
            console.log(e);
            let pay = await authApi().get(e)
            let mes = await Apis.post(endpoints['send-custom-email'], {
                "mailTo": "2051050549tuan@ou.edu.vn",
                "mailSubject": "Hoàn tiền",
                "mailContent": `${name} đã được hoàn tiền giao dịch ${res.data.vnpResponseid} với số tiền là ${res.data.vnpAmount} VNĐ`
            })
            console.log(mes.data)
            console.log(pay.data)
        } catch (error) {
            console.log(error)
        }
    }

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
                            <th>Khám bệnh</th>
                            <th>Meeting</th>
                            <th>Hủy & Hoàn tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(allowBooking).map((ab, index) => {
                            const timeBegin = new Date(ab[3]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                            const timeEnd = new Date(ab[4]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                            const name = ab[6];
                            return <>
                                <tr key={index}>
                                    <td>{ab[0]}</td>
                                    <td>{name}</td>
                                    <td>{moment(ab[2]).format('DD-MM-YYYY')}</td>
                                    <td>{timeBegin} - {timeEnd}</td>
                                    <td><Badge bg="success">{ab[5]}</Badge></td>
                                    {/* <td><Button variant="primary" onClick={(e) => handleCreatePrescription(e, bl[0], bl[6])}>
                                    <Link to={`/prescription/?bookingId=${bl[0]}&&profilePatientName=${bl[6]}&&profileDoctorName=${profileDoctor.name}&&bookingPrice=${profileDoctor.bookingPrice}`}>Tạo đơn thuốc</Link></Button></td> */}
                                    <td><Button variant="primary" onClick={(e) => handleCreatePrescription(e, ab[0], ab[6], ab[10].profilePatientId, ab[11].profileDoctorId)}><Link to='/doctor/examination/prescription' class="toPrescription" onClick={() => removePres()}><FaBookMedical /></Link></Button></td>
                                    {/* <td><Button variant="primary"><Link to={`/zego/?roomID=${ab[9]}`} class="toPrescription">Meeting</Link></Button></td> */}
                                    <td><Button variant="primary" onClick={() => handleMeetingClick(ab[9])}><FaVideo /></Button></td>
                                    <td><Button variant="primary" onClick={() => { cancelBooking(ab[0]); getPaymentHistory(ab[0], name) }}>Hủy & Hoàn tiền</Button></td>
                                </tr>
                            </>
                        })}
                    </tbody>
                </Table>
                <Pagination pages={pages}
                    selectedPage={selectedPage}
                    handlePageChange={handlePageChange} />
            </div>
        </div>
    </>
}

export default AcceptBooking;