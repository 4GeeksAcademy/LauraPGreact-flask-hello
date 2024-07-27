import React from "react";
import { Link } from "react-router-dom";

export const SignIn = () =>{

    return (
        <div>
            <div>
                <label for="email" >Email</label>
                <input type="text" name="email"></input>
                <label for="password">Password</label>
                <input type="password" name="password"></input>
            </div>
            <div>
               <Link className="btn btn-datails">Sign In</Link> 
               <Link className="btn btn-datails">Sign Up</Link>
            </div>
        </div>
    )
}