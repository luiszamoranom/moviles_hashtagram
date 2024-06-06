import axios from 'axios';
import { useEffect, useState } from 'react';

const api = axios.create( {
  baseURL: 'https://rickandmortyapi.com/api',
} );

const CharacterList = () => {
  const [ characters, setCharacters ] = useState( [] );
  const [ isLoading, setIsLoading ] = useState( true );
  const [ error, setError ] = useState( null );

  useEffect( () => {
    const fetchCharacters = async () => {
      setIsLoading( true );
      try {
        const response = await api.get( '/character' );
        setCharacters( response.data.results );
      } catch ( error ) {
        setError( error );
      } finally {
        setIsLoading( false );
      }
    };

    fetchCharacters();
  }, [] );

  if ( isLoading ) {
    return <div>Cargando...</div>;
  }

  if ( error ) {
    return <div>Error al obtener personajes: { error.message }</div>;
  }

  return (
    <ul>
      { characters.map( ( character ) => (
        <li key={ character.id }>
          { character.name }
        </li>
      ) ) }
    </ul>
  );
};

export default CharacterList;