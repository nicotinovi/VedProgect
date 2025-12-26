import React, { useState } from 'react';
import axios from "../../../config/axios";
import { Navigate, Link } from 'react-router-dom';

function AddStudentGroup() {
    const [name, setName] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("/addStudentGroup", { name })
            .then(() => {
                setSubmitted(true);
            })
            .catch((e) => {
                console.log(e);
                alert("Ошибка при создании группы");
            });
    };

    if (submitted) {
        return <Navigate to="/listStudentGroups" />;
    }

    return (
        <div className="edit-form">
            <h2>Добавление группы</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    placeholder="Название группы (например, ИВТ-21)"
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <div className="action-buttons">
                    <Link to="/listStudentGroups"><button type="button">Отмена</button></Link>
                    <button type="submit">Создать</button>
                </div>
            </form>
        </div>
    );
}

export default AddStudentGroup;