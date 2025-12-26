import React, { useState, useEffect } from 'react';
import axios from "../../../config/axios";

function ListReportTypes() {
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState("Экзамен"); // Значение по умолчанию
    
    // Состояние для отображения формы
    const [showForm, setShowForm] = useState(false);

    // Стандартные варианты
    const standardTypes = [
        "Экзамен",
        "Зачет",
        "Дифференцированный зачет",
        "Курсовая работа",
        "Курсовой проект",
        "Практика"
    ];

    const loadTypes = () => {
        axios.get("/listReportTypes")
            .then(res => setTypes(res.data))
            .catch(e => console.log(e));
    };

    useEffect(() => {
        loadTypes();
    }, []);

    const handleAdd = (e) => {
        e.preventDefault();
        // Проверяем, нет ли уже такого типа
        if (types.find(t => t.name === selectedType)) {
            alert("Такой вид контроля уже есть!");
            return;
        }

        axios.post("/addReportType", { name: selectedType })
            .then(() => {
                loadTypes();
                setShowForm(false); // Скрываем форму после успешного добавления
            })
            .catch(e => alert("Ошибка добавления"));
    };

    const handleDelete = (id) => {
        if(window.confirm("Удалить этот вид контроля?")) {
            axios.post("/deleteReportType/" + id).then(() => loadTypes());
        }
    };

    return (
        <div>
            <h2>Виды контроля</h2>
            
            {/* Кнопка открытия формы */}
            {!showForm && (
                <button onClick={() => setShowForm(true)} style={{ marginBottom: '20px' }}>
                    + Добавить вид контроля
                </button>
            )}
            
            {/* Выпадающая форма добавления */}
            {showForm && (
                <div className="edit-form" style={{ maxWidth: '500px', margin: '0 auto 20px auto', padding: '20px' }}>
                    <form onSubmit={handleAdd} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        
                        <select 
                            value={selectedType} 
                            onChange={(e) => setSelectedType(e.target.value)}
                            style={{ flex: 1, margin: 0 }}
                        >
                            {standardTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>

                        <button type="submit" style={{ backgroundColor: '#2d5e2e' }}>
                            Добавить
                        </button>
                        <button type="button" onClick={() => setShowForm(false)} style={{ backgroundColor: '#8b2e2e' }}>
                            Отмена
                        </button>
                    </form>
                </div>
            )}

            {/* Список */}
            <div className="list-grid">
                {types.map(t => (
                    <div key={t.id} className="card-item" style={{ 
                        flexDirection: 'row', 
                        justifyContent: 'space-between',
                        padding: '15px 25px',
                        borderLeft: '5px solid #646cff' // Красивая полоска слева
                    }}>
                        <span style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{t.name}</span>
                        <button onClick={() => handleDelete(t.id)} style={{ backgroundColor: '#8b2e2e', padding: '5px 12px' }}>
                            Удалить
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListReportTypes;