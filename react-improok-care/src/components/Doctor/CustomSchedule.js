import { useContext, useEffect, useState } from "react";
import "./CustomSchedule.css";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import Apis, { authApi, endpoints } from "../../configs/Apis";
import { toast } from "react-toastify";
import Spinner from "../../layout/Spinner";
import DoctorMenu from "../../layout/DoctorLayout/DoctorMenu";
// import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import TimePicker from 'react-time-picker';
import 'react-clock/dist/Clock.css';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const CustomSchedule = () => {
    const [current_user,] = useContext(UserContext);
    const nav = useNavigate();
    const [minDate, setMinDate] = useState('');
    const [timeDistance, setTimeDistance] = useState([]);
    const [timeSlot, setTimeSlot] = useState([]);
    const [profileDoctorByUserId, setProfileDoctorByUserId] = useState([]);
    const [selectedProfileDoctorId, setSeletedProfileDoctorId] = useState();
    const [selectedTimeDistanceId, setSelectedTimeDistanceId] = useState('1');
    const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
    // const [timeSlotCheck, setTimeSlotCheck] = useState([]);
    const [checkSchedule, setCheckSchedule] = useState([]);
    const [loading, setLoading] = useState(false);
    const [scheduleDate, setScheduleDate] = useState(new Date().toISOString().split("T")[0]);

    useEffect(() => {
        setLoading(true)
        const today = new Date().toISOString().split("T")[0];
        setMinDate(today);
        const loadAll = async () => {
            try {
                let res = await Apis.get(endpoints['load-profile-doctor-by-userId'](current_user?.userId));
                setProfileDoctorByUserId(res.data);
                if (res.data.length === 0) {
                    toast.info("Vui lòng tạo hồ sơ trước khi đăng ký lịch khám!");
                    nav('/profiledoctor');
                }
                if (res.data[0] !== undefined) {
                    setSeletedProfileDoctorId(res.data[0].profileDoctorId)
                }
                console.log(res.data);
                let ses = await Apis.get(endpoints['time-distance']);
                setTimeDistance(ses.data);
                console.log(ses.data);
                let e = `${endpoints['check-timeslot-register'](selectedTimeDistanceId)}`
                e += `?profileDoctorId=${res.data[0].profileDoctorId}&date=${scheduleDate}`
                console.log(e)
                let tes = await authApi().get(e)
                setTimeSlot(tes.data);
                console.log(tes.data);
            } catch (error) {
                console.log(error);
            }
        }
        loadAll()
        setLoading(false)
        console.log(value, timeB, timeE, formattedTime)
    }, [selectedProfileDoctorId, selectedTimeDistanceId, scheduleDate]);

    const scheduleCheck = (evt, timeSlotId) => {
        evt.preventDefault();

        const process = async () => {
            try {
                const dateInput = document.getElementById('dateInput');
                const selectedDate = dateInput.value; // Lấy giá trị ngày từ trường input

                const formattedDate = new Date(selectedDate).toISOString().split('T')[0];
                console.log(selectedProfileDoctorId, formattedDate, timeSlotId)
                let res = await Apis.post(endpoints['check-scheduled'], {
                    "profileDoctorId": selectedProfileDoctorId,
                    "date": formattedDate,
                    "timeSlotId": timeSlotId
                });
                if (res.data === "Lịch chữa bệnh chưa đăng ký!") {
                    const isSelected = selectedTimeSlots.includes(timeSlotId);

                    if (isSelected) {
                        setSelectedTimeSlots(selectedTimeSlots.filter(id => id !== timeSlotId));
                    } else {
                        setSelectedTimeSlots([...selectedTimeSlots, timeSlotId]);
                    }
                }
                // else {
                //     toast(res.data)
                // }
                setCheckSchedule(res.data);
                console.log(res.data);
            } catch (error) {
                console.log(error);
                toast.error("Có lỗi xảy ra!")
            }
        }
        process();
    }

    const timeDistanceChange = (e) => {
        setSelectedTimeDistanceId(e.target.value);
        setSelectedTimeSlots([]);
    }

    const profileDoctorChange = (e) => {
        setSeletedProfileDoctorId(e.target.value);
        setSelectedTimeSlots([]);
    }

    const scheduleDateChange = (date) => {
        console.log(date);
        const newDate = new Date(date).toISOString().split("T")[0];
        console.log(newDate);
        setScheduleDate(newDate);
    }

    const addSchedule = (evt) => {
        evt.preventDefault();

        const process = async () => {
            try {
                setLoading(true);
                const dateInput = document.getElementById('dateInput');
                const selectedDate = dateInput.value; // Lấy giá trị ngày từ trường input

                const formattedDate = new Date(selectedDate).toISOString().split('T')[0]; // Định dạng lại ngày thành "yyyy-MM-dd"

                if (selectedTimeSlots.length === 0) {
                    toast.warning("Vui lòng chọn ít nhất một khung giờ trước khi lưu.");
                    setLoading(false);
                    return;
                }

                for (let i = 0; i < selectedTimeSlots.length; i++) {
                    const timeSlotId = selectedTimeSlots[i];
                    let res = await authApi().post(endpoints['add-schedule'], {
                        "profileDoctorId": selectedProfileDoctorId,
                        "date": formattedDate,
                        "timeSlotId": timeSlotId
                    });
                    console.log(res.data);
                }
                toast.success("Tạo lịch khám thành công!")
                setLoading(false);
            } catch (error) {
                console.log(error);
                toast.error("Có lỗi xảy ra!")
            }
        }
        process();
    }

    console.log(selectedTimeSlots);
    // console.log(current_user.userId);

    const [value, setValue] = useState(new Date());

    // const formattedTime = value.toISOString().replace("T", " ").substr(0, 19);
    // const formattedTime = value.toLocaleString("en-US", { timeZone: "Asia/Bangkok", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" });
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, "0");
    const day = String(value.getDate()).padStart(2, "0");
    const hours = String(value.getHours()).padStart(2, "0");
    const minutes = String(value.getMinutes()).padStart(2, "0");
    const seconds = String(value.getSeconds()).padStart(2, "0");

    const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    const onChange = (newValue) => {
        setValue(newValue);
    };

    const [timeB, setTimeB] = useState(new Date());

    const onTimeBChange = (newValue) => {
        setTimeB(newValue);
    };

    const [timeE, setTimeE] = useState(new Date());

    const onTimeEChange = (newValue) => {
        setTimeE(newValue);
    };

    const [note, setNote] = useState('')

    const localizer = momentLocalizer(moment)

    const myEventsList = [{
        start: moment().toDate(), // Lấy thời gian hiện tại
        end: moment().add(1, 'hour').toDate(), // Thêm 1 giờ để lấy thời gian kết thúc
        title: "Ngộ ha"
    }];

    const formats = {
        timeGutterFormat: 'HH:mm', // Định dạng cho thời gian trong bảng điều khiển thời gian (time column)
        eventTimeRangeFormat: ({ start, end }) => {
            const startTime = moment(start).format('HH:mm'); // Định dạng thời gian bắt đầu
            const endTime = moment(end).format('HH:mm'); // Định dạng thời gian kết thúc
            return `${startTime} - ${endTime}`;
        },
    };

    const [events, setEvents] = useState([]); // Khởi tạo state để lưu trữ danh sách sự kiện

    const handleDrop = (event) => {
        // Xử lý sự kiện khi người dùng thả timeslot để tạo sự kiện mới
        const { start, end } = event; // Thời gian bắt đầu và kết thúc của timeslot
        const newEvent = {
            start,
            end,
            title: 'Sự kiện mới',
        };
        setEvents([...events, newEvent]); // Thêm sự kiện mới vào danh sách sự kiện
    };

    const TimeSlotWrapper = ({ children }) => {
        const [, drop] = useDrop({
            accept: 'event',
            drop: handleDrop,
        });

        return <div ref={drop}>{children}</div>;
    };

    return <>
        <div className="Schedule_Wrapper">
            <div className="Schedule">
                <div className="Schedule_Left">
                    <div className="Schedule_Left_Content">
                        <DoctorMenu />
                    </div>
                </div>
                {/* <button onClick={scheduleCheck}>Xem</button> */}
                <div className="Schedule_Right">
                    <div className="Schedule_Right_Content">
                        <h2 className="text-center">Đăng ký lịch khám bệnh</h2>
                        <div>
                            {/* <Calendar onChange={onChange} value={value} /> */}
                            <DndProvider backend={HTML5Backend}>
                                <Calendar
                                    localizer={localizer}
                                    events={myEventsList}
                                    startAccessor="start"
                                    endAccessor="end"
                                    style={{ height: 500 }}
                                    formats={formats}
                                    defaultView="week"
                                    views={["month", "week", "day"]}
                                    components={{
                                        timeSlotWrapper: TimeSlotWrapper,
                                    }}
                                />
                            </DndProvider>
                        </div>
                        <div className="Schedule_Option">
                            <div className="Schedule_Profile_Option">
                                <Form.Label style={{ width: "30%" }}>Chọn hồ sơ</Form.Label>
                                <select className="value" defaultValue={selectedProfileDoctorId} onChange={(e) => profileDoctorChange(e)} onFocus={(e) => profileDoctorChange(e)}>
                                    {Object.values(profileDoctorByUserId).map(pd => <option key={pd.profileDoctorId} value={pd.profileDoctorId}>{pd.name}</option>)}
                                </select>
                            </div>
                            <div className="Schedule_Profile_Option">
                                <Form.Label style={{ width: "30%" }}>Thời gian bắt đầu</Form.Label>
                                <TimePicker onChange={onTimeBChange} value={timeB} clearIcon={null} />
                            </div>
                            <div className="Schedule_Profile_Option">
                                <Form.Label style={{ width: "30%" }}>Thời gian kết thúc</Form.Label>
                                <TimePicker onChange={onTimeEChange} value={timeE} clearIcon={null} />
                            </div>
                            <div className="Schedule_Profile_Option">
                                <Form.Label style={{ width: "30%" }}>Ghi chú</Form.Label>
                                <Form.Control as="textarea" aria-label="With textarea" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Nhập nội dung ghi chú" />
                            </div>
                        </div>
                        <div className="Schedule_Timeslot">
                            <div className="TimeSlot_Option">
                                {loading === true ? <Spinner /> :
                                    <>
                                        {/* {Object.values(timeSlot).map((ts, index) => {
                                            const timeBegin = new Date(ts.timeSlot.timeBegin).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                            const timeEnd = new Date(ts.timeSlot.timeEnd).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                            const isSelected = selectedTimeSlots.includes(ts.timeSlot.timeSlotId);
                                            return (
                                                <span key={ts.timeSlot.timeSlotId} value={ts.timeSlot.timeSlotId}
                                                    style={{
                                                        marginRight: '10px', background: ts.isRegister === true ? 'lightblue' : isSelected ? 'yellow' : 'white',
                                                        cursor: ts.isRegister === true ? 'not-allowed' : 'pointer'
                                                    }}
                                                    onClick={(e) => scheduleCheck(e, ts.timeSlot.timeSlotId)}>
                                                    {timeBegin} - {timeEnd}
                                                </span>
                                            );
                                        })} */}
                                    </>
                                }
                            </div>
                        </div>
                        <div className="Create_Butt">
                            <button className="Create_Schedule_Butt" onClick={addSchedule}>Tạo lịch khám</button>
                        </div>
                    </div>
                    <div className="custom_area">
                        <h2 className="text-center">Đăng ký lịch khám bệnh tùy chỉnh</h2>
                        <div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default CustomSchedule;