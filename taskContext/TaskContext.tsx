"use client"
import { getAPI } from '@/services/fetchAPI';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// Create the context
const TaskContext = createContext();

// Create a provider component
export const TaskProvider = ({ children }) => {

    const [data, setData] = useState([]);
 

    useEffect(() => {
        const fetchData = async () => {
           try {
               const allData = await getAPI('/other/dataUpdateChecker');
               if (allData.error) {
                   throw new Error(allData.error); 
               } 
               setData(allData.data);
               toast.success('Tasks have been loaded successfully.'); 
           } catch (error) {
              
           }
        };

        fetchData(); 
      
    }, []);

    return (
        <TaskContext.Provider value={{ data, setData }}>
            {children}
        </TaskContext.Provider>
    );
};

// Create a custom hook for easier access to the context
export const useTasks = () => {
    return useContext(TaskContext);
};
