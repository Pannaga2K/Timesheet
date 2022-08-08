import {useState, useEffect} from "react";
import './Timesheet.css';
import axios from "../axios";
import { useParams } from 'react-router-dom';

function Timesheet() {

	const [usersTimesheet, setUsersTimesheet] = useState([]);
    const [usersAttendance, setUsersAttendance] = useState([]);
    const [usersRemarks, setUsersRemarks] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(0);
    const [isEditable, setIsEditable] = useState(false);
    const {userId} = useParams();

    console.log(userId);

    useEffect(() => {
        // CALL UPDATE METHOD WHENEVER ATTENDANCE/REMARKS CHANGES
        axios.get(`users/${userId}`).then((res) => {
            if(res) {
                setUsersTimesheet(res.data);
                setUsersAttendance(JSON.parse(res.data[0].attendance));
                setUsersRemarks(JSON.parse(res.data[0].remarks));
                setCurrentUserId(res.data[0].userId);
            }
            console.log(res);
        });
    }, []);

    // console.log(usersRemarks);

    const updateAttendance = (e, index) => {
        setUsersAttendance((oldState) => {
            if(index == 0 && e.target.name == `attendance-${index}` ) {
                // return ([...oldState.splice(index, 1, e.target.value), ...oldState]);
                return ([oldState.splice(index, 1, e.target.value)[0], ...oldState.slice(index + 1)]);
            } else if (index+1 == usersTimesheet[0].days) {
                return ([...oldState.slice(0, index), oldState.splice(index, 1, e.target.value)[0]]);
            } else {
                return ([...oldState.slice(0, index), oldState.splice(index, 1, e.target.value)[0], ...oldState.slice(index + 1)]);
            }
            // return oldState;
        })
    }

    const updateRemarks = (e, index) => {
        setUsersRemarks((oldState) => {
            if(index == 0 && e.target.name == `remarks-${index}` ) {
                return ([oldState.splice(index, 1, e.target.value)[0], ...oldState.slice(index + 1)]);
            } else if (index+1 == usersTimesheet[0].days) {
                return ([...oldState.slice(0, index), oldState.splice(index, 1, e.target.value)[0]]);
            } else {
                return ([...oldState.slice(0, index), oldState.splice(index, 1, e.target.value)[0], ...oldState.slice(index + 1)]);
            }
            // return oldState;
        })
    }

    const toggleEdit = () => {
        let input = document?.getElementsByTagName("input");
        for(let v = 0; v < input.length; v++) {
            if (input[v]?.hasAttribute('readonly')) {
                input[v].removeAttribute('readonly');
                setIsEditable(true);
            }
        }
    }

    const submitTimesheet = () => {
        axios.post(`users/${userId}`, {attendance: usersAttendance, remarks: usersRemarks}).then((res) => {
            console.log(res);
        })
    }


	return (
		<div className="timesheet">
			<h1>TIMESHEET</h1>
            <div className="timesheet__main" >
                <div className="timesheet__card-header">
                    <p>ATTENDANCE</p>
                    <p>REMARKS</p>
                </div>
                <div className="timesheet__body" >
                    {usersAttendance?.map((uA, index) => (
                        <div className="timesheet__card" >
                            <p>Day {index+1}</p>
                            <div>
                                <div className="timesheet__attendance" >
                                    <input readOnly type="text" name={`attendance-${index}`} value={uA} onChange={(e) => updateAttendance(e, index)}  />
                                </div>
                                <div className="timesheet__remarks" >
                                    <input readOnly type="text" name={`remarks-${index}`} value={usersRemarks[index]} onChange={(e) => updateRemarks(e, index)} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="timesheet__buttons" >
                    {!isEditable ? <button onClick={() => toggleEdit()} >Update</button> : <button onClick={() => submitTimesheet()} >Submit</button>}
                </div>
            </div>
		</div>
	);
}

export default Timesheet;
