import React, { useState } from 'react'

const useNavbar = () => {
    const [value, setValue] = useState(1);
    return {
        value,setValue
    }
}

export default useNavbar

//queda pendiente usar useContext:
// import React, { useState, createContext, useContext } from 'react';

// const NavbarContext = createContext();

// export const NavbarProvider = ({ children }) => {
//     const [value, setValue] = useState(1);
//     console.log(value);

//     return (
//         <NavbarContext.Provider value={{ value, setValue }}>
//             {children}
//         </NavbarContext.Provider>
//     );
// };

// export const useNavbar = () => {
//     return useContext(NavbarContext);
// };
