import './PrescriptionHistory.css'
import reminder from "../../assets/images/reminder.png"
import { useContext, useEffect, useState } from "react";
import { BookingManagementContext, UserContext } from "../../App";
import { authApi, endpoints } from '../../configs/Apis';

const PrescriptionHistory = () => {
    const [current_user, dispatch] = useContext(UserContext);
    const [booking,] = useContext(BookingManagementContext);

    const [listPrescription, setListPrescription] = useState([]);

    useEffect(() => {
        const loadPrescriptionHistory = async () => {
            try {
                console.log(booking.profilePatientId)
                let e = endpoints['search-prescriptions']
                e += `?profilePatientId=${booking.profilePatientId}`
                let res = await authApi().get(e)
                console.log(res.data.content)
                setListPrescription(res.data.content)
            } catch (error) {
                console.log(error)
            }
        }
        loadPrescriptionHistory()
    }, [])

    return (
        <>
            <div className='prescription_history_wrapper'>
                <div>
                    {listPrescription.length === 0 ?
                        <>
                            <div className="prescription_history_null">
                                <h5 className="mb-4">Bệnh nhân này chưa có đơn thuốc nào</h5>
                                <img src={reminder} alt="Not found" width={'20%'} />
                            </div>
                        </> :
                        <>
                        </>}
                </div>
            </div>
        </>
    )
}

export default PrescriptionHistory;