import React,{useState} from 'react'

const useAlert = () => {
    const [isOpenAlert,setIsOpenAlert] = useState(false)
    const [msgAlert,setMsgAlert] = useState('')
    const [severityAlert,setSeverityAlert] = useState('success')
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setIsOpenAlert(false);
    };

    return {
        isOpenAlert,setIsOpenAlert,
        msgAlert,setMsgAlert,
        severityAlert,setSeverityAlert,
        handleCloseAlert
    }
}

export default useAlert
