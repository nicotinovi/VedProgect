import React, { useState, useEffect } from 'react';
import axios from "../../../config/axios";
import { useParams, Link } from 'react-router-dom';

function SessionMarks() {
    const { id } = useParams(); // ID сессии
    const [session, setSession] = useState(null);
    const [students, setStudents] = useState([]);
    const [marks, setMarks] = useState({}); // Объект вида { student_id: mark }

    // Загрузка данных
    useEffect(() => {
        // 1. Загружаем информацию о сессии (какая группа, какой предмет)
        axios.get("/session/" + id).then(res => {
            const sessionData = res.data;
            setSession(sessionData);

            // 2. Зная группу, загружаем студентов этой группы
            if (sessionData && sessionData.student_group_id) {
                axios.get("/studentsByStudentGroup/studentGroupId=" + sessionData.student_group_id)
                    .then(resStudents => {
                        setStudents(resStudents.data);
                    });
            }
        });

        // 3. Загружаем уже выставленные оценки
        axios.get("/attestation/session/" + id).then(res => {
            const marksMap = {};
            res.data.forEach(item => {
                marksMap[item.student_id] = item.mark;
            });
            setMarks(marksMap);
        });
    }, [id]);

    // Обработка изменения оценки в инпуте
    const handleMarkChange = (studentId, value) => {
        setMarks(prev => ({ ...prev, [studentId]: value }));
    };

    // Сохранение оценки (при потере фокуса или нажатии Enter можно сделать, но сделаем кнопку)
    const saveMark = (studentId) => {
        const value = marks[studentId];
        axios.post("/attestation/save", {
            student_id: studentId,
            student_group_session_id: id,
            mark: value
        })
        .then(() => alert("Оценка сохранена!"))
        .catch(e => alert("Ошибка сохранения"));
    };

    if (!session) return <div>Загрузка ведомости...</div>;

    return (
        <div>
            <h2>Ведомость №{session.id}</h2>
            <div className="card-item" style={{ textAlign: 'left', marginBottom: '20px' }}>
                <h3>{session.teacher_discipline?.discipline?.name}</h3>
                <p><strong>Вид контроля:</strong> {session.report_type?.name}</p>
                <p><strong>Группа:</strong> {session.student_group?.name}</p>
                <p><strong>Преподаватель:</strong> {session.teacher_discipline?.teacher?.name}</p>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr style={{ borderBottom: '2px solid #444' }}>
                        <th style={{ textAlign: 'left', padding: '10px' }}>Студент</th>
                        <th style={{ textAlign: 'left', padding: '10px' }}>Оценка</th>
                        <th style={{ textAlign: 'left', padding: '10px' }}>Действие</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.id} style={{ borderBottom: '1px solid #333' }}>
                            <td style={{ padding: '10px' }}>{student.name}</td>
                            <td style={{ padding: '10px' }}>
                                <input 
                                    type="text" 
                                    value={marks[student.id] || ""} 
                                    onChange={(e) => handleMarkChange(student.id, e.target.value)}
                                    placeholder="Например: 5, Зачет"
                                    style={{ width: '150px', margin: 0 }}
                                />
                            </td>
                            <td style={{ padding: '10px' }}>
                                <button 
                                    onClick={() => saveMark(student.id)}
                                    style={{ padding: '5px 15px', backgroundColor: '#2d5e2e' }}
                                >
                                    Сохранить
                                </button>
                            </td>
                        </tr>
                    ))}
                    {students.length === 0 && <tr><td colSpan="3">В группе нет студентов</td></tr>}
                </tbody>
            </table>

            <div style={{ marginTop: '30px' }}>
                <Link to="/listSessions">← Назад к списку сессий</Link>
            </div>
        </div>
    );
}

export default SessionMarks;