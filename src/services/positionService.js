import axios from "axios"

// const API_KEY = import.meta.env.API_KEY_OPEN_WEATHER;
const API_KEY='ca91f278180de2526c359dbcb495dd24';

export const getCity = async (lat,lng) => {
    const query = await axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lng}&limit=5&appid=${API_KEY}`)
    if (query){
      const first = query.data[0]
      return first.name+","+first.state
    }
    return 'Fail'
}