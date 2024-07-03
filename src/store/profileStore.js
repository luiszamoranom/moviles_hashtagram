import { Preferences } from '@capacitor/preferences';
import { useState } from 'react';


const profileStore = () => {
    
    const setProfile = async (id,valor) => {
        await Preferences.set({
          key: `profile-${id}`,
          value:  JSON.stringify(valor),
        });
    };
    
    const getProfile = async (id) => {
        const { value } = await Preferences.get({ key: `profile-${id}` });
        const userCredential = JSON.parse(value);
        return userCredential
    };
    
    const removeProfileKey = async (id) => {
        await Preferences.remove({ key: `profile-${id}` });
    };

    return {
        setProfile,getProfile,removeProfileKey
    }
}
export default profileStore


