import React from "react";
import { Link } from "react-router-dom";

export const SignIn = () =>{

    return (
        <div>
            <div>
                <label for="name">Name</label>
                <input type="text" name="name"></input>
                <label for="lastName">Last Name</label>
                <input type="text" name="lastName"></input>
                <label for="email" >Email</label>
                <input type="email" name="email"></input>
                <label for="password">Password</label>
                <input type="password" name="password"></input>
                <label for="Repeatassword"> Repeat Password</label>
                <input type="password" name="repeatPassword"></input>
            </div>
            <div>
               <Link className="btn btn-datails">Sign In</Link> 
               <Link className="btn btn-datails">Create Account</Link>
            </div>
        </div>
    )
}