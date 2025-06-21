// src/components/LoginModal/LoginModal.js
import React, { useState, useContext, useReducer } from "react";
import "./Login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import ErrorMessage from "../../../Core/Error/ErrorMessage";
import { UserContext } from "../Context/UserContext";

const Login = () => {

    const { login } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    const isRegister = location.state?.isRegister;
    const [errorMsg, setErrorMsg] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        password: "",
        age: "",
        email: "",
    });

    const handleChange = (e) => {
        console.log(e.value);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("start");
        console.log(formData.email);
        if (isRegister === true) {
            try {
                const res = await axios.post("http://localhost:5000/user", {
                    name: formData.name,
                    age: formData.age,
                    password: formData.password,
                    email: formData.email
                });
                console.log("dsadadas");
                console.log(res);
                if (res.status === 201) {
                    isRegister = false;
                    navigate("/login");
                }
            } catch (e) {
                console.log(e);
                console.log(e.response.data.message);

                if (e.response?.data?.message)
                    setErrorMsg(e.response.data?.message);
            }
        } else {
            try {
                console.log("before sending request");
                const res = await axios.post("http://localhost:5000/login", {
                    email: formData.email,
                    password: formData.password,
                });
                console.log(res);
                console.log("end");
                console.log(res.data.token);

                const userDecode = jwtDecode(res.data.token);
                localStorage.setItem('userId', userDecode.userId);
                localStorage.setItem('username',userDecode.name);
                
                console.log(localStorage.getItem('userId'));
          
                const res2 = await axios.get("http://localhost:5000/user/" + localStorage.getItem('userId'));
                console.log(res2);

                localStorage.setItem('username', res2.data.user[0].name);
                login(res2.data.user[0]);
                console.log(localStorage.getItem('username'));

                navigate('/home');

            } catch (e) {
                console.log(e);
                if (e.response?.data?.message)
                    setErrorMsg(e.response.data?.message);
            }
        }

    }
    return (
        <div className="modal-overlay">
            <div className="modal">
                <Link aria-label="Close" to="/home" className="close-btn">
                    <i className="fas fa-times"></i>
                </Link>
                <h2 className="modal-title">Welcome to Ancient Library</h2>
                <div className="tab-buttons">
                    <Link to="/login" className="tab active" state={{ isRegister: false }}>
                        Login
                    </Link>
                    <Link to="/login" className="tab active" state={{ isRegister: true }}>
                        Register
                    </Link>
                </div>
                <ErrorMessage message={errorMsg} onClose={() => setErrorMsg("")} />
                <form className="login-form" autoComplete="off" onSubmit={handleSubmit}>
                    {isRegister && (
                        <>
                            <label htmlFor="name">name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter your name"
                                onChange={handleChange}
                                value={formData.name}
                                required
                            />

                            <label htmlFor="age">Age</label>
                            <input
                                id="age"
                                name="age"
                                type="number"
                                placeholder="Enter your age"
                                onChange={handleChange}
                                value={formData.age}
                                required
                            />
                        </>
                    )}

                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" placeholder="Enter your email" onChange={handleChange} value={formData.email} required />
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" placeholder="Enter your password" onChange={handleChange} value={formData.password} required />
                    {
                        isRegister && (
                            <button type="submit" >Register</button>
                        )
                    }
                    {
                        !isRegister && (
                            <button type="submit">Login</button>
                        )
                    }
                    <p className="forgot">
                        {" "}
                        <a href="/login" className="reset-link">
                            Reset it
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
