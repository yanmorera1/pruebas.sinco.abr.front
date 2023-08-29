import { Alert, Typography, Card, Button, Input, Spinner } from '@material-tailwind/react'
import { BASE_URL, FORM_STATES } from '../consts'
import Layout from '../components/Layout'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function UpdateTeacher() {
  const [status, setStatus] = useState(FORM_STATES.INITIAL)
  const [teacher, setTeacher] = useState()
  const { teacherId } = useParams()

  useEffect(() => {
    getTeacher(teacherId)
  }, [])

  const getTeacher = (teacherId) => {
    fetch(`${BASE_URL}/teachers?teacherId=${teacherId}`, {
      method: 'GET',
      headers: new Headers({ 'content-type': 'application/json' })
    })
      .then((res) => {
        if (res.ok) return res.json()
        else throw new Error(res.statusText)
      })
      .then((json) => {
        setTeacher(json[0])
      })
      .catch((error) => console.error(error))
  }
 
  const handleSubmit = async (e) => {
    e.preventDefault()
    const model = Object.fromEntries(new FormData(e.currentTarget))
    const values = Object.entries(model).map(([path, value]) => ({
      path,
      op: 'replace',
      value
    }))

    try {
      const response = await fetch(`${BASE_URL}/teachers/${teacherId}`, {
        method: 'PATCH',
        body: JSON.stringify(values),
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
  if (!teacher) return <Spinner />
  return (
    <Layout>
      <Card color='transparent' shadow={true} className='p-7'>
        <Typography variant='h4' color='blue-gray' className='mb-3'>
          Actualizar Profesor - {teacher.name} {teacher.lastName}
        </Typography>

        <Link to={`/teachers`} className='font-medium text-blue-900'>
          Volver
        </Link>

        {status === FORM_STATES.SUCCESS && <Alert color='green'>Profesor actualizado</Alert>}
        {status === FORM_STATES.FAILED && <Alert color='red'>Error enviando los datos</Alert>}

        <form className='mt-8 mb-2' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-5'>
            <Input
              label='# Identificacion'
              name='identificationNumber'
              type='number'
              defaultValue={teacher.identificationNumber}
              required
            />
            <Input label='Nombre' name='name' defaultValue={teacher.name} required />
            <Input label='Apellidos' name='lastName' defaultValue={teacher.lastName} required />
            <Input label='Edad' name='age' type='number' defaultValue={teacher.age} required />
            <Input label='Dirección' name='address' defaultValue={teacher.address} required />
            <Input
              label='# Teléfono'
              name='phoneNumber'
              type='number'
              defaultValue={teacher.phoneNumber}
              required
            />
          </div>
          <Button className='mt-6' fullWidth type='submit'>
            Enviar
          </Button>
        </form>
      </Card>

    </Layout>
  )
}
