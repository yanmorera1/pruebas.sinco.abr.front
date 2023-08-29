import { Card, Typography } from '@material-tailwind/react'
import Layout from '../components/Layout'
import { BASE_URL } from '../consts'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const TABLE_HEAD = ['# Identificación', 'Nombre', 'Edad', 'Dirección', '# Teléfono', '']
export default function Students() {
  const [students, setStudents] = useState([])

  useEffect(() => {
    getStudents()
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

  return (
    <Layout>
      <Typography variant='h4' color='blue-gray' className='mb-3'>
        Alumnos
      </Typography>
      <Link to={`/students/add`} className='font-medium text-blue-900'>
        Añadir
      </Link>
      <Card className='overflow-scroll h-full w-full'>
        <table className='w-full min-w-max table-auto text-left'>
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
                  <Typography
                    variant='small'
                    color='blue-gray'
                    className='font-normal leading-none opacity-70'
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map(
              ({ id, identificationNumber, name, lastName, age, address, phoneNumber }, index) => {
                const isLast = index === students.length - 1
                const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50'

                return (
                  <tr key={id}>
                    <td className={classes}>
                      <Typography variant='small' color='blue-gray' className='font-normal'>
                        {identificationNumber}
                      </Typography>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                      <Typography variant='small' color='blue-gray' className='font-normal'>
                        {name} {lastName}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant='small' color='blue-gray' className='font-normal'>
                        {age}
                      </Typography>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                      <Typography variant='small' color='blue-gray' className='font-normal'>
                        {address}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant='small' color='blue-gray' className='font-normal'>
                        {phoneNumber}
                      </Typography>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                      <Link to={`/students/update/${id}`} className='font-medium text-blue-900'>
                        Editar
                      </Link>
                    </td>
                  </tr>
                )
              }
            )}
          </tbody>
        </table>
      </Card>
    </Layout>
  )
}
