import { Alert, Typography, Card, Button, Input, Spinner, DialogFooter, DialogHeader } from '@material-tailwind/react'
import { BASE_URL, FORM_STATES } from '../consts'
import Layout from '../components/Layout'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Dialog } from '@material-tailwind/react'
import { useNavigate } from 'react-router-dom'

export default function UpdateStudent() {
  const [status, setStatus] = useState(FORM_STATES.INITIAL)
  const [student, setStudent] = useState()
  const { studentId } = useParams()
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    getStudent(studentId)
  }, [])

  const getStudent = (studentId) => {
    fetch(`${BASE_URL}/students?studentId=${studentId}`, {
      method: 'GET',
      headers: new Headers({ 'content-type': 'application/json' })
    })
      .then((res) => {
        if (res.ok) return res.json()
        else throw new Error(res.statusText)
      })
      .then((json) => {
        setStudent(json[0])
      })
      .catch((error) => console.error(error))
  }
 
  const handleOpen = () => setOpen(!open);

  const handleDelete = async () => {
    try {
      const response = await fetch(`${BASE_URL}/students/${studentId}`, {
        method: 'DELETE',
        headers: new Headers({ 'content-type': 'application/json' })
      })
      if (response.ok) {
        setStatus(FORM_STATES.SUCCESS)
        navigate('/students')
      } else throw new Error(response.statusText)
    } catch (error) {
      console.error(error)
      setStatus(FORM_STATES.FAILED)
    }
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
      const response = await fetch(`${BASE_URL}/students/${studentId}`, {
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
  if (!student) return <Spinner />
  return (
    <Layout>
      <Card color='transparent' shadow={true} className='p-7'>
        <Typography variant='h4' color='blue-gray' className='mb-3'>
          Actualizar alumno - {student.name} {student.lastName}
        </Typography>

        <Link to={`/students`} className='font-medium text-blue-900'>
          Volver
        </Link>

        {status === FORM_STATES.SUCCESS && <Alert color='green'>Alumnoo actualizado</Alert>}
        {status === FORM_STATES.FAILED && <Alert color='red'>Error enviando los datos</Alert>}

        <form className='mt-8 mb-2' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-5'>
            <Input
              label='# Identificacion'
              name='identificationNumber'
              type='number'
              defaultValue={student.identificationNumber}
              required
            />
            <Input label='Nombre' name='name' defaultValue={student.name} required />
            <Input label='Apellidos' name='lastName' defaultValue={student.lastName} required />
            <Input label='Edad' name='age' type='number' defaultValue={student.age} required />
            <Input label='Dirección' name='address' defaultValue={student.address} required />
            <Input
              label='# Teléfono'
              name='phoneNumber'
              type='number'
              defaultValue={student.phoneNumber}
              required
            />
          </div>
          <Button className='mt-6' fullWidth type='submit'>
            Enviar
          </Button>

          <Button className='mt-6' fullWidth type='button' color='red' onClick={handleOpen}>
            Eliminar
          </Button>
        </form>
      </Card>

      <Dialog open={open} size='xs' handler={handleOpen}>
        <DialogHeader>Está seguro de eliminar a este alunmo?</DialogHeader>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancelar</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleDelete}>
            <span>Confirmar</span>
          </Button>
        </DialogFooter>
      </Dialog>

    </Layout>
  )
}
