import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const SignUp = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState(true);
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(()=>{
        actions.handValidation()
    },[])

    const createUser = async () => {
        try {
            await actions.addUser(email, password, name, lastName, isActive);
            // Espera un momento para que store.token se actualice
            if (store.validation) {
                navigate('/welcome');
            }
            else{
                alert("Debes rellenar todos los datos")
            }
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <div className="container-logup">
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" onChange={(e) => setName(e.target.value)} value={name} />
                <label htmlFor="lastName">Last Name</label>
                <input type="text" name="lastName" onChange={(e) => setLastName(e.target.value)} value={lastName} />
                <label htmlFor="email">Email</label>
                <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                <input type="checkbox" style={{ display: "none" }} aria-label="active" onChange={(e) => setIsActive(e.target.checked)} checked={isActive} />
            </div>
            <div className="container-button">
                <button className="button-validate" onClick={createUser}>Confirm</button>
                <Link className="button-cancel" to="/">Cancel</Link>
            </div>
            <div>
                Already have an account? <Link to="/">Login</Link>
            </div>
        </div>
    );
};
