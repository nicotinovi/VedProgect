import React, { useState, useEffect } from 'react';
import axios from "../../../config/axios";
import { Navigate, Link } from 'react-router-dom';

function AddStudent() {
    const [name, setName] = useState("");
    const [groupId, setGroupId] = useState("");
    const [groups, setGroups] = useState([]); // Список для выпадающего меню
    const [submitted, setSubmitted] = useState(false);

    // Загружаем список групп при открытии страницы
    useEffect(() => {
        axios.get("/listStudentGroups")
            .then(res => {
                setGroups(res.data);
                // Если группы есть, ставим первую по умолчанию
                if (res.data.length > 0) {
                    setGroupId(res.data[0].id);
                }
            })
            .catch(e => console.log(e));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            name: name,
            student_group_id: groupId
        };
        
        axios.post("/addStudent", data)
            .then(() => {
                setSubmitted(true);
            })
            .catch((e) => {
                console.log(e);
                alert("Ошибка добавления");
            });
    };

    if (submitted) {
        return <Navigate to="/listStudents" />;
    }

    return (
        <div className="edit-form">
            <h2>Добавление студента</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="ФИО студента"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                
                <div style={{ margin: "10px 0" }}>
                    <label style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>Выберите группу:</label>
                    <select 
                        value={groupId} 
                        onChange={(e) => setGroupId(e.target.value)}
                        required
                    >
                        {groups.map(group => (
                            <option key={group.id} value={group.id}>
                                {group.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="action-buttons">
                    <Link to="/listStudents"><button type="button">Отмена</button></Link>
                    <button type="submit">Добавить</button>
                </div>
            </form>
        </div>
    );
}

export default AddStudent;