import React, {useState} from "react";
import {Link, Navigate, useNavigate, Route} from 'react-router-dom';
import axios from 'axios';

const Registerscreen = (props) => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        error: null
    });
   
    
    //onChange događaj pri unosu name, email i password poziva ovu f-ju
    const handleChange = e => {
        setData({...data, [e.target.name]: e.target.value})
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); //da ne bi doslo do reload-a
        
        try {
            setData({...data, error:null})
            await axios.post('/auth/register',{name, email, password},{ headers:{
                "Content-type": "application/json"
            }})
           //  history.push("/login"); //prebaci nas na loginscreen //ovo ne radi
           window.open('/login') //prebaci nas na login screen
        } catch (err) {
            setData({...data, error: err.response.data.error})
        }

    };
    const {name, email, password, error} = data; //destructuring
    return (
        <div className=" container form mt-5 w-50">
            <h4 className="text-muted text-center mb-5" >Create an account</h4>

            <div className="card p-5 shadow">
                <form>
                    <div className="mb-3">
                        <label htmlFor="name">Name</label>
                        <input className="form-control" type="name" name="name" value={name} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <input className="form-control" type="email" name="email" value={email} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">Password</label>
                        <input className="form-control" type="password" name="password" value={password} onChange={handleChange} />
                    </div>
                    {error ? (<p className="text-danger">{error}</p>):null}
                    <div className="text-center">
                        <button className="btn btn-primary mt-3" onClick={handleSubmit}>Register</button>
                    </div>
                    <p className="mt-3 text-center">
                        Already a user? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>

        </div>
    )
}

export default Registerscreen