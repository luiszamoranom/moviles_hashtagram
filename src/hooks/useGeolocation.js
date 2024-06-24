import { Geolocation } from '@capacitor/geolocation';

const useGeolocation = () => {
    const getPosition = async () => {
        const coordinates = await Geolocation.getCurrentPosition();
        return coordinates;
    };
    return {
        getPosition
    }
}

export default useGeolocation
