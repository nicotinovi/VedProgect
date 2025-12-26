import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "../../../config/axios";

function ListDisciplines() {
    const [disciplines, setDisciplines] = useState([]);
    
    // Состояния для формы добавления
    const [showForm, setShowForm] = useState(false);
    const [newName, setNewName] = useState("");

    // Функция загрузки списка
    const loadDisciplines = () => {
        axios.get("/listDisciplines")
            .then(response => {
                setDisciplines(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        loadDisciplines();
    }, []);

    // Обработка добавления
    const handleAdd = (e) => {
        e.preventDefault();
        if (!newName.trim()) return;

        axios.post("/addDiscipline", { name: newName })
            .then(() => {
                setNewName(""); // Очищаем поле
                setShowForm(false); // Скрываем форму
                loadDisciplines(); // Обновляем список
            })
            .catch((e) => {
                console.log(e);
                alert("Ошибка при добавлении");
            });
    };

    return (
        <div>
            <h2>Учебные дисциплины</h2>
            
            {/* Кнопка открытия формы */}
            {!showForm && (
                <button onClick={() => setShowForm(true)} style={{ marginBottom: '20px' }}>
                    + Добавить дисциплину
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
                            placeholder="Название дисциплины"
                            autoFocus
                            style={{ margin: 0 }}
                        />
                        <button type="submit" style={{ backgroundColor: '#2d5e2e' }}>Добавить</button>
                        <button type="button" onClick={() => setShowForm(false)} style={{ backgroundColor: '#8b2e2e' }}>Отмена</button>
                    </form>
                </div>
            )}
            
            {/* Список дисциплин */}
            <div className="list-grid compact-grid">
                {disciplines.length > 0 ? (
                    disciplines.map((discipline) => (
                        <Link to={`/discipline/${discipline.id}`} key={discipline.id} className="card-item compact-card">
                            <div>
                                <h3 style={{ margin: 0, fontSize: '1.1em' }}>{discipline.name}</h3>
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

export default ListDisciplines;