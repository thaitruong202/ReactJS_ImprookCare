import axios from "axios";
import cookie from "react-cookies";

const SERVER_CONTEXT = "/IMPROOK_CARE";
const SERVER = "http://localhost:2024"

export const endpoints = {
    "login": `${SERVER_CONTEXT}/api/public/login/`,
    "current-user": `${SERVER_CONTEXT}/api/auth/current-user/`,
    "update-user": `${SERVER_CONTEXT}/api/auth/update-user/`,
    "verification": `${SERVER_CONTEXT}/api/public/verification/`,
    "verification-check": `${SERVER_CONTEXT}/api/public/verification-check/`,
    "register": `${SERVER_CONTEXT}/api/public/register/`,
    "add-profile-patient": `${SERVER_CONTEXT}/api/auth/add-profile-patient/`,
    "provinces": `${SERVER_CONTEXT}/api/public/provinces/`,
    "districts": (provinceCode) => `${SERVER_CONTEXT}/api/public/provinces/${provinceCode}/districts/`,
    "wards": (districtCode) => `${SERVER_CONTEXT}/api/public/districts/${districtCode}/wards/`,
    "load-profile-patient": (userId) => `${SERVER_CONTEXT}/api/auth/user/${userId}/profile-patient/`,
    "view-profile-patient": (profilePatientId) => `${SERVER_CONTEXT}/api/auth/profile-patient/${profilePatientId}/`,
    "update-profile-patient": `${SERVER_CONTEXT}/api/auth/update-profile-patient/`,
    "load-profile-doctor-by-userId": (userId) => `${SERVER_CONTEXT}/api/public/user/${userId}/profile-doctor/`,
    "load-profile-doctor-by-Id": (profileDoctorId) => `${SERVER_CONTEXT}/api/public/profile-doctor/${profileDoctorId}/`,
    "load-profile-doctor": `${SERVER_CONTEXT}/api/public/profile-doctor/`,
    "add-profile-doctor": `${SERVER_CONTEXT}/api/auth/doctor/add-profile-doctor/`,
    "update-profile-doctor": `${SERVER_CONTEXT}/api/auth/doctor/update-profile-doctor/`,
    "time-distance": `${SERVER_CONTEXT}/api/public/timeDistance/`,
    "time-slot": (timeDistanceId) => `${SERVER_CONTEXT}/api/public/timeDistance/${timeDistanceId}/timeSlot/`,
    "add-schedule": `${SERVER_CONTEXT}/api/auth/doctor/add-schedule/`,
    "specialty": `${SERVER_CONTEXT}/api/public/specialty/`,
    "check-scheduled": `${SERVER_CONTEXT}/api/public/check-scheduled/`,
    "find-check-scheduled": `${SERVER_CONTEXT}/api/public/find-check-scheduled/`,
    "date-booking": `${SERVER_CONTEXT}/api/public/date-booking/`,
    "timeslot-booking": `${SERVER_CONTEXT}/api/public/time-slot-booking/`,
    "add-booking": `${SERVER_CONTEXT}/api/auth/add-booking/`,
    "send-form-email": `${SERVER_CONTEXT}/api/public/send-form-email/`,
    "send-custom-email": `${SERVER_CONTEXT}/api/public/send-custom-email/`,
    "forgot-password": `${SERVER_CONTEXT}/api/public/forgot-password/`,
    "change-password": `${SERVER_CONTEXT}/api/auth/change-password/`,
    "booking-user-view": `${SERVER_CONTEXT}/api/auth/booking-user-view/`,
    "booking-doctor-view": `${SERVER_CONTEXT}/api/auth/booking-doctor-view/`,
    "accept-booking": `${SERVER_CONTEXT}/api/auth/doctor/accept-booking/`,
    "deny-booking": `${SERVER_CONTEXT}/api/auth/doctor/deny-booking/`,
    "cancel-booking": `${SERVER_CONTEXT}/api/auth/cancel-booking/`,
    "verification-forgot-password": `${SERVER_CONTEXT}/api/public/verification-forgot-password/`,
    "load-user": `${SERVER_CONTEXT}/api/public/users/`,
    "booking-details-user-view": `${SERVER_CONTEXT}/api/auth/booking-details-user-view/`,
    "admin-add-user": `${SERVER_CONTEXT}/api/auth/admin/add-user/`,
    "admin-update-user": `${SERVER_CONTEXT}/api/auth/admin/update-user/`,
    "load-user-by-Id": (userId) => `${SERVER_CONTEXT}/api/public/user/${userId}/`,
    "roles": `${SERVER_CONTEXT}/api/public/roles/`,
    "search-users": `${SERVER_CONTEXT}/api/public/search-users/`,
    "medicine-categories": `${SERVER_CONTEXT}/api/public/medicine-categories/`,
    "add-medicine-categories": `${SERVER_CONTEXT}/api/auth/admin/add-medicine-category/`,
    "update-medicine-categories": `${SERVER_CONTEXT}/api/auth/admin/update-medicine-category/`,
    "medicines": `${SERVER_CONTEXT}/api/public/medicines/`,
    "search-medicines": `${SERVER_CONTEXT}/api/public/search-medicines/`,
    "admin-add-medicine": `${SERVER_CONTEXT}/api/auth/admin/add-medicine/`,
    "load-medicine-by-Id": (medicineId) => `${SERVER_CONTEXT}/api/public/medicines/${medicineId}/`,
    "admin-update-medicine": `${SERVER_CONTEXT}/api/auth/admin/update-medicine/`,
    "search-medicine-categories": `${SERVER_CONTEXT}/api/public/search-medicine-categories/`,
    "add-prescription": `${SERVER_CONTEXT}/api/auth/doctor/add-prescription/`,
    "search-prescriptions": `${SERVER_CONTEXT}/api/auth/search-prescriptions/`,
    "prescription-detail-by-prescription-id": (prescriptionId) => `${SERVER_CONTEXT}/api/auth/prescription/${prescriptionId}/prescription-detail/`,
    "vnpay-payment": `${SERVER_CONTEXT}/api/public/pay-return/`,
    "process-return-vnpay": `${SERVER_CONTEXT}/api/public/processReturnVNPAY/`,
    "pay-medicine": `${SERVER_CONTEXT}/api/auth/pay-medicine/`,
    "pay-service": `${SERVER_CONTEXT}/api/auth/pay-service/`,
    "add-comment": `${SERVER_CONTEXT}/api/auth/add-comment/`,
    "update-comment": `${SERVER_CONTEXT}/api/auth/update-comment/`,
    "search-comments": `${SERVER_CONTEXT}/api/public/search-comments/`,
    "load-comments-page": (profileDoctorId) => `${SERVER_CONTEXT}/api/public/profile-doctor/${profileDoctorId}/comments/`,
    "stats-booking-by-user": `${SERVER_CONTEXT}/api/public/stats-booking-by-user/`,
    "stats-service-price-allpaid": `${SERVER_CONTEXT}/api/public/stats-service-price-allpaid/`,
    "stats-medicine-prescription-allpaid": `${SERVER_CONTEXT}/api/public/stats-medicine-prescription-allpaid/`,
    "stats-service-price-paid": `${SERVER_CONTEXT}/api/public/stats-service-price-paid/`,
    "stats-service-price-unpaid": `${SERVER_CONTEXT}/api/public/stats-service-price-unpaid/`,
    "stats-medicine-prescription-paid": `${SERVER_CONTEXT}/api/public/stats-medicine-prescription-paid/`,
    "stats-medicine-prescription-unpaid": `${SERVER_CONTEXT}/api/public/stats-medicine-prescription-unpaid/`,
    "add-message": `${SERVER_CONTEXT}/api/auth/add-message/`,
    "get-message": `${SERVER_CONTEXT}/api/auth/get-message/`,
    "get-message-for-all-view": (profileDoctorId, userId) => `${SERVER_CONTEXT}/api/auth/profileDoctor/${profileDoctorId}/get-message-detail/${userId}/`,
    "get-user-send-message-to-doctor": (profileDoctorId) => `${SERVER_CONTEXT}/api/auth/profileDoctor/${profileDoctorId}/get-user-send-message-to-doctor/`,
    "add-collab-doctor": `${SERVER_CONTEXT}/api/public/add-collab-doctor/`,
    "search-collab-doctor": `${SERVER_CONTEXT}/api/auth/search-collab-doctor/`,
    "accept-collab-doctor": `${SERVER_CONTEXT}/api/auth/accept-collab-doctor/`,
    "deny-collab-doctor": `${SERVER_CONTEXT}/api/auth/deny-collab-doctor/`,
    // "get-doctor-send-message-to-user": (userId) => `${SERVER_CONTEXT}/api/auth/user/${userId}/profile-doctor-message/`,
    "get-doctor-send-message-to-user": (userId) => `${SERVER_CONTEXT}/api/auth/user/${userId}/get-doctor-send-message-to-user/`,
    "booking-doctor-view-page": `${SERVER_CONTEXT}/api/auth/booking-doctor-view-page/`,
    "check-timeslot-register": (timeDistanceId) => `${SERVER_CONTEXT}/api/auth/doctor/timeDistance/${timeDistanceId}/timeSlot-check-register/`,
    "add-timeslot": `${SERVER_CONTEXT}/api/auth/doctor/add-timeSlot-schedule/`,
    "edit-timeslot": `${SERVER_CONTEXT}/api/auth/doctor/update-timeSlot-schedule/`,
    "load-custom-timeslot": (profileDoctorId) => `${SERVER_CONTEXT}/api/auth/doctor/profileDoctor/${profileDoctorId}/timeSlot-for-doctor/`,
    "seen-message": (messageId) => `${SERVER_CONTEXT}/api/auth/message/${messageId}/seenMessage/`,
    "search-function": `${SERVER_CONTEXT}/api/public/search-profile-doctors/`

    /*
    http://localhost:2024/IMPROOK_CARE/api/public/processReturnVNPAY/?vnp_Amount=13840000&vnp_BankCode=NCB&vnp_BankTranNo=VNP14141795&vnp_CardType=ATM&vnp_OrderInfo=Tuan+Tran+rich+kid+VN+pay%3A65331993&vnp_PayDate=20231013170840&vnp_ResponseCode=00&vnp_TmnCode=86LMDA46&vnp_TransactionNo=14141795&vnp_TransactionStatus=00&vnp_TxnRef=65331993&vnp_SecureHash=259b02cb3fcbe959cf2de9ff1d57d6febeb16c70dbe697248c0cb1f70e7383f9e865e6ba1b8435b30578ab5c645cc79a704986c7f2002bb6ea691a45d2e6adf3
     */
}

export const authApi = () => {
    return axios.create({
        baseURL: SERVER,
        headers: {
            "Authorization": cookie.load("token")
        }
    })
}

export default axios.create({
    baseURL: SERVER
})
