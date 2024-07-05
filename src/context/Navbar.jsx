import React, { createContext, useContext, useState, useEffect } from 'react';
import { Preferences } from '@capacitor/preferences';

const NavbarContext = createContext();

export const NavbarProvider = ({ children }) => {
    const [valuePage, setValuePage] = useState(null); // Inicializar con null para diferenciar estado inicial
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPage = async () => {
            const { value } = await Preferences.get({ key: 'page' });
            if (value !== null) {
                setValuePage(parseInt(value));
            } else {
                setValuePage(1); // Valor predeterminado si no se encuentra en preferencias
            }
            setLoading(false);
        };
        fetchPage();
    }, []);

    const setPage = async (num_page) => {
        await Preferences.set({
            key: 'page',
            value: num_page.toString(),
        });
        setValuePage(num_page);
    };

    const getPage = async () => {
        const { value } = await Preferences.get({ key: 'page' });
        setValuePage(value ? parseInt(value) : 1);
    };

    const removePage = async () => {
        await Preferences.remove({ key: 'page' });
        setValuePage(1);  // Opción para reiniciar el valorPage al estado predeterminado
    };

    // -------------- LOGICA DEL WEBSOCKET ---

    const [ws, setWs] = useState(null);

    useEffect(() => {
        const newWs = new WebSocket('ws://34.41.29.202:4444');

        newWs.onopen = () => {
            console.log('Conexión WebSocket establecida');
            setWs(newWs);
        };

        newWs.onerror = (error) => {
            console.error('Error en la conexión WebSocket:', error);
        };

        return () => {
            newWs.close();
        };
    }, []);

    // Proporciona tanto la lógica de Navbar como el WebSocket
    return (
        <NavbarContext.Provider value={{ 
            setPage, 
            getPage, 
            removePage, 
            valuePage, 
            loading,
            ws // Agrega ws al contexto
        }}>
            {children}
        </NavbarContext.Provider>
    );
};

export const useNavbar = () => {
    return useContext(NavbarContext);
};
