import { useState } from 'react';
import { obtenerPublicacionesPorHashtag } from '../../services/publicacionService';

export const usePhotosByHashtag = () => {
  
  const [state, setState] = useState({
    photos: [],
    isLoading: false,
    error: false
  })

  const getPhotosByHashtag = async (hashtag) => {
    setState( (prev) => ({ ...prev, isLoading: true }) );
    const response = await obtenerPublicacionesPorHashtag(hashtag);

    if (response.success) {
      setState({
        photos: response.data,
        isLoading: false,
        error: false
      })
    } else {
      setState({
        photos: [],
        isLoading: false,
        error: true
      })
    }
  }

  
  return {
    ...state,
    getPhotosByHashtag
  }
}