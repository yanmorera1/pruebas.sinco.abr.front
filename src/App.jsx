import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Students from './pages/Students'
import Teachers from './pages/Teachers'
import Subjects from './pages/Subjects'
import AddStudent from './pages/AddStudent'
import UpdateStudent from './pages/UpdateStudent'
import AddTeacher from './pages/AddTeacher'
import UpdateTeacher from './pages/UpdateTeacher'
import AddSubject from './pages/AddSubject'
import StudentRating from './pages/StudentRating'
import Report from './pages/Report'
import UpdateSubject from './pages/UpdateSubject'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/students' element={<Students />} />
        <Route path='/students/add' element={<AddStudent />} />
        <Route path='/students/update/:studentId' element={<UpdateStudent />} />
        <Route path='/students/rating' element={<StudentRating />} />
        <Route path='/teachers' element={<Teachers />} />
        <Route path='/teachers/add' element={<AddTeacher />} />
        <Route path='/teachers/update/:teacherId' element={<UpdateTeacher />} />
        <Route path='/subjects' element={<Subjects />} />
        <Route path='/subjects/add' element={<AddSubject />} />
        <Route path='/subjects/update/:subjectId' element={<UpdateSubject />} />
        <Route path='/report' element={<Report />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
