import { CloseOutlined } from "@mui/icons-material";
import { useContext, useEffect, useRef, useState } from "react";
import { MessageBox } from "react-chat-elements";
import { UserContext } from "../../App";
import { Form } from "react-bootstrap";
import { authApi, endpoints } from "../../configs/Apis";
import SockJS from "sockjs-client";
import { over } from "stompjs";

var stompClient = null;

const MessageChat = (props) => {
  const { onClose } = props;
  const [current_user, dispatch] = useContext(UserContext);
  const [listMessage, setListMessage] = useState([]);
  const avatar = useRef();

  const [doctorDetail, setDoctorDetail] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageContent, setMessageContent] = useState(null);

  const [showChatRoom, setShowChatRoom] = useState(false);
  const [disconnected, setDisconnected] = useState(false);

  const connect = () => {
    let Sock = new SockJS(
      "http://localhost:2024/IMPROOK_CARE/api/public/webSocket/"
    );
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onError = (err) => {
    console.log(err);
  };

  const onConnected = () => {
    stompClient.subscribe(
      "/user/" + current_user?.userId + "/private",
      onPrivateMessage
    );
    // stompClient.subscribe('/user/private', onPrivateMessage);
  };

  const onPrivateMessage = (payload) => {
    console.log("ĐÂY LÀ PAYLOAD");
    console.log(payload);
    var payloadData = JSON.parse(payload.body);
    console.log("PAYLOAD LÀM SẠCH");
    console.log(payloadData);
    // setListMessage(current => {
    //     return {...current, payloadData}
    // })
    setListMessage(
      (prevList) => [...prevList, payloadData],
      () => {
        console.log("List sau làm sạch");
        console.log(listMessage);
      }
    );
  };

  const viewUserMessage = () => {
    const process = async () => {
      try {
        setLoading(true);
        const res = await authApi().get(
          endpoints["get-message-for-all-view"](
            props.profileDoctorId,
            current_user?.userId
          )
        );
        setListMessage(res.data);
        console.log(res.data);
        console.log(listMessage);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    process();
  };

  // const handleClick = (e) => {
  //     connect();
  //     setShowChatRoom(true);
  //     viewUserMessage(e);
  // };

  const addMessage = async (evt) => {
    evt.preventDefault();
    setLoading(true);

    let form = new FormData();
    form.append("profileDoctorId", props.profileDoctorId);
    form.append("userId", current_user?.userId);
    form.append("senderId", current_user?.userId);
    form.append("messageContent", messageContent);

    if (avatar.current.files[0] !== undefined && avatar !== null) {
      form.append("avatar", avatar.current.files[0]);
    } else {
      form.append("avatar", new Blob());
    }
    try {
      let res = await authApi().post(endpoints["add-message"], form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      var myMess = {
        profileDoctorId: props.profileDoctorId,
        userId: current_user.userId,
        senderId: current_user.userId,
        messageContent: messageContent,
        avatar: "Đây là avatar nhưng chưa có lấy được link do promise",
      };

      // listMessage.push(myMess);
      // setListMessage(listMessage);
      setListMessage([...listMessage, myMess]);
      // setListMessage(current => {
      //     return {...current, myMess}
      // })

      console.log("List sau khi gửi");
      console.log(listMessage);

      if (stompClient) {
        console.log("OK STOMP");
        stompClient.send("/app/private-message", {}, JSON.stringify(myMess));
      } else console.log("Chưa có kết nối");
      console.log(res.data);
      setMessageContent("");
      // viewUserMessage();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    viewUserMessage();
    connect();
  }, []);

  return (
    <>
      <div>
        <div className="User_Message_Detail_Inner">
          <div className="User_Message_Detail_Header">
            <h4 className="text-center mb-3 mt-3">{props.name}</h4>
            <button onClick={handleClose}>
              <CloseOutlined />
            </button>
          </div>
          <div className="User_Message_Content">
            {Object.values(listMessage).map((mes) => {
              if (!mes) return null;
              return (
                <>
                  {current_user?.userId === mes.senderId ? (
                    <MessageBox
                      key={mes.messageId}
                      position={"right"}
                      type={"text"}
                      avatar={null}
                      status={null}
                      text={mes.messageContent}
                      date={mes.createdDate}
                    />
                  ) : (
                    <MessageBox
                      key={mes.messageId}
                      position={"left"}
                      type={"text"}
                      avatar={null}
                      status={null}
                      text={mes.messageContent}
                      date={mes.createdDate}
                    />
                  )}
                </>
              );
            })}
          </div>
          <div className="User_Send_Message">
            <Form.Control
              className="mt-2"
              accept=".jpg, .jpeg, .png, .gif, .bmp"
              type="file"
              ref={avatar}
            />
            <div>
              <input
                type="text"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                placeholder="Nhập nội dung tin nhắn..."
              />
              <button type="button" onClick={(e) => addMessage(e)}>
                Gửi
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageChat;
