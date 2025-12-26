import React, { useState, useEffect } from 'react';
import axios from "../../../config/axios";
import { Link } from 'react-router-dom';

function ListSessions() {
    // Данные сессий
    const [sessions, setSessions] = useState([]);
    
    // Данные для формы добавления
    const [groups, setGroups] = useState([]);
    const [reportTypes, setReportTypes] = useState([]);
    const [teacherDisciplines, setTeacherDisciplines] = useState([]); // Это список связок "Математика (Иванов)"

    // Состояние формы
    const [newSession, setNewSession] = useState({
        student_group_id: "",
        report_type_id: "",
        teacher_discipline_id: "",
        semester: 1,
        mark_date: new Date().toISOString().slice(0, 10) // Сегодняшняя дата
    });

    const [formVisible, setFormVisible] = useState(false);

    // Загрузка всех необходимых данных
    const fetchData = () => {
        // 1. Сессии
        axios.get("/listSessions").then(res => setSessions(res.data));
        // 2. Группы
        axios.get("/listStudentGroups").then(res => {
            setGroups(res.data);
            if(res.data.length > 0) setNewSession(s => ({...s, student_group_id: res.data[0].id}));
        });
        // 3. Виды контроля
        axios.get("/listReportTypes").then(res => {
            setReportTypes(res.data);
            if(res.data.length > 0) setNewSession(s => ({...s, report_type_id: res.data[0].id}));
        });
        // 4. Связки Преподаватель-Дисциплина
        axios.get("/listTeacherDisciplines").then(res => {
            setTeacherDisciplines(res.data);
            if(res.data.length > 0) setNewSession(s => ({...s, teacher_discipline_id: res.data[0].id}));
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreate = (e) => {
        e.preventDefault();
        axios.post("/addSession", newSession)
            .then(() => {
                setFormVisible(false);
                fetchData(); // Обновляем список
            })
            .catch(e => alert("Ошибка создания: " + e));
    };

    const handleDelete = (id) => {
        if(window.confirm("Удалить ведомость? Все оценки внутри будут удалены.")) {
            axios.post("/deleteSession/" + id).then(() => fetchData());
        }
    };

    return (
        <div>
            <h2>Сессии (Ведомости)</h2>
            
            {!formVisible && (
                <button onClick={() => setFormVisible(true)} style={{marginBottom: '20px'}}>
                    + Создать новую ведомость
                </button>
            )}

            {formVisible && (
                <div className="edit-form" style={{ marginBottom: '30px' }}>
                    <h3>Создание ведомости</h3>
                    <form onSubmit={handleCreate}>
                        <label>Группа:</label>
                        <select 
                            value={newSession.student_group_id}
                            onChange={e => setNewSession({...newSession, student_group_id: e.target.value})}
                        >
                            {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                        </select>

                        <label>Дисциплина и Преподаватель:</label>
                        <select 
                            value={newSession.teacher_discipline_id}
                            onChange={e => setNewSession({...newSession, teacher_discipline_id: e.target.value})}
                        >
                            {teacherDisciplines.map(td => (
                                <option key={td.id} value={td.id}>
                                    {td.discipline?.name} ({td.teacher?.name})
                                </option>
                            ))}
                        </select>

                        <label>Вид контроля:</label>
                        <select 
                            value={newSession.report_type_id}
                            onChange={e => setNewSession({...newSession, report_type_id: e.target.value})}
                        >
                            {reportTypes.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                        </select>
                        
                        <div style={{display: 'flex', gap: '10px'}}>
                            <div style={{flex: 1}}>
                                <label>Семестр:</label>
                                <input type="number" value={newSession.semester} onChange={e => setNewSession({...newSession, semester: e.target.value})} />
                            </div>
                            <div style={{flex: 1}}>
                                <label>Дата:</label>
                                <input type="date" value={newSession.mark_date} onChange={e => setNewSession({...newSession, mark_date: e.target.value})} />
                            </div>
                        </div>

                        <div className="action-buttons">
                            <button type="button" onClick={() => setFormVisible(false)}>Отмена</button>
                            <button type="submit">Создать</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="list-grid">
                {sessions.map(session => (
                    <div key={session.id} className="card-item" style={{ alignItems: 'flex-start', textAlign: 'left' }}>
                        <h3 style={{margin: '0 0 10px 0', color: '#646cff'}}>
                            {session.teacher_discipline?.discipline?.name}
                        </h3>
                        <p style={{margin: '5px 0'}}><strong>Группа:</strong> {session.student_group?.name}</p>
                        <p style={{margin: '5px 0'}}><strong>Преподаватель:</strong> {session.teacher_discipline?.teacher?.name}</p>
                        <p style={{margin: '5px 0'}}><strong>Тип:</strong> {session.report_type?.name} (Сем. {session.semester})</p>
                        <p style={{margin: '5px 0', fontSize: '0.9em', color: '#888'}}>{session.mark_date}</p>
                        
                        <div style={{marginTop: '15px', width: '100%', display: 'flex', gap: '10px'}}>
                            {/* Ссылку на оценки пока оставим пустой, реализуем в следующем шаге */}
                            <Link to={'/sessionMarks/' + session.id} style={{ flex: 1 }}>
                                <button style={{ width: '100%', backgroundColor: '#2d5e2e' }}>
                                    Открыть ведомость
                                </button>
                            </Link>
                            <button onClick={() => handleDelete(session.id)} style={{backgroundColor: '#8b2e2e'}}>Удалить</button>
                        </div>
                    </div>
                ))}
                {sessions.length === 0 && !formVisible && <p>Ведомостей пока нет.</p>}
            </div>
        </div>
    );
}

export default ListSessions;