import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const Homescreen = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    //pozivacemo ovu f-ju svaki put kada je homescreen is mounted, zato koristimo useEffect
    const getUser = async() => {
        const res = await axios.get('/auth', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}` //na bekendu u middleware-u je podeseno da ide Bearer(tj neka rijec) pa razmak pa token
            }
        }) //url je samo /auth jer je na bekendu protected ruta samo '/'
        setUser(res.data)
    }
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            
            navigate("/login");
         }
        getUser();
    },[])

    const logout = () => {
        localStorage.removeItem('token');
        
        navigate("/login");
    }
  
    return (
        <div className="mt-5 container w-50 bg-dark text-light p-5">
            <div className="container bg-dark p-5">
                <p className="lead"><b>Welcome {user && user.name}</b></p>
                {user && (<button className="btn btn-danger" onClick={logout}>Logout</button>)}
                

            </div>
        </div>
    );
}

export default Homescreen