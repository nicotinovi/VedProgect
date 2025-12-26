import React, { useState, useEffect } from 'react';
import axios from "../../../config/axios"; // Используем общий конфиг axios
import { Navigate, useParams, Link } from 'react-router-dom';

function DisciplineData() {
    const { id } = useParams();
    const [discipline, setDiscipline] = useState({
        id: id,
        name: ""
    });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (!id) return;
        
        axios.get("/discipline/" + id)
            .then(response => {
                setDiscipline(prev => ({
                    ...prev,
                    name: response.data.name
                }));
            })
            .catch(e => console.log(e));
    }, [id]);

    function handleChange(event) {
        setDiscipline({
            ...discipline,
            name: event.target.value
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        axios.post("/updateDiscipline/" + discipline.id, { name: discipline.name })
            .then(() => setSubmitted(true))
            .catch(e => console.log(e));
    }

    function deleteDiscipline() {
        if(window.confirm("Вы уверены, что хотите удалить эту дисциплину?")) {
            axios.post("/deleteDiscipline/" + discipline.id)
                .then(() => setSubmitted(true))
                .catch(e => console.log(e));
        }
    }

    if (submitted) {
        return <Navigate to="/listDisciplines" />;
    }

    return (
        <div className="container">
            <div className="edit-form">
                <h2>Редактирование дисциплины</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="name" 
                        value={discipline.name || ""} 
                        placeholder="Наименование дисциплины" 
                        onChange={handleChange}
                    />
                    
                    <div className="action-buttons">
                        <button 
                            type="button" 
                            onClick={deleteDiscipline} 
                            style={{ backgroundColor: '#8b2e2e' }}
                        >
                            Удалить
                        </button>
                        <button type="submit">
                            Сохранить
                        </button>
                    </div>
                </form>
            </div>
            
            <div style={{ marginTop: '20px' }}>
                 <Link to="/listDisciplines">← Назад к списку</Link>
            </div>
        </div>
    );
}

export default DisciplineData;