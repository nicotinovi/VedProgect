import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../App.css'; // Убедимся, что стили подключены

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    // Если токена нет, не показываем шапку
    if (!token) return null;

    // Функция для определения класса активной ссылки
    const getLinkClass = ({ isActive }) => isActive ? "nav-link active" : "nav-link";

    return (
        <header className="app-header">
            {/* Логотип / Название проекта */}
            <div className="header-logo">
                🎓
            </div>

            {/* Навигация по центру */}
            <nav className="header-nav">
                <NavLink to="/listDisciplines" className={getLinkClass}>Дисциплины</NavLink>
                <NavLink to="/listStudentGroups" className={getLinkClass}>Группы</NavLink>
                <NavLink to="/listStudents" className={getLinkClass}>Студенты</NavLink>
                <NavLink to="/listTeachers" className={getLinkClass}>Преподаватели</NavLink>
                <NavLink to="/listReportTypes" className={getLinkClass}>Аттестация</NavLink>
                <NavLink to="/listSessions" className={getLinkClass}>Сессии</NavLink>
            </nav>

            {/* Кнопка выхода справа */}
            <div className="header-actions">
                <button onClick={handleLogout} className="logout-btn">Выйти</button>
            </div>
        </header>
    );
};

export default Header;