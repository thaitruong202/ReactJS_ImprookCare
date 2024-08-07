import { useContext, useRef, useState } from "react";
import { UserContext } from "../../App";
import "./Personal.css";
import { Form, Image } from "react-bootstrap";
import { authApi, endpoints } from "../../configs/Apis";
import cookie from "react-cookies";
import { toast } from "react-toastify";
import avatar_user from "../../assets/images/user.png"
import moment from "moment";
import Swal from "sweetalert2";

const Personal = () => {
    const [current_user, dispatch] = useContext(UserContext);
    const [current_avatar, setCurrent_avatar] = useState(current_user?.avatar);
    const [birthday, setBirthday] = useState(null);
    const [gender, setGender] = useState(null);
    const avatar = useRef();
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState({
        "firstname": current_user?.firstname,
        "lastname": current_user?.lastname,
        "userId": current_user?.userId,
        "email": current_user?.email,
        "birthday": current_user?.birthday,
        "gender": current_user?.gender,
        "avatar": current_user?.avatar
    })
    const [checkPersonalInfo, setCheckPersonalInfo] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(false)

    const formattedDate = new Date(current_user?.birthday);
    formattedDate.setHours(formattedDate.getHours() + 7);
    const formattedDateTime = formattedDate.toISOString().substring(0, 10);
    const formattedBirthday = moment(current_user?.birthday).format('DD-MM-YYYY');

    // console.log(typeof (current_birthday))
    // console.log(typeof (current_user.birthday))
    // const formattedDate = current_user.birthDate.toISOString();
    // const formattedDate = new Date(current_birthday).toISOString();

    // useEffect(() => {
    //     const formattedDate = new Date(current_user.birthday).toISOString().substring(0, 10);
    //     setCurrent_birthday(formattedDate);
    // }, [current_user.birthday]);


    const updateClick = () => {
        setCheckPersonalInfo(!checkPersonalInfo);
    }

    const updateUser = (evt) => {
        evt.preventDefault();

        const process = async () => {
            try {
                if (isEmailValid === false) {
                    Swal.fire(
                        'Thất bại', 'Địa chỉ email không hợp lệ!', 'error'
                    );
                    return
                }
                const dateInput = document.getElementById('dateInput');
                const selectedDate = dateInput.value; // Lấy giá trị ngày từ trường input

                const birthDate = new Date(selectedDate).toISOString().split('T')[0]; // Định dạng lại ngày thành "yyyy-MM-dd"

                console.log(birthDate);
                let form = new FormData();
                console.log(user);

                for (let field in user) {
                    if (field !== "avatar" || field !== "gender" || field !== "birthday")
                        form.append(field, user[field]);
                }

                if (avatar.current.files[0] !== undefined) {
                    form.append("avatar", avatar.current.files[0]);
                } else {
                    form.append("avatar", new Blob());
                }

                form.delete("gender");
                if (gender === false) {
                    form.append("gender", false)
                } else {
                    form.append("gender", true)
                }

                form.delete("birthday")
                form.append("birthday", birthDate);

                setLoading(true);

                try {
                    console.log(user);
                    let { data } = await authApi().post(endpoints['update-user'], form, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });

                    let update_User = await authApi().get(endpoints['current-user'])
                    cookie.save('user', update_User.data);

                    console.log(update_User.data);
                    dispatch({
                        "type": "login",
                        "payload": update_User.data
                    });

                    Swal.fire(
                        'Thành công', "Cập nhật thành công!", 'success'
                    );

                    setUser(update_User.data);
                    setLoading(false);

                    console.log(current_user?.birthday)
                } catch (err) {
                    // if (err.request.responeText === "Cập nhật thành công!")
                    //     setErr("Cập nhật thành công");
                    // else if (err.request.responeText === "Số điện thoại đã được đăng ký!")
                    //     setErr("Số điện thoại đã được đăng ký!");
                    // else if (err.request.responeText === "Email đã được đăng ký!")
                    //     setErr("Email đã được đăng ký!");
                    // else
                    //     setErr("Có lỗi xảy ra!")
                    toast.error(err.request.responseText);
                    // console.log(err.request.status);
                    setLoading(false);
                }
                setCheckPersonalInfo(!checkPersonalInfo);
            } catch (error) {
                console.log(error)
            }
        }
        process();
    }

    const updateAvatar = (avatar) => {
        console.log(avatar[0]);
        setCurrent_avatar(avatar[0]);
    }

    // const updateBirthDate = (birthday) => {
    //     setBirthday(formattedDate)
    // }

    const change = (evt, field) => {
        // setUser({...user, [field]: evt.target.value})
        setUser(current => {
            return { ...current, [field]: evt.target.value }
        })
    }

    // const birthDateChange = (evt, field) => {
    //     setUser(current => {
    //         return { ...current, [field]: evt.target.value }
    //     }
    // };

    // console.log(current_user)

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
            // setEmail(evt.target.value);
            change(evt, "email")
        }
    }

    return <>
        <div className="PersonalPage_Wrapper">
            <div className="PersonalPage">
                {/* <div className="PersonalPage_Left">
                    <div className="PersonalPage_Left_Content">
                        <UserMenu />
                    </div>
                </div> */}
                <div className="PersonalPage_Right">
                    {checkPersonalInfo === true ?
                        <>
                            <section>
                                <div className="PersonalPage_Right_Header"><h2 className="text-center">Thông tin cá nhân của {current_user?.firstname}</h2></div>
                                <div className="PersonalPage_Right_Content">
                                    <div className="Personal_Avatar">
                                        {current_avatar === null ? <>
                                            <div className="user_Avatar"><Image src={avatar_user} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="Not Found" rounded /></div>
                                        </> : <>
                                            <div className="user_Avatar"><Image src={current_user?.avatar} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="Avatar" rounded /></div>
                                        </>}
                                        <Form.Control className="avatar_input" accept=".jpg, .jpeg, .png, .gif, .bmp" style={{ width: "10%", marginLeft: 'auto', marginRight: 'auto' }} onChange={(e) => updateAvatar(e.target.files)} type="file" ref={avatar} />
                                    </div>
                                    <div className="Personal_LastName">
                                        <Form.Label style={{ width: "30%" }}>Họ và tên đệm</Form.Label>
                                        <Form.Control value={current_user?.lastname} type="text" disabled />
                                    </div>
                                    <div className="Personal_FirstName">
                                        <Form.Label style={{ width: "30%" }}>Tên</Form.Label>
                                        <Form.Control value={current_user?.firstname} type="text" disabled />
                                    </div>
                                    <div className="Personal_Email">
                                        <div>
                                            <Form.Label style={{ width: "30%" }}>Email</Form.Label>
                                            <Form.Control value={current_user?.email} type="email" disabled />
                                        </div>
                                    </div>
                                    <div className="Personal_Gender">
                                        <Form.Label style={{ width: "30%" }}>Giới tính</Form.Label>
                                        <Form.Control value={current_user?.gender === true ? "Nam" : "Nữ"} type="Text" disabled />
                                    </div>
                                    <div className="Personal_Birthday">
                                        <Form.Label style={{ width: "30%" }}>Ngày sinh</Form.Label>
                                        {current_user?.birthday === null ? <>
                                            <Form.Control value="Thiết lập ngày sinh" type="Text" disabled />
                                        </> : <>
                                            <Form.Control value={formattedBirthday} type="Text" disabled />
                                        </>}
                                    </div>
                                    <div className="Change_Button">
                                        <button type="button" onClick={updateClick}>Thay đổi thông tin</button>
                                    </div>
                                </div>
                            </section>
                        </> : <>
                            <section>
                                <div className="PersonalPage_Right_Header"><h2 className="text-center">Thông tin cá nhân của {current_user?.firstname}</h2></div>
                                <div className="PersonalPage_Right_Content">
                                    <div className="Personal_Avatar">
                                        {current_avatar === null ? <>
                                            <div className="user_Avatar"><Image src={avatar_user} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="Not Found" rounded /></div>
                                        </> : <>
                                            <div className="user_Avatar"><Image src={current_user?.avatar} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="Avatar" rounded /></div>
                                        </>}
                                        <Form.Control className="avatar_input" accept=".jpg, .jpeg, .png, .gif, .bmp" style={{ width: "10%", marginLeft: 'auto', marginRight: 'auto' }} onChange={(e) => updateAvatar(e.target.files)} type="file" ref={avatar} />
                                    </div>
                                    <div className="Personal_LastName">
                                        <Form.Label style={{ width: "30%" }}>Họ và tên đệm</Form.Label>
                                        <Form.Control defaultValue={current_user?.lastname} onChange={(e) => change(e, "lastname")} type="text" placeholder="Họ và tên đệm" required />
                                    </div>
                                    <div className="Personal_FirstName">
                                        <Form.Label style={{ width: "30%" }}>Tên</Form.Label>
                                        <Form.Control defaultValue={current_user?.firstname} onChange={(e) => change(e, "firstname")} type="text" placeholder="Tên" required />
                                    </div>
                                    <div className="Personal_Email">
                                        <div>
                                            <Form.Label style={{ width: "30%" }}>Email</Form.Label>
                                            <Form.Control defaultValue={current_user?.email === null ? "" : current_user?.email} onChange={(e) => validateEmail(e)} type="email" placeholder="Email" required id="emailInput" />
                                        </div>
                                        <p id="errorMsg" style={{ color: 'red', display: 'none' }}>Email không hợp lệ</p>
                                    </div>
                                    <div className="Personal_Gender">
                                        <Form.Label style={{ width: "22%" }}>Giới tính</Form.Label>
                                        <div className="Personal_Gender_Tick">
                                            {current_user?.gender === true ? <>
                                                <Form.Check type="radio" label="Nam" name="radioOption" defaultChecked onChange={() => setGender(true)} />
                                                <Form.Check type="radio" label="Nữ" name="radioOption" onChange={() => setGender(false)} />
                                            </> : <>
                                                <Form.Check type="radio" label="Nam" name="radioOption" onChange={() => setGender(true)} />
                                                <Form.Check type="radio" label="Nữ" name="radioOption" defaultChecked onChange={() => setGender(false)} />
                                            </>}
                                        </div>
                                    </div>
                                    <div className="Personal_Birthday">
                                        <Form.Label style={{ width: "30%" }}>Ngày sinh</Form.Label>
                                        <input type="date" defaultValue={formattedDateTime} id="dateInput" />
                                    </div>
                                    <div className="Update_Button">
                                        <button type="button" onClick={updateClick}>Hủy</button>
                                        <button type="button" onClick={updateUser}>Cập nhật thông tin</button>
                                    </div>
                                </div>
                            </section>
                        </>}
                </div>
            </div>
        </div>
    </>
}

export default Personal;