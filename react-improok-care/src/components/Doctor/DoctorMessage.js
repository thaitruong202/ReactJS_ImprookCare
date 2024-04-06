import { useContext, useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../App";
import "./DoctorMessage.css";
import { Button, Form, Image } from "react-bootstrap";
import Apis, { authApi, endpoints } from "../../configs/Apis";
import printer from "../../assets/images/printer.png"
import profileicon from "../../assets/images/profile-icon.png"
import profile404 from "../../assets/images/profile.png"
import message from "../../assets/images/message.png"
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { MessageBox } from "react-chat-elements";
import 'react-chat-elements/dist/main.css';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import DoctorMenu from "../../layout/DoctorLayout/DoctorMenu";

import * as React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { blue } from '@mui/material/colors';
var stompClient = null;

function SimpleDialog(props) {
    const { onClose, selectedValue, open, onButtonClick } = props;
    const [current_user, dispatch] = useContext(UserContext);
    const [profileDoctor, setProfileDoctor] = useState([]);
    const [userSendMessageToDoctor, setUserSendMessageToDoctor] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState();
    const [listMessage, setListMessage] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    const loadProfileDoctor = async () => {
        try {
            let res = await Apis.get(endpoints['load-profile-doctor-by-userId'](current_user?.userId))
            setProfileDoctor(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadProfileDoctor();
    }, [current_user?.userId])

    const viewDoctorMessage = (userId) => {
        const process = async () => {
            try {
                setLoading(true);
                const res = await authApi().get(endpoints['get-message-for-all-view'](selectedProfile, userId));
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

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Set backup account</DialogTitle>
            <List sx={{ pt: 0 }}>
                {profileDoctor.map((pd) => (
                    <ListItem disableGutters key={pd.profileDoctorId}>
                        <ListItemButton
                            onClick={() => { onButtonClick(pd); handleListItemClick(pd.profileDoctorId) }}>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                    <img src={pd.userId.avatar} alt="PD" />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={pd.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
                <ListItem disableGutters>
                    <ListItemButton
                        autoFocus
                        onClick={() => handleListItemClick('addAccount')}
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <AddIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Add account" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

const DoctorMessage = () => {
    const [current_user,] = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [profileDoctor, setProfileDoctor] = useState([]);

    const [addProfileInfo, setAddProfileInfo] = useState(false);
    const [profile, setProfile] = useState(null);
    const [checkProfileInfo, setCheckProfileInfo] = useState(true);
    const [selectedProfile, setSelectedProfile] = useState();
    const [userSendMessageToDoctor, setUserSendMessageToDoctor] = useState([]);
    const [listMessage, setListMessage] = useState([]);

    const [messageContent, setMessageContent] = useState(null);

    const avatar = useRef();

    const [tempMessage, setTempMessage] = useState({
        "profileDoctorId": null,
        "userId": null,
        "senderId": null,
        "messageContent": null
    })

    // const connect = () => {
    //     let Sock = new SockJS('http://localhost:2024/IMPROOK_CARE/api/public/webSocket/');
    //     stompClient = over(Sock);
    //     stompClient.connect({}, onConnected, onError);
    // }

    // const onConnected = () => {
    //     stompClient.subscribe('/user/' + selectedProfile + '/private', onPrivateMessage);
    //     // stompClient.subscribe('/user/private', onPrivateMessage);
    // }

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

    const loadProfileDoctor = async () => {
        try {
            let res = await Apis.get(endpoints['load-profile-doctor-by-userId'](current_user?.userId))
            setProfileDoctor(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadProfileDoctor();
    }, [current_user?.userId])

    const getUserSendMessageToDoctor = async (pd) => {
        // setSelectedProfile(pd.profileDoctorId);
        setSelectedProfile(pd.profileDoctorId, () => {
            console.log(selectedProfile);
        });
        const connect = () => {
            let Sock = new SockJS('http://localhost:2024/IMPROOK_CARE/api/public/webSocket/');
            stompClient = over(Sock);
            stompClient.connect({}, onConnected, onError);
        }

        const onConnected = () => {
            stompClient.subscribe('/user/' + pd.profileDoctorId + '/private', onPrivateMessage);
            // stompClient.subscribe('/user/private', onPrivateMessage);
        }
        // setListMessage(prevList => [...prevList, payloadData], () => {
        //     console.log("List sau làm sạch");
        //     console.log(listMessage);
        // });
        connect();
        try {
            let res = await authApi().get(endpoints['get-user-send-message-to-doctor'](pd.profileDoctorId))
            setUserSendMessageToDoctor(res.data.content);
            console.log(res.data.content);
        } catch (error) {
            console.log(error);
        }
    }

    // const viewDoctorMessage = async (userId) => {
    //     const process = async () => {
    //         try {
    //             setLoading(true);
    //             const results = [];
    //             for (let i = 0; i < userSendMessageToDoctor.length; i++) {
    //                 const userId = userSendMessageToDoctor[i];
    //                 const res = await authApi().get(endpoints['get-message-for-doctor-view'](selectedProfile, userId));
    //                 results.push(res.data.content);
    //                 console.log("Đây là tin nhắn")
    //                 console.log(res.data.content);
    //             }
    //             setListMessage(results);
    //             setLoading(false);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     process();
    // }

    const viewDoctorMessage = (userId) => {
        const process = async () => {
            try {
                setLoading(true);
                const res = await authApi().get(endpoints['get-message-for-all-view'](selectedProfile, userId));
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

    const addMessage = async (evt, userId) => {
        evt.preventDefault();
        setLoading(true);

        console.log(selectedProfile, userId, messageContent);

        let form = new FormData();
        form.append("profileDoctorId", selectedProfile);
        form.append("userId", userId);
        form.append("senderId", selectedProfile);
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
                "profileDoctorId": selectedProfile,
                "userId": userId,
                "senderId": selectedProfile,
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

    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(1);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    return <>
        <div className="Doctor_Message_Wrapper">
            <div className="Doctor_Message">
                <div className="Doctor_Message_Left">
                    <div className="Doctor_Message_Left_Content">
                        <DoctorMenu />
                    </div>
                </div>
                <div className="Doctor_Message_Middle">
                    <div className="Doctor_Message_Middle_Header">
                        <h3>Hồ sơ</h3>
                        <button onClick={handleClickOpen}>
                            <img src={current_user?.avatar} alt="avatar" style={{ width: "100%" }} />
                        </button>
                    </div>
                    <div style={{ marginRight: "2rem" }}>
                        <SimpleDialog
                            selectedValue={selectedValue}
                            open={open}
                            onClose={handleClose}
                            onButtonClick={getUserSendMessageToDoctor}
                        />
                    </div>
                    <div className="Doctor_Message_Middle_Content">
                        <div className="Doctor_Message_Middle_Container">
                            <div className="Doctor_Message_Middle_Info">
                                <input type="text" placeholder="Nhập tên hồ sơ cần tìm..."></input>
                                <div className="Profile_List">
                                    {userSendMessageToDoctor.length === 0 ? <>
                                        <div className="Profile_List_404">
                                            <img src={printer} alt="404" width={'20%'} />
                                            <span>Vui lòng chọn Profile để xem tin nhắn</span>
                                        </div>
                                    </> : <>
                                        <div className="Profile_List_Info">
                                            <ul>
                                                {Object.values(userSendMessageToDoctor).map(pd => {
                                                    return <>
                                                        <div className="Profile_List_Detail" value={selectedProfile}>
                                                            <div className="avatar_Cont"><img src={pd.avatar} alt="profileicon" /></div>
                                                            <li key={pd.userId} value={pd.userId}>{pd.firstname} {pd.lastname}</li>
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
                <div className="Doctor_Message_Right">
                    <>
                        <section>
                            <div className="Doctor_Message_Right_Header"><h2 className="text-center mb-4">Tin nhắn</h2></div>
                            <div className="Doctor_Message_Right_Content">
                                {profileDoctor === null ? <>
                                    <div className="Doctor_Message_Null">
                                        <h5 className="mb-4">Chọn hồ sơ cần xem</h5>
                                        <img src={profile404} alt="Not found" width={'20%'} />
                                    </div>
                                </> :
                                    <>
                                        <div>
                                            {userSendMessageToDoctor.length === 0 ? <>
                                                <div className="Doctor_Message_Null">
                                                    <h5 className="mb-4">Chưa có tin nhắn nào</h5>
                                                    <img src={message} alt="Not found" width={'20%'} />
                                                </div>
                                            </> :
                                                <>
                                                    {userSendMessageToDoctor.map(usmtd => {
                                                        return <>
                                                            <Accordion>
                                                                <AccordionSummary
                                                                    expandIcon={<ExpandMoreIcon />}
                                                                    aria-controls="panel1a-content"
                                                                    id="panel1a-header"
                                                                    className="Prescription_Item"
                                                                    onClick={() => viewDoctorMessage(usmtd.userId)}
                                                                >
                                                                    <Typography>Bệnh nhân: {usmtd.firstname} {usmtd.lastname}</Typography>
                                                                </AccordionSummary>
                                                                <AccordionDetails className="Doctor_Message_Detail">
                                                                    <div className="Doctor_Message_Detail_Inner">
                                                                        <h4 className="text-center mb-3 mt-3">{usmtd.firstname} {usmtd.lastname}</h4>
                                                                        <div className="Message_Content">
                                                                            {Object.values(listMessage).map((mes) => {
                                                                                return <>
                                                                                    {selectedProfile === mes.senderId ?
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
                                                                                            date={mes.createdDate}
                                                                                        />
                                                                                    }
                                                                                </>
                                                                            })}
                                                                        </div>
                                                                        <div className="Send_Message">
                                                                            <Form.Control className="mt-2" style={{ width: '100%' }} accept=".jpg, .jpeg, .png, .gif, .bmp" type="file" ref={avatar} />
                                                                            <div>
                                                                                <input type="text" value={messageContent} onChange={(e) => setMessageContent(e.target.value)} placeholder="Nhập nội dung tin nhắn..." />
                                                                                {messageContent === null ? <button type="button">Gửi</button> : <button type="button" onClick={(e) => addMessage(e, usmtd.userId)}>Gửi</button>}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </AccordionDetails>
                                                            </Accordion>
                                                        </>
                                                    })}
                                                    {/* <div className="Page_Nav">
                                                        {prescriptionPages.map((page) => (
                                                            <button id={`${page}`} key={page} onClick={() => handlePrescriptionPageChange(page)}
                                                                className={page === selectedPage ? 'active' : ''}>
                                                                {page}
                                                            </button>
                                                        ))}
                                                    </div> */}
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

export default DoctorMessage;