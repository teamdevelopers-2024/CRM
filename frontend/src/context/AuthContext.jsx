// employeeContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // { role: 'superadmin' } or { role: 'employee' }

    const loginSuperAdmin = () => {
        setUser({ role: 'superadmin' });
        localStorage.setItem('superadmin', 'true'); // Optional, but can be useful
    };

    const loginEmployee = (employeeId) => {
        setUser({ role: 'employee' });
        localStorage.setItem('employee', 'true'); // Optional
        localStorage.setItem("employeeId",employeeId)

    };

    const logout = (currentUser) => {
        setUser(null);
        if(currentUser == '/'){
            localStorage.removeItem('employee')
            localStorage.removeItem('employeeId')
        }else{
            localStorage.removeItem('superadmin'); // Clean up\
        }
    };

    return (
        <AuthContext.Provider value={{ user, loginSuperAdmin, loginEmployee, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
