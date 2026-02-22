import { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState(null);

    const showNotification = useCallback((message, type = 'success') => {
        setNotification({ id: Date.now(), message, type });
        // Auto-clear after 4 seconds
        setTimeout(() => {
            setNotification(null);
        }, 4000);
    }, []);

    const clearNotification = useCallback(() => {
        setNotification(null);
    }, []);

    return (
        <NotificationContext.Provider value={{ notification, showNotification, clearNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};
