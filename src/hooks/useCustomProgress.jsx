import { useState } from "react";

const useCustomProgress = () => {
    const [loading, setLoading] = useState(false);
    const handleClose = (event) => {
        if (reason === 'clickaway') {
          return;
        }
        setLoading(false);
    };
    return {
        loading,setLoading,handleClose
    }
}

export default useCustomProgress
