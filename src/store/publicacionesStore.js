import { Preferences } from '@capacitor/preferences';
import { useState } from 'react';

const publicacionStore = () => {
    const PUBLICACION_KEYS = 'publicacion-keys';

    const setPublicacion = async (id, valor) => {
        await Preferences.set({
            key: `publicacion-${id}`,
            value: JSON.stringify(valor),
        });

        // Update the list of keys
        const keys = await getPublicacionKeys();
        if (!keys.includes(id)) {
            keys.push(id);
            await Preferences.set({
                key: PUBLICACION_KEYS,
                value: JSON.stringify(keys),
            });
        }
    };

    const getPublicacion = async (id) => {
        const { value } = await Preferences.get({ key: `publicacion-${id}` });
        return value ? JSON.parse(value) : null;
    };

    const getPublicaciones = async () => {
        const keys = await getPublicacionKeys();
        const publicaciones = [];
        for (const key of keys) {
            const publicacion = await getPublicacion(key);
            if (publicacion) {
                publicaciones.push(publicacion);
            }
        }
        return publicaciones;
    };

    const getPublicacionKeys = async () => {
        const { value } = await Preferences.get({ key: PUBLICACION_KEYS });
        return value ? JSON.parse(value) : [];
    };

    const removePublicacionKey = async (id) => {
        await Preferences.remove({ key: `publicacion-${id}` });

        // Update the list of keys
        const keys = await getPublicacionKeys();
        const newKeys = keys.filter(key => key !== id);
        await Preferences.set({
            key: PUBLICACION_KEYS,
            value: JSON.stringify(newKeys),
        });
    };

    return {
        setPublicacion,
        getPublicacion,
        getPublicaciones,
        removePublicacionKey,
    };
};

export default publicacionStore;
