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

    return (
        <NavbarContext.Provider value={{ setPage, getPage, removePage, valuePage, loading }}>
            {children}
        </NavbarContext.Provider>
    );
};

export const useNavbar = () => {
    return useContext(NavbarContext);
};
