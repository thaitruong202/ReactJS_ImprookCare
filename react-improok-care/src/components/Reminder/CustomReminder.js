import { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { UserContext } from "../../App";
import { authApi, endpoints } from "../../configs/Apis";
import Swal from "sweetalert2";

const CustomReminder = () => {
    const [current_user,] = useContext(UserContext);
    const [medicineName, setMedicineName] = useState('');
    const [email, setEmail] = useState('');
    const [medicineTime, setMedicineTime] = useState();
    const currentDate = new Date();
    const currentFormattedDate = currentDate.toISOString().split('T')[0];
    const currentTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const [isEmailValid, setIsEmailValid] = useState(false)

    console.log(currentTime)
    console.log(medicineTime)

    const getCurrentFormattedDate = () => {
        const currentDate = new Date();
        const currentFormattedDate = currentDate.toISOString().split('T')[0];
        return currentFormattedDate;
    }

    const saveCustomReminder = async () => {
        try {
            if (isEmailValid === false) {
                Swal.fire(
                    'Thất bại', 'Địa chỉ email không hợp lệ!', 'error'
                );
                return
            }
            const dateInput = document.getElementById('dateInput');
            const selectedDate = dateInput.value;
            const remindDate = new Date(selectedDate).toISOString().split('T')[0];
            console.log(remindDate)
            // console.log(remindDate + " " + medicineTime + ":00")
            const customTime = `${remindDate} ${medicineTime ? medicineTime : currentTime}:00`;
            console.log(customTime)
            let res = await authApi().post(endpoints['add-medical-schedule'], {
                "customTime": customTime,
                "startDate": remindDate,
                "medicineName": medicineName,
                "email": email,
                "userId": current_user?.userId
            })
            console.log(res.data)
            Swal.fire(
                'Thành công', "Tạo lịch nhắc thành công!", 'success'
            );
        } catch (error) {
            console.log(error)
        }
    }

    const cancelCustomReminder = () => {
        setMedicineName('');
        setEmail('');
        const currentFormattedDate = getCurrentFormattedDate();
        document.getElementById('dateInput').value = currentFormattedDate;
    }

    const validateEmail = (evt) => {
        evt.preventDefault();

        const emailInput = document.getElementById('emailInput');
        const errorMsg = document.getElementById('errorMsg');
        const email = emailInput.value;

        // Kiểm tra định dạng email
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (email === '') {
            errorMsg.style.display = 'none';
            setIsEmailValid(false)
        } else if (!emailRegex.test(email)) {
            errorMsg.style.display = 'block';
            setIsEmailValid(false);
        } else {
            errorMsg.style.display = 'none';
            setIsEmailValid(true);
            setEmail(evt.target.value);
        }
    }

    return (
        <>
            <div className="custom-reminder-wrapper">
                <div className="custom-reminder">
                    <div className="Profile_Right_Header"><h3 className="text-center mb-4">Tạo nhắc uống thuốc</h3></div>
                    <div className="Profile_Right_Content">
                        <div className="Profile_Name">
                            <Form.Label style={{ width: "30%" }}>Tên thuốc</Form.Label>
                            <Form.Control value={medicineName} onChange={(e) => setMedicineName(e.target.value)} type="text" placeholder="Tên thuốc" required />
                        </div>
                        <div className="Profile_Phonenumber">
                            <Form.Label style={{ width: "30%" }}>Thời gian uống</Form.Label>
                            <Form.Control type="Time" defaultValue={currentTime} onChange={(e) => setMedicineTime(e.target.value)} />
                        </div>
                        <div className="Profile_Email">
                            <Form.Label style={{ width: "30%" }}>Ngày bắt đầu</Form.Label>
                            <Form.Control type="Date" id="dateInput" defaultValue={currentFormattedDate} />
                        </div>
                        <div className="Personal_Email">
                            <div>
                                <Form.Label style={{ width: "30%" }}>Email</Form.Label>
                                <Form.Control type="text" defaultValue={email} onChange={(e) => validateEmail(e)} placeholder="Email" required id="emailInput" />
                            </div>
                            <p id="errorMsg" style={{ color: 'red', display: 'none' }}>Email không hợp lệ</p>
                        </div>
                        <div className="Update_Button">
                            <button type="button" onClick={() => cancelCustomReminder()}>Hủy</button>
                            <button type="button" onClick={() => saveCustomReminder()}>Lưu</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CustomReminder;