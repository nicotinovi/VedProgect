import React, { useState, useEffect } from 'react';
import axios from "../../../config/axios";

function ListReportTypes() {
    const [types, setTypes] = useState([]);
    const [newName, setNewName] = useState("");

    // Функция загрузки данных
    const loadTypes = () => {
        axios.get("/listReportTypes")
            .then(res => setTypes(res.data))
            .catch(e => console.log(e));
    };

    useEffect(() => {
        loadTypes();
    }, []);

    // Добавление
    const handleAdd = (e) => {
        e.preventDefault();
        if(!newName) return;
        axios.post("/addReportType", { name: newName })
            .then(() => {
                setNewName("");
                loadTypes();
            })
            .catch(e => alert("Ошибка добавления"));
    };

    // Удаление
    const handleDelete = (id) => {
        axios.post("/deleteReportType/" + id)
            .then(() => loadTypes());
    };

    return (
        <div>
            <h2>Виды контроля (Зачет/Экзамен)</h2>
            
            {/* Форма добавления прямо здесь */}
            <div className="card-item" style={{ maxWidth: '400px', margin: '0 auto 20px auto' }}>
                <form onSubmit={handleAdd} style={{ display: 'flex', gap: '10px' }}>
                    <input 
                        type="text" 
                        placeholder="Название (напр. Экзамен)" 
                        value={newName}
                        onChange={e => setNewName(e.target.value)}
                        style={{ margin: 0 }}
                    />
                    <button type="submit">+</button>
                </form>
            </div>

            <div className="list-grid">
                {types.map(t => (
                    <div key={t.id} className="card-item" style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <span>{t.name}</span>
                        <button onClick={() => handleDelete(t.id)} style={{ backgroundColor: '#8b2e2e', padding: '5px 10px' }}>
                            X
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListReportTypes;