import { useNavigate } from "react-router-dom";

function Vista2(){
    const navigate = useNavigate();

    const handleNavigateVista2 = () => {
        navigate("/vista1")
    }
    return (
        <>
            <h1>Vista 2</h1>

            <button onClick={handleNavigateVista2}>
                Navegar a vista inicial
            </button>
        </>
    )
}

export default Vista2;