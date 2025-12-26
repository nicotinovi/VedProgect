import React, { useState, useEffect } from 'react';
import axios from "../../../config/axios";
import { Navigate, useParams, Link } from 'react-router-dom';

function StudentGroupData() {
    const { id } = useParams();
    const [group, setGroup] = useState({ id: null, name: "" });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        axios.get("/studentGroup/" + id)
            .then(response => {
                setGroup(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }, [id]);

    const handleUpdate = (event) => {
        event.preventDefault();
        axios.post("/updateStudentGroup/" + id, { name: group.name })
            .then(() => {
                setSubmitted(true);
            })
            .catch(e => console.log(e));
    };

    const handleDelete = () => {
        if(window.confirm("Вы уверены? Все студенты этой группы могут быть удалены!")) {
            axios.post("/deleteStudentGroup/" + id)
                .then(() => {
                    setSubmitted(true);
                })
                .catch(e => console.log(e));
        }
    };

    if (submitted) {
        return <Navigate to="/listStudentGroups" />;
    }

    return (
        <div className="edit-form">
            <h2>Редактирование группы</h2>
            <form onSubmit={handleUpdate}>
                <input 
                    type="text" 
                    value={group.name || ""} 
                    placeholder="Название группы" 
                    onChange={(e) => setGroup({ ...group, name: e.target.value })}
                />
                <div className="action-buttons">
                    <button type="button" onClick={handleDelete} style={{backgroundColor: '#8b2e2e'}}>Удалить</button>
                    <button type="submit">Сохранить</button>
                </div>
            </form>
            <div style={{marginTop: '20px'}}>
                 <Link to="/listStudentGroups">← Назад к списку</Link>
            </div>
        </div>
    );
}

export default StudentGroupData;