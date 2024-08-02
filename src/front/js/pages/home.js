import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const createToken = async () => {
        try {
            await actions.logIn(email, password);
            // Redirige solo si el login es exitoso
            if (store.token) {
                navigate('/welcome');
            }
        } catch (error) {
            console.error("Login failed", error);
        }
    };
    

    return (
        <div className="container-login">
            <div className="data-login">
                <label htmlFor="email">Email</label>
                <input type="text" name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} />
            </div>
            <div className="container-button">
                <button className="button-validate" onClick={createToken}>Login</button>
            </div>
            <div>
                Don't have an account? <Link to="/signUp">Sign Up</Link>
            </div>
        </div>
    );
};