import React, {useState, useEffect} from "react";
import axios from 'axios';
const Homescreen = () => {
    const [user, setUser] = useState(null);

    //pozivacemo ovu f-ju svaki put kada se homescreen is mounted, zato koristimo useEffect
    const getUser = async() => {
        const res = await axios.get('/auth', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}` //na bekendu u middleware-u je podeseno da ide Bearer(tj neka rijec) pa razmak pa token
            }
        }) //url je samo /auth jer je na bekendu protected ruta samo '/'
        setUser(res.data)
    }
    useEffect(()=>{
        getUser();
    },[])

    const logout = () => {
        localStorage.removeItem('token');
        window.open('/login');
    }
    if(!localStorage.getItem('token')){
        window.open('/login');
    }
    return (
        <div className="mt-5 container w-50 bg-dark text-light p-5">
            <div className="container bg-dark p-5">
                <p className="lead">Welcome {user && user.name}</p>
                {user && (<button className="btn btn-danger" onClick={logout}>Logout</button>)}
                

            </div>
        </div>
    );
}

export default Homescreen