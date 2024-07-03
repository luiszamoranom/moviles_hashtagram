import { Preferences } from '@capacitor/preferences';
import { useState } from 'react';


const useNavbar = () => {
    const [valuePage,setValuePage] = useState(1)

    const setPage = async (num_page) => {
        console.log(num_page)
        await Preferences.set({
          key: 'page',
          value: num_page,
        });
        setValuePage(num_page)
    };
    
    const getPage = async () => {
        const { value } = await Preferences.get({ key: 'page' });
        setValuePage(value)
    };
    
    const removeName = async () => {
        await Preferences.remove({ key: 'name' });
    };

    return {
        setPage,getPage,removeName,valuePage
    }
}
export default useNavbar


