import { Alert, Typography, Card, Button, Input } from '@material-tailwind/react'
import { BASE_URL, FORM_STATES } from '../consts'
import Layout from '../components/Layout'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function AddTeacher() {
  const [status, setStatus] = useState(FORM_STATES.INITIAL)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const model = Object.fromEntries(new FormData(e.currentTarget))

    try {
      const response = await fetch(`${BASE_URL}/teachers`, {
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
          Nuevo profesor
        </Typography>

        <Link to={`/teachers`} className='font-medium text-blue-900'>
          Volver
        </Link>

        {status === FORM_STATES.SUCCESS && <Alert color='green'>Profesor creado</Alert>}
        {status === FORM_STATES.FAILED && <Alert color='red'>Error enviando los datos</Alert>}

        <form className='mt-8 mb-2' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-5'>
            <Input label='# Identificacion' type='number' name='identificationNumber' required />
            <Input label='Nombre' name='name' required />
            <Input label='Apellidos' name='lastName' required />
            <Input label='Edad' name='age' type='number' required />
            <Input label='Dirección' name='address' required />
            <Input label='# Teléfono' name='phoneNumber' type='number' required />
          </div>
          <Button className='mt-6' fullWidth type='submit'>
            Enviar
          </Button>
        </form>
      </Card>
    </Layout>
  )
}
