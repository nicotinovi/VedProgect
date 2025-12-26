import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
// ... (твои импорты компонентов) ...
import ListDisciplines from './components/discipline/ListDisciplines';
import AddDiscipline from './components/discipline/AddDiscipline.jsx'
import Header from './layout/Header'
import DisciplineData from "./components/discipline/DisciplineData.jsx";
import Protected from "./components/auth/ProtectedRoute.jsx";
import Login from "./components/auth/Login.jsx";
import Register from "./components/auth/Register.jsx";
import ListStudentGroups from './components/studentGroup/ListStudentGroups.jsx';
import AddStudentGroup from './components/studentGroup/AddStudentGroup.jsx';
import StudentGroupData from './components/studentGroup/StudentGroupData.jsx';
import ListStudents from './components/student/ListStudents.jsx';
import AddStudent from './components/student/AddStudent.jsx';
import StudentData from './components/student/StudentData.jsx';
import ListTeachers from './components/teacher/ListTeachers.jsx';
import AddTeacher from './components/teacher/AddTeacher.jsx';
import TeacherData from './components/teacher/TeacherData.jsx';
import ListReportTypes from './components/reportType/ListReportTypes.jsx';
import ListSessions from './components/session/ListSessions.jsx';
import SessionMarks from './components/session/SessionMarks.jsx';

const App = () => {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#242424', width: '100%' }}>
            <BrowserRouter>
                {/* Шапка на всю ширину */}
                <Header/>
                
                {/* Контент с отступами по центру */}
                <main className="main-content">
                    <Routes>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path='/listDisciplines' element={<Protected><ListDisciplines/></Protected>}/>
                        <Route path='/addDiscipline' element={<Protected><AddDiscipline/></Protected>}/>
                        <Route path='/discipline/:id' element={<Protected><DisciplineData/></Protected>}/>
                        
                        <Route path='/listStudentGroups' element={<Protected><ListStudentGroups/></Protected>}/>
                        <Route path='/addStudentGroup' element={<Protected><AddStudentGroup/></Protected>}/>
                        <Route path='/studentGroup/:id' element={<Protected><StudentGroupData/></Protected>}/>
                        
                        <Route path='/listStudents' element={<Protected><ListStudents/></Protected>}/>
                        <Route path='/addStudent' element={<Protected><AddStudent/></Protected>}/>
                        <Route path='/student/:id' element={<Protected><StudentData/></Protected>}/>
                        
                        <Route path='/listTeachers' element={<Protected><ListTeachers/></Protected>}/>
                        <Route path='/addTeacher' element={<Protected><AddTeacher/></Protected>}/>
                        <Route path='/teacher/:id' element={<Protected><TeacherData/></Protected>}/>
                        
                        <Route path='/listReportTypes' element={<Protected><ListReportTypes/></Protected>}/>
                        
                        <Route path='/listSessions' element={<Protected><ListSessions/></Protected>}/>
                        <Route path='/sessionMarks/:id' element={<Protected><SessionMarks/></Protected>}/>
                        
                        <Route path="*" element={<Protected><ListDisciplines/></Protected>} />
                    </Routes>
                </main>
            </BrowserRouter>
        </div>
    );
}

export default App;