import { toast } from 'react-toastify';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';

let clientStomp;
let isToastDisplayed = false;

export const connectNotification = (data) => {
    // isToastDisplayed = false;
    let Sock = new SockJS('http://localhost:2024/IMPROOK_CARE/api/public/notification/');
    clientStomp = over(Sock);
    clientStomp.connect({}, () => onConnectedNotification(data), onErrorNotification);
};

const onConnectedNotification = (data) => {
    clientStomp.subscribe('/user/' + data + '/notification', onPrivateNotification);
};

const onErrorNotification = (err) => {
    console.log(err);
};

const onPrivateNotification = (payload) => {
    // isToastDisplayed = false;
    console.log("ĐÂY LÀ PAYLOAD");
    console.log(payload);
    var payloadData = JSON.parse(payload.body);
    console.log("PAYLOAD LÀM SẠCH");
    console.log(payloadData);
    if (!isToastDisplayed) {
        toast.info(payloadData.notificationContent);
        isToastDisplayed = true; // Đánh dấu là đã hiển thị toast
    }
};