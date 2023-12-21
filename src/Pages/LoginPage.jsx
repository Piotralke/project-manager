import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../auth";
import { Navigate, useNavigate } from "react-router-dom";
const LoginPage = () => {
    const [loginData, setLoginData] = useState({ Email: "", Password: "" });
    const [registrationData, setRegistrationData] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
    });
    const [isLoginForm, setIsLoginForm] = useState(true);
    const auth = useAuth();
    const navigate = useNavigate();
    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleRegistrationChange = (e) => {
        const { name, value } = e.target;
        setRegistrationData({ ...registrationData, [name]: value });
    };

    const handleFormSwitch = () => {
        setLoginData({ Email: "", Password: "" });
        setRegistrationData({
            name: "",
            surname: "",
            email: "",
            password: "",
        })
        setIsLoginForm(!isLoginForm);
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5048/api/users/login", loginData);
            console.log("Login response:", response.data);
            await auth.setToken(response.data.token);
            navigate("/home");
        } catch (error) {
            console.error("Login error:", error.response.data);
            // Tutaj możesz dodać kod obsługujący błąd logowania
        }
    };
   

    const handleRegistrationSubmit = async (e) => {
        e.preventDefault();
        const { name, surname, email, password } = registrationData;
        const dataToSend = { name, surname, email, password, role: 1 };
        console.log(registrationData)
        try {
            const response = await axios.post("http://localhost:5048/api/users/register", dataToSend);
            console.log("Registration response:", response.data);
            // Tutaj możesz dodać kod obsługujący sukces rejestracji
        } catch (error) {
            console.error("Registration error:", error.response.data);
            // Tutaj możesz dodać kod obsługujący błąd rejestracji
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full p-6 space-y-6 bg-white rounded-md shadow-lg">
                <h1 className="text-2xl font-bold text-center">
                    {isLoginForm ? "Logowanie" : "Rejestracja"}
                </h1>
                <form onSubmit={isLoginForm ? handleLoginSubmit : handleRegistrationSubmit}>
                    {isLoginForm ? (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Adres e-mail</label>
                                <input
                                    type="text"
                                    name="Email"
                                    value={loginData.Email}
                                    onChange={handleLoginChange}
                                    className="mt-1 p-2 w-full border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Hasło</label>
                                <input
                                    type="password"
                                    name="Password"
                                    value={loginData.Password}
                                    onChange={handleLoginChange}
                                    className="mt-1 p-2 w-full border rounded-md"
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Imię</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={registrationData.name}
                                    onChange={handleRegistrationChange}
                                    className="mt-1 p-2 w-full border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nazwisko</label>
                                <input
                                    type="text"
                                    name="surname"
                                    value={registrationData.surname}
                                    onChange={handleRegistrationChange}
                                    className="mt-1 p-2 w-full border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="text"
                                    name="email"
                                    value={registrationData.email}
                                    onChange={handleRegistrationChange}
                                    className="mt-1 p-2 w-full border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Hasło</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={registrationData.password}
                                    onChange={handleRegistrationChange}
                                    className="mt-1 p-2 w-full border rounded-md"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Potwierdź hasło</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={registrationData.confirmPassword}
                                    onChange={handleRegistrationChange}
                                    className="mt-1 p-2 w-full border rounded-md"
                                />
                            </div>
                        </>
                    )}
                   <div className="flex items-center justify-between mt-4">
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                        >
                            {isLoginForm ? "Zaloguj się" : "Zarejestruj się"}
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <button
                        onClick={handleFormSwitch}
                        className="text-sm text-blue-500 hover:text-blue-700 focus:outline-none"
                    >
                        {isLoginForm ? "Przejdź do rejestracji" : "Przejdź do logowania"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;