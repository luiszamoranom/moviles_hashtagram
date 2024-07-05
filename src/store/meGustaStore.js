import { Preferences } from '@capacitor/preferences';
import { useState } from 'react';


const meGustaStore = () => {
    const [isLike,setIsLike] = useState(false)
    const setMeGusta = async (id,valor) => {
        setIsLike(valor)
        await Preferences.set({
          key: `me-gusta-${id}`,
          value:  valor,
        });
    };
    
    const getMeGusta = async (id) => {
        const { value } = await Preferences.get({ key: `me-gusta-${id}` });
        //const meGusta = JSON.parse(value);
        return value
    };
    
    const removeMeGusta = async (id) => {
        await Preferences.remove({ key: `me-gusta-${id}` });
    };

    return {
        setMeGusta,getMeGusta,removeMeGusta,isLike
    }
}
export default meGustaStore


