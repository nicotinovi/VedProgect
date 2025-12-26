import React, { useState } from 'react';
import axios from "../../../config/axios";
import { Navigate, Link } from 'react-router-dom';

function AddTeacher() {
    const [name, setName] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("/addTeacher", { name })
            .then(() => setSubmitted(true))
            .catch(e => alert("Ошибка: " + e));
    };

    if (submitted) return <Navigate to="/listTeachers" />;

    return (
        <div className="edit-form">
            <h2>Новый преподаватель</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="ФИО преподавателя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <div className="action-buttons">
                    <Link to="/listTeachers"><button type="button">Отмена</button></Link>
                    <button type="submit">Создать</button>
                </div>
            </form>
        </div>
    );
}

export default AddTeacher;