import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ListDisciplines from './components/discipline/ListDisciplines';
import AddDiscipline from './components/discipline/AddDiscipline.jsx'
import Header from './layout/Header'
import DisciplineData from "./components/discipline/DisciplineData.jsx";
import Protected from "./components/auth/ProtectedRoute.jsx";
import Login from "./components/auth/Login.jsx";
import Register from "./components/auth/Register.jsx";
//импорт групп (добавил)
import ListStudentGroups from './components/studentGroup/ListStudentGroups.jsx';
import AddStudentGroup from './components/studentGroup/AddStudentGroup.jsx';
import StudentGroupData from './components/studentGroup/StudentGroupData.jsx';
//импорт студентов (добавил)
import ListStudents from './components/student/ListStudents.jsx';
import AddStudent from './components/student/AddStudent.jsx';
import StudentData from './components/student/StudentData.jsx';
//импорт преподавателей(добавил)
import ListTeachers from './components/teacher/ListTeachers.jsx';
import AddTeacher from './components/teacher/AddTeacher.jsx';
import TeacherData from './components/teacher/TeacherData.jsx';
//импорт аттестации(добавил)
import ListReportTypes from './components/reportType/ListReportTypes.jsx';
//Импорт для сессии(добавил)
import ListSessions from './components/session/ListSessions.jsx';
//импорт для оценок(добавил)
import SessionMarks from './components/session/SessionMarks.jsx';

const App = () => {
    return <>
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path='/listDisciplines' element={<Protected><ListDisciplines/></Protected>}/>
                <Route path='/addDiscipline' element={<Protected><AddDiscipline/></Protected>}/>
                <Route path='/discipline/:id' element={<Protected><DisciplineData/></Protected>}/>
                {/*Роут для групп*/}
                <Route path='/listStudentGroups' element={<Protected><ListStudentGroups/></Protected>}/>
                <Route path='/addStudentGroup' element={<Protected><AddStudentGroup/></Protected>}/>
                <Route path='/studentGroup/:id' element={<Protected><StudentGroupData/></Protected>}/>
                {/*Роут для студентов*/}
                <Route path='/listStudents' element={<Protected><ListStudents/></Protected>}/>
                <Route path='/addStudent' element={<Protected><AddStudent/></Protected>}/>
                <Route path='/student/:id' element={<Protected><StudentData/></Protected>}/>
                {/*Роут для преподавателей*/}
                <Route path='/listTeachers' element={<Protected><ListTeachers/></Protected>}/>
                <Route path='/addTeacher' element={<Protected><AddTeacher/></Protected>}/>
                <Route path='/teacher/:id' element={<Protected><TeacherData/></Protected>}/>
                {/*Роут для аттестации*/}
                <Route path='/listReportTypes' element={<Protected><ListReportTypes/></Protected>}/>
                {/*Роут для сессии*/}
                <Route path='/listSessions' element={<Protected><ListSessions/></Protected>}/>
                {/*Роут для оценок*/}                
                <Route path='/sessionMarks/:id' element={<Protected><SessionMarks/></Protected>}/>
                {/* Маршрут по умолчанию */}
                <Route path="*" element={<Protected><ListDisciplines/></Protected>} />
            </Routes>
        </BrowserRouter>
    </>
}

export default App