import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "../../../config/axios";

function ListStudentGroups() {
    const [groups, setGroups] = useState([]);
    
    // Состояния для формы
    const [showForm, setShowForm] = useState(false);
    const [newName, setNewName] = useState("");

    // Загрузка списка
    const loadGroups = () => {
        axios.get("/listStudentGroups")
            .then(response => {
                setGroups(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        loadGroups();
    }, []);

    // Обработка добавления
    const handleAdd = (e) => {
        e.preventDefault();
        if (!newName.trim()) return;

        axios.post("/addStudentGroup", { name: newName })
            .then(() => {
                setNewName("");
                setShowForm(false);
                loadGroups(); // Обновляем список сразу после добавления
            })
            .catch((e) => {
                console.log(e);
                alert("Ошибка при создании группы");
            });
    };

    return (
        <div>
            <h2>Группы студентов</h2>
            
            {/* Кнопка открытия формы */}
            {!showForm && (
                <button onClick={() => setShowForm(true)} style={{ marginBottom: '20px' }}>
                    + Добавить группу
                </button>
            )}

            {/* Форма добавления */}
            {showForm && (
                <div className="edit-form" style={{ maxWidth: '400px', margin: '0 auto 20px auto', padding: '20px' }}>
                    <form onSubmit={handleAdd} style={{ display: 'flex', gap: '10px' }}>
                        <input 
                            type="text" 
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            placeholder="Название группы (например, 2362)"
                            autoFocus
                            style={{ margin: 0 }}
                        />
                        <button type="submit" style={{ backgroundColor: '#2d5e2e' }}>Добавить</button>
                        <button type="button" onClick={() => setShowForm(false)} style={{ backgroundColor: '#8b2e2e' }}>Отмена</button>
                    </form>
                </div>
            )}
            
            {/* Список групп */}
            <div className="list-grid compact-grid">
                {groups.length > 0 ? (
                    groups.map((group) => (
                        <Link to={`/studentGroup/${group.id}`} key={group.id} className="card-item compact-card">
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1.1em' }}>{group.name}</h3>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p style={{gridColumn: "1 / -1"}}>Список групп пуст...</p>
                )}
            </div>
        </div>
    );
}

export default ListStudentGroups;