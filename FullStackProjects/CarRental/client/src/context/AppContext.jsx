// @ts-nocheck
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/';

// Create the AppContext
export const AppContext = createContext();


// Provider component to wrap the application and provide context values
export const AppProvider = ({ children }) => {
    const navigate = useNavigate();
    const currency = import.meta.env.VITE_CURRENCY;

    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [pickupDate, setPickupDate] = useState('');
    const [returnDate, setReturnDate] = useState('');

    const [cars, setCars] = useState([]);

    // Theme State
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    // Toggle Theme
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    // Apply theme to document
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    // Function to check if the user is logged in
    const fetchUser = async () => {
        try {
            const { data } = await axios.get('/api/user/data')
            if (data.success) {
                setUser(data.user)
                setIsOwner(data.user.role === 'owner');
            }
            else {
                navigate('/'); // Redirect to home if not logged in
            }
        } catch (error) {
            toast.error(error.message);
        }
    }



    // function to fetch cars from the function: 
    const fetchCars = async () => {
        try {
            const { data } = await axios.get('/api/user/cars');
            data.success ? setCars(data.cars) : toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    }



    // function to log out the user:
    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setIsOwner(false);
        axios.defaults.headers.common['Authorization'] = '';
        toast.success('Logged out successfully');


    }


    // useEffect to retrieve the token from localStorage: 
    useEffect(() => {
        const token = localStorage.getItem('token');
        setToken(token);
        fetchCars(); // Fetch cars when the app loads
    }, []);


    // useEffect to fetch user data when the token is available: 
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `${token}`
            fetchUser();
        }
    }, [token])




    const value = {
        navigate, currency, axios, user, setUser, token, setToken, isOwner, setIsOwner, fetchUser, showLogin, setShowLogin,
        logout, fetchCars, cars, pickupDate, setPickupDate, returnDate, setReturnDate, setCars,
        theme, toggleTheme
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}