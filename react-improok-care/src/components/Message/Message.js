import { useContext, useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import "./Message.css";
import { Form } from "react-bootstrap";
import Apis, { authApi, endpoints } from "../../configs/Apis";
// import doctorprofile from "../../assets/images/doctor-profile-icon.png"
import printer from "../../assets/images/printer.png"
import profileicon from "../../assets/images/profile-icon.png"
import profile404 from "../../assets/images/profile.png"
import message from "../../assets/images/message.png"
import { MessageBox } from "react-chat-elements";
import 'react-chat-elements/dist/main.css';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import UserMenu from "../../layout/UserMenu/UserMenu";
var stompClient = null;

const Message = () => {
    const [current_user,] = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [profileDoctor, setProfileDoctor] = useState([]);
    const [doctorName, setDoctorName] = useState('');
    const [doctorId, setDoctorId] = useState();
    const [selectedProfile, setSelectedProfile] = useState();
    const [doctorSendMessageToUser, setDoctorSendMessageToUser] = useState([]);
    const [listMessage, setListMessage] = useState([]);

    const [messageContent, setMessageContent] = useState(null);

    const avatar = useRef();

    const [tempMessage, setTempMessage] = useState({
        "profileDoctorId": null,
        "userId": null,
        "senderId": null,
        "messageContent": null
    })

    const connect = () => {
        let Sock = new SockJS('http://localhost:2024/IMPROOK_CARE/api/public/webSocket/');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        stompClient.subscribe('/user/' + current_user?.userId + '/private', onPrivateMessage);
        // stompClient.subscribe('/user/private', onPrivateMessage);
    }

    const onError = (err) => {
        console.log(err);
    }

    const onPrivateMessage = (payload) => {
        console.log("ĐÂY LÀ PAYLOAD");
        console.log(payload);
        var payloadData = JSON.parse(payload.body);
        console.log("PAYLOAD LÀM SẠCH");
        console.log(payloadData);
        // let fakeListMessage = {
        //     "profileDoctorId":payloadData.profileDoctorId,
        //     "userId":payloadData.userId,
        //     "senderId":payloadData.senderId,
        //     "messageContent": payloadData.messageContent
        // }

        setListMessage(prevList => [...prevList, payloadData], () => {
            console.log("List sau làm sạch");
            console.log(listMessage);
        });
        // setListMessage(current => {
        //     return {...current, fakeListMessage}
        // })
    }

    const getDoctorSendMessageToUser = async () => {
        connect();
        try {
            let res = await authApi().get(endpoints['get-doctor-send-message-to-user'](current_user?.userId))
            setDoctorSendMessageToUser(res.data.content);
            console.log(res.data.content);
        } catch (error) {
            console.log(error);
        }
    }

    const viewUserMessage = (profileDoctorId) => {
        const process = async () => {
            try {
                setLoading(true);
                const res = await authApi().get(endpoints['get-message-for-all-view'](profileDoctorId, current_user?.userId));
                setListMessage(res.data);
                console.log(res.data);
                console.log(listMessage);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        process();
    }

    useEffect(() => {
        getDoctorSendMessageToUser()
    }, [])

    const addMessage = async (evt) => {
        evt.preventDefault();
        setLoading(true);

        console.log(doctorId, current_user?.userId, messageContent);

        let form = new FormData();
        form.append("profileDoctorId", doctorId);
        form.append("userId", current_user?.userId);
        form.append("senderId", current_user?.userId);
        form.append("messageContent", messageContent);

        if (avatar.current.files[0] !== undefined && avatar !== null) {
            form.append("avatar", avatar.current.files[0]);
        } else {
            form.append("avatar", new Blob());
        }
        try {
            let res = await authApi().post(endpoints['add-message'], form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(res.data);

            var myMess = {
                "profileDoctorId": doctorId,
                "userId": current_user?.userId,
                "senderId": current_user?.userId,
                "messageContent": messageContent
            }

            // listMessage.push(myMess);
            console.log("TRỜI ƠI")
            console.log(listMessage)
            setListMessage([...listMessage, myMess]);
            // setListMessage(current => {
            //     return {...current, myMess}
            // })

            console.log("List sau khi gửi");
            console.log(listMessage);

            // setTempMessage({
            //     "profileDoctorId": selectedProfile,
            //     "userId": userId,
            //     "senderId": selectedProfile,
            //     "messageContent": messageContent
            // });

            if (stompClient) {
                console.log("OK STOMP")
                stompClient.send("/app/private-message", {}, JSON.stringify(myMess));
            }
            else
                console.log("Chưa có kết nối")
            setMessageContent('');
            // viewDoctorMessage(userId);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    if (current_user === null)
        <Navigate to="/" />

    return <>
        <div className="Message_Wrapper">
            <div className="Message">
                <div className="Message_Left">
                    <div className="Message_Left_Content">
                        <UserMenu />
                    </div>
                </div>
                <div className="Message_Middle">
                    <div className="Message_Middle_Header">
                        <h3>Tin nhắn</h3>
                    </div>
                    <div className="Message_Middle_Content">
                        <div className="Message_Middle_Container">
                            <div className="Message_Middle_Info">
                                <input type="text" placeholder="Tìm kiếm tin nhắn..."></input>
                                <div className="Profile_List">
                                    {doctorSendMessageToUser.length === 0 ? <>
                                        <div className="Profile_List_404">
                                            <img src={printer} alt="404" width={'20%'} />
                                            <span>Chưa có tin nhắn nào</span>
                                        </div>
                                    </> : <>
                                        <div className="Profile_List_Info">
                                            <ul>
                                                {Object.values(doctorSendMessageToUser).map(pd => {
                                                    return <>
                                                        <div className="Profile_List_Detail" value={selectedProfile} onClick={() => { viewUserMessage(pd.profileDoctorId); setDoctorName(pd.name); setDoctorId(pd.profileDoctorId) }}>
                                                            <img src={pd.userId.avatar} alt="profileicon" width={'20%'} />
                                                            <li key={pd.profileDoctorId} value={pd.profileDoctorId}>{pd.name}</li>
                                                        </div>
                                                    </>
                                                })}
                                            </ul>
                                        </div>
                                    </>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Message_Right">
                    <>
                        <section>
                            <div className="Message_Right_Header"><h3 className="text-center mb-4">Tin nhắn</h3></div>
                            <div className="Message_Right_Content">
                                {profileDoctor === null ? <>
                                    <div className="Message_Null">
                                        <h5 className="mb-4">Chọn hồ sơ cần xem</h5>
                                        <img src={profile404} alt="Not found" width={'20%'} />
                                    </div>
                                </> :
                                    <>
                                        <div>
                                            {doctorSendMessageToUser.length === 0 ? <>
                                                <div className="Message_Null">
                                                    <h5 className="mb-4">Chưa có tin nhắn nào</h5>
                                                    <img src={message} alt="Not found" width={'20%'} />
                                                </div>
                                            </> :
                                                <>
                                                    <div>
                                                        <h4 className="text-center mb-3 mt-3">{doctorName}</h4>
                                                        <div className="Message_Content">
                                                            {Object.values(listMessage).map((mes) => {
                                                                return <>
                                                                    {current_user?.userId === mes.senderId ?
                                                                        <MessageBox
                                                                            key={mes.messageId}
                                                                            position={'right'}
                                                                            type={'text'}
                                                                            avatar={null}
                                                                            status={null}
                                                                            text={mes.messageContent}
                                                                            date={mes.createdDate}
                                                                        /> :
                                                                        <MessageBox
                                                                            key={mes.messageId}
                                                                            position={'left'}
                                                                            type={'text'}
                                                                            avatar={null}
                                                                            status={null}
                                                                            text={mes.messageContent}
                                                                            date={mes.createdDate} />
                                                                    }
                                                                </>
                                                            })}
                                                        </div>
                                                        <div className="Send_Message">
                                                            <Form.Control className="mt-2" style={{ width: '100%' }} accept=".jpg, .jpeg, .png, .gif, .bmp" type="file" ref={avatar} />
                                                            <div>
                                                                <input type="text" value={messageContent} onChange={(e) => setMessageContent(e.target.value)} placeholder="Nhập nội dung tin nhắn..." />
                                                                {messageContent === null ? <button type="button">Gửi</button> : <button type="button" onClick={(e) => addMessage(e)}>Gửi</button>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                    </>}
                            </div>
                        </section>
                    </>
                </div>
            </div>
        </div >
    </>
}

export default Message;