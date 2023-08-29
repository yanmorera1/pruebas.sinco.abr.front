import { Alert, Typography, Card, Button, Input, Option } from '@material-tailwind/react'
import { BASE_URL, FORM_STATES } from '../consts'
import Layout from '../components/Layout'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Select } from '@material-tailwind/react'
import { useEffect } from 'react'

export default function StudentRating() {
  const [status, setStatus] = useState(FORM_STATES.INITIAL)
  const [students, setStudents] = useState([])
  const [subjects, setSubjects] = useState([])
  const [selectedStudentId, setSelectedStudentId] = useState()
  const [selectedSubjectId, setSelectedSubjectId] = useState()

  useEffect(() => {
    getStudents()
    getSubjects()
  }, [])

  const getStudents = () => {
    fetch(`${BASE_URL}/students`, {
      method: 'GET',
      headers: new Headers({ 'content-type': 'application/json' })
    })
      .then((res) => {
        if (res.ok) return res.json()
        else throw new Error(res.statusText)
      })
      .then((json) => {
        setStudents(json)
      })
      .catch((error) => console.error(error))
  }

  const getSubjects = () => {
    fetch(`${BASE_URL}/subjects`, {
      method: 'GET',
      headers: new Headers({ 'content-type': 'application/json' })
    })
      .then((res) => {
        if (res.ok) return res.json()
        else throw new Error(res.statusText)
      })
      .then((json) => {
        setSubjects(json)
      })
      .catch((error) => console.error(error))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const model = Object.fromEntries(new FormData(e.currentTarget))
    model.studentId = selectedStudentId
    model.subjectId = selectedSubjectId

    try {
      const response = await fetch(`${BASE_URL}/students/rating`, {
        method: 'POST',
        body: JSON.stringify(model),
        headers: new Headers({ 'content-type': 'application/json' })
      })
      if (response.ok) {
        setStatus(FORM_STATES.SUCCESS)
        e.target.reset()
      } else throw new Error(response.statusText)
    } catch (error) {
      console.error(error)
      setStatus(FORM_STATES.FAILED)
    }
  }
  return (
    <Layout>
      <Card color='transparent' shadow={true} className='p-7'>
        <Typography variant='h4' color='blue-gray' className='mb-3'>
          Calificar
        </Typography>

        <Link to={`/subjects`} className='font-medium text-blue-900'>
          Volver
        </Link>

        {status === FORM_STATES.SUCCESS && <Alert color='green'>Asignatura creada</Alert>}
        {status === FORM_STATES.FAILED && <Alert color='red'>Error enviando los datos</Alert>}

        <form className='mt-8 mb-2' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-5'>
            <Input label='Calificacion' name='rating' required />
            <Select label='Alumno' name='studentId' required onChange={setSelectedStudentId}>
              {students.map((student) => (
                <Option key={student.id} value={student.id}>
                  {student.name} {student.lastName}
                </Option>
              ))}
            </Select>
            <Select label='Asignatura' name='subjectId' required onChange={setSelectedSubjectId}>
              {subjects.map((subject) => (
                <Option key={subject.id} value={subject.id}>
                  {subject.name}
                </Option>
              ))}
            </Select>
          </div>
          <Button className='mt-6' fullWidth type='submit'>
            Enviar
          </Button>
        </form>
      </Card>
    </Layout>
  )
}
