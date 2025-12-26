import { useState } from "react";
import axios from "../../../config/axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/auth/register", {
                username,
                password
            });

            localStorage.setItem("token", res.data.token);
            navigate("/listDisciplines");

        } catch (err) {
            console.log(err);
            alert(err.response?.data?.message || "Ошибка регистрации");
        }
    };

    return (
        <form onSubmit={handleRegister} style={{ maxWidth: 300 }}>
            <h2>Регистрация</h2>

            <input
                placeholder="Имя пользователя"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Создать аккаунт</button>
            <Link to={'/login'}><button>Логин</button></Link>
        </form>
    );
}

export default Register;