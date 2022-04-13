import React, {useState} from "react";
import axios from 'axios';
const Loginscreen = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
        error: null
    });

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
            window.open('/')
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
                        </div>
                    </form>           
                </div>
        </div>
    )
}


export default Loginscreen