import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "../../../config/axios";

function ListTeachers() {
    const [teachers, setTeachers] = useState([]);
    
    // Состояния для формы добавления
    const [showForm, setShowForm] = useState(false);
    const [newName, setNewName] = useState("");

    // Загрузка списка
    const loadTeachers = () => {
        axios.get("/listTeachers")
            .then(res => setTeachers(res.data))
            .catch(e => console.log(e));
    };

    useEffect(() => {
        loadTeachers();
    }, []);

    // Обработка добавления
    const handleAdd = (e) => {
        e.preventDefault();
        if (!newName.trim()) return;

        axios.post("/addTeacher", { name: newName })
            .then(() => {
                setNewName("");
                setShowForm(false);
                loadTeachers(); // Обновляем список сразу
            })
            .catch(e => alert("Ошибка при добавлении преподавателя"));
    };

    return (
        <div>
            <h2>Преподаватели</h2>
            
            {/* Кнопка открытия формы */}
            {!showForm && (
                <button onClick={() => setShowForm(true)} style={{ marginBottom: '20px' }}>
                    + Добавить преподавателя
                </button>
            )}

            {/* Форма добавления (появляется при нажатии) */}
            {showForm && (
                <div className="edit-form" style={{ maxWidth: '400px', margin: '0 auto 20px auto', padding: '20px' }}>
                    <form onSubmit={handleAdd} style={{ display: 'flex', gap: '10px' }}>
                        <input 
                            type="text" 
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            placeholder="ФИО Преподавателя"
                            autoFocus
                            style={{ margin: 0 }}
                        />
                        <button type="submit" style={{ backgroundColor: '#2d5e2e' }}>Добавить</button>
                        <button type="button" onClick={() => setShowForm(false)} style={{ backgroundColor: '#8b2e2e' }}>Отмена</button>
                    </form>
                </div>
            )}
            
            {/* Список преподавателей */}
            <div className="list-grid">
                {teachers.length > 0 ? (
                    teachers.map((teacher) => (
                        <Link to={`/teacher/${teacher.id}`} key={teacher.id} className="card-item">
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1.1em' }}>{teacher.name}</h3>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p style={{gridColumn: "1 / -1"}}>Список пуст...</p>
                )}
            </div>
        </div>
    );
}

export default ListTeachers;