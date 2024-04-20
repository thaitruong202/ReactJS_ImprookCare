import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./User.css";
import UserMenu from "../../layout/UserMenu/UserMenu";
import { UserContext } from "../../App";

const User = () => {
    const [current_user,] = useContext(UserContext);
    return <>
        <div className="User_Wrapper">
            <div className="User">
                <div className="User_Left">
                    <div className="User_Left_Content">
                        <UserMenu />
                    </div>
                </div>
                <div className="User_Right">
                    <Outlet />
                </div>
            </div>
        </div>
    </>
}

export default User;