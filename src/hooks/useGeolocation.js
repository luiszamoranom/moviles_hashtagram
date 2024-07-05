import { Geolocation } from '@capacitor/geolocation';
import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';

const useGeolocation = () => {
    const [position, setPosition] = useState(null);
    const [error, setError] = useState(null);

    const getPosition = async () => {
        try {
            const permission = await Geolocation.requestPermissions();
            if (permission.location === 'granted') {
                const coordinates = await Geolocation.getCurrentPosition();
                setPosition(coordinates);
                return coordinates;
            } else {
                throw new Error('Geolocation permission not granted');
            }
        } catch (err) {
            setError(err.message);
            console.error('Error getting geolocation', err);
            return null;
        }
    };

    useEffect(() => {
        if (Capacitor.isNative) {
            getPosition();
        }
    }, []);

    return {
        position,
        error,
        getPosition
    }
}

export default useGeolocation;
