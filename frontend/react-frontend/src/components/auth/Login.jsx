import { useState } from "react"
import {Link, useNavigate } from "react-router-dom";
import axios from "../../../config/axios";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/auth/login", {username, password});
            localStorage.setItem("token", res.data.token);
            navigate("/listDisciplines");
        }
        catch (err) {
            alert("Неверный логин или пароль")
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Логин</h2>
            <input value={username} onChange={e => setUsername(e.target.value)}></input>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}></input>
            <button type="submit">Войти</button>
            <Link to={'/register'}><button>Регистрация</button></Link>
        </form>
    );
}

export default Login;