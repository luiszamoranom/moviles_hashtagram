import { useNavigate } from "react-router-dom";
import CharacterList from "./CharacterList";

function Vista2(){
    const navigate = useNavigate();

    const handleNavigateVista2 = () => {
        navigate("/vista2")
    }
    return (
        <>
            <h1>Vista 1</h1>

            <button onClick={handleNavigateVista2}>
                Navegar a vista dos
            </button>

            <CharacterList/>
        </>
    )
}

export default Vista2;