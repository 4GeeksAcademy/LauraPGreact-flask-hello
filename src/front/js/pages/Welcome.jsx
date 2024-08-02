import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext"; 

export const Welcome = () => {
    const { store } = useContext(Context); 
    const navigate = useNavigate();

    useEffect(() => {
        if (!store.token) {
            navigate('/'); 
        }
    }, [store.token, navigate]);

    return (
        <>
            <h2>Welcome</h2>
        </>
    );
};

