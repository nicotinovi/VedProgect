import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    // Если токена нет, не показываем навигацию (или показываем только логин)
    if (!token) return null;

    return (
        <header>
            <nav>
                <Link to="/listDisciplines">Дисциплины</Link>
                <Link to="/listStudentGroups">Группы</Link>
                <Link to="/listStudents">Студенты</Link>
                <Link to="/listTeachers">Преподаватели</Link>
                <Link to="/listReportTypes">Аттестация</Link>
                <Link to="/listSessions">Сессии</Link>
                <button onClick={handleLogout} style={{marginLeft: 'auto'}}>Выйти</button>
            </nav>
        </header>
    );
};

export default Header;