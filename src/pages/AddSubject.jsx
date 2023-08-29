import { Alert, Typography, Card, Button, Input, Option } from '@material-tailwind/react'
import { BASE_URL, FORM_STATES } from '../consts'
import Layout from '../components/Layout'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Select } from '@material-tailwind/react'
import { useEffect } from 'react'

export default function AddSubject() {
  const [status, setStatus] = useState(FORM_STATES.INITIAL)
  const [teachers, setTeachers] = useState([])
  const [selectedTeacherId, setSelectedTeacherId] = useState()

  useEffect(() => {
    getTeachers()
  }, [])

  const getTeachers = () => {
    fetch(`${BASE_URL}/teachers`, {
      method: 'GET',
      headers: new Headers({ 'content-type': 'application/json' })
    })
      .then((res) => {
        if (res.ok) return res.json()
        else throw new Error(res.statusText)
      })
      .then((json) => {
        setTeachers(json)
      })
      .catch((error) => console.error(error))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const model = Object.fromEntries(new FormData(e.currentTarget))
    model.teacherId = selectedTeacherId

    try {
      const response = await fetch(`${BASE_URL}/subjects`, {
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
          Nueva asignatura
        </Typography>

        <Link to={`/subjects`} className='font-medium text-blue-900'>
          Volver
        </Link>

        {status === FORM_STATES.SUCCESS && <Alert color='green'>Asignatura creada</Alert>}
        {status === FORM_STATES.FAILED && <Alert color='red'>Error enviando los datos</Alert>}

        <form className='mt-8 mb-2' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-5'>
            <Input label='Codigo' name='code' required />
            <Input label='Nombre' name='name' required />
            <Select label='Profesor' name='teacherId' required onChange={setSelectedTeacherId}>
              {teachers.map((teacher) => (
                <Option key={teacher.id} value={teacher.id}>
                  {teacher.name} {teacher.lastName}
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
