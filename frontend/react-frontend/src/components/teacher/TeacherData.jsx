import React, { useState, useEffect } from 'react';
import axios from "../../../config/axios";
import { Navigate, useParams, Link } from 'react-router-dom';

function TeacherData() {
    const { id } = useParams();
    const [teacher, setTeacher] = useState({ name: "" });
    const [allDisciplines, setAllDisciplines] = useState([]); // Все существующие дисциплины
    const [teacherDisciplines, setTeacherDisciplines] = useState([]); // Дисциплины этого преподавателя
    const [selectedDiscipline, setSelectedDiscipline] = useState(""); // Выбранная в селекте
    const [submitted, setSubmitted] = useState(false);

    // Загрузка данных
    const fetchData = () => {
        // 1. Данные преподавателя
        axios.get("/teacher/" + id).then(res => setTeacher(res.data));
        
        // 2. Все дисциплины (для выпадающего списка)
        axios.get("/listDisciplines").then(res => {
            setAllDisciplines(res.data);
            if(res.data.length > 0) setSelectedDiscipline(res.data[0].id);
        });

        // 3. Связи (TeacherDiscipline)
        axios.get("/listTeacherDisciplines").then(res => {
            // Фильтруем только те, что относятся к текущему учителю
            const myDisciplines = res.data.filter(td => td.teacher_id == id);
            setTeacherDisciplines(myDisciplines);
        });
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    // Обновление имени
    const handleUpdate = (e) => {
        e.preventDefault();
        axios.post("/updateTeacher/" + id, { name: teacher.name })
            .then(() => setSubmitted(true))
            .catch(e => console.log(e));
    };

    // Удаление преподавателя
    const handleDelete = () => {
        if(window.confirm("Удалить преподавателя?")) {
            axios.post("/deleteTeacher/" + id)
                .then(() => setSubmitted(true));
        }
    };

    // Добавление дисциплины преподавателю
    const addDisciplineToTeacher = () => {
        // Проверка: есть ли уже такая дисциплина у него?
        const exists = teacherDisciplines.find(td => td.discipline_id == selectedDiscipline);
        if (exists) {
            alert("Эта дисциплина уже назначена!");
            return;
        }

        axios.post("/addTeacherDiscipline", {
            teacher_id: id,
            discipline_id: selectedDiscipline
        }).then(() => {
            fetchData(); // Перезагружаем списки
        });
    };

    // Удаление дисциплины у преподавателя
    const removeDiscipline = (disciplineId) => {
        if(window.confirm("Убрать дисциплину у преподавателя?")) {
            axios.post(`/deleteTeacherDiscipline/teacher/${id}/discipline/${disciplineId}`)
                .then(() => {
                    fetchData();
                });
        }
    };

    if (submitted) return <Navigate to="/listTeachers" />;

    return (
        <div className="container">
            <div className="edit-form">
                <h2>Редактирование</h2>
                <form onSubmit={handleUpdate}>
                    <input 
                        type="text" 
                        value={teacher.name || ""} 
                        onChange={(e) => setTeacher({ ...teacher, name: e.target.value })}
                    />
                    <div className="action-buttons">
                        <button type="button" onClick={handleDelete} style={{backgroundColor: '#8b2e2e'}}>Удалить учителя</button>
                        <button type="submit">Сохранить имя</button>
                    </div>
                </form>
            </div>

            <div style={{ marginTop: "40px", textAlign: 'left', maxWidth: '600px', margin: '40px auto' }}>
                <h3>Ведет дисциплины:</h3>
                
                {/* Список текущих дисциплин */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
                    {teacherDisciplines.map(td => (
                        <div key={td.id} style={{ 
                            padding: '10px', 
                            background: '#333', 
                            borderRadius: '8px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '10px' 
                        }}>
                            <span>{td.discipline ? td.discipline.name : "Загрузка..."}</span>
                            <button 
                                onClick={() => removeDiscipline(td.discipline_id)}
                                style={{ padding: '2px 8px', fontSize: '12px', background: '#8b2e2e' }}
                            >
                                X
                            </button>
                        </div>
                    ))}
                    {teacherDisciplines.length === 0 && <p style={{color: '#777'}}>Нет назначенных дисциплин</p>}
                </div>

                {/* Форма добавления дисциплины */}
                <div style={{ padding: '20px', background: '#1a1a1a', borderRadius: '12px', border: '1px solid #333' }}>
                    <h4>Назначить дисциплину:</h4>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <select 
                            value={selectedDiscipline} 
                            onChange={(e) => setSelectedDiscipline(e.target.value)}
                        >
                            {allDisciplines.map(d => (
                                <option key={d.id} value={d.id}>{d.name}</option>
                            ))}
                        </select>
                        <button onClick={addDisciplineToTeacher}>Добавить</button>
                    </div>
                </div>
            </div>

            <div style={{marginTop: '20px'}}>
                 <Link to="/listTeachers">← Назад к списку</Link>
            </div>
        </div>
    );
}

export default TeacherData;