import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
const Loginscreen = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
        error: null
    });

    const navigate = useNavigate();

    const {email, password, error} = data;

    const handleChange = e => {
        setData({...data, [e.target.name]:e.target.value})
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            setData({...data, error:null})
         const res = await axios.post('/auth/login', {email, password}, {headers:{"Content-Type": "application/json"}})
            localStorage.setItem('token', res.data.token);//u slucaju uspješnog logovanja u localeStorage smještamo token
            navigate("/");
        } catch (err) {
            setData({...data, error: err.response.data.error}) 
        }
    };

    return (
        <div className="container form mt-5 w-50">
            <h4 className="text-center text-muted mb-5">Login</h4>
                <div className="card p-5 shadow">
                    <form>  
                        <div className="mb-2">
                            <label htmlFor="email">Email</label>
                            <input className="form-control" type="email" name="email" value={email} onChange={handleChange} ></input>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="password">Password</label>
                            <input className="form-control" type="password" name="password" value={password} onChange={handleChange}></input>
                        </div>
                        {error ? (<p className="text-danger">{error}</p>): null}
                        <div className="mb-2 text-center">
                            <button className="btn btn-primary" onClick={handleSubmit}>Login</button>
                            <p className="mt-3 text-center">Not a user? 
                                <Link to="/register" style={{textDecoration: 'none'}}> Register</Link>
                            </p>
                        </div>
                    </form>           
                </div>
        </div>
    )
}


export default Loginscreen