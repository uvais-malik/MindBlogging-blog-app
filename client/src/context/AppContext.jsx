import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import toast from "react-hot-toast";

// API call
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({ children })=>{

    const navigate = useNavigate()

    const [token, setToken] = useState(null)
    const [blogs, setBlogs] = useState([])
    const [input, setInput] = useState("")

    // getting blogs data from database
    const fetchBlogs = async ()=>{
        try {
            const {data} = await axios.get('/api/blog/all');
            data.success ? setBlogs(data.blogs) : toast.error(data.message)
            
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        fetchBlogs();
        const localToken = localStorage.getItem('token')
        if(localToken){
            setToken(localToken)
            axios.defaults.headers.common['Authorization'] = `Bearer ${localToken}`;
        }
        // if(localToken){
        //     setToken(localToken)
        //     axios.defaults.headers.common['Authorization'] = `${localToken}`;
        // }


    },[])

    const value = {
        axios, navigate, token, setToken, blogs, setBlogs, input, setInput
    }

    return (
      <AppContext.Provider value={value}>
          {children}
      </AppContext.Provider>
    )
}

export const useAppContext = ()=>{
    return useContext(AppContext)
};