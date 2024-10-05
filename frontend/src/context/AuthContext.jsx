// employeeContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // { role: 'superadmin' } or { role: 'employee' }

    const loginSuperAdmin = () => {
        setUser({ role: 'superadmin' });
        localStorage.setItem('superadmin', 'true'); // Optional, but can be useful
        localStorage.removeItem('employee')

    };

    const loginEmployee = () => {
        setUser({ role: 'employee' });
        localStorage.setItem('employee', 'true'); // Optional
        localStorage.removeItem('superadmin'); // Clean up\

    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('superadmin'); // Clean up\
        localStorage.removeItem('employee')
    };

    return (
        <AuthContext.Provider value={{ user, loginSuperAdmin, loginEmployee, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
