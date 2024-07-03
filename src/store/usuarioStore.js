import { Preferences } from '@capacitor/preferences';
import { useState } from 'react';


const usuarioStore = () => {
    
    const setUser = async (valor) => {
        await Preferences.set({
          key: 'user_credential',
          value:  JSON.stringify(valor),
        });
    };
    
    const getUser = async () => {
        const { value } = await Preferences.get({ key: 'user_credential' });
        const userCredential = JSON.parse(value);
        return userCredential
    };
    
    const removeUserKey = async () => {
        await Preferences.remove({ key: 'user_credential' });
    };

    return {
        setUser,getUser,removeUserKey
    }
}
export default usuarioStore


