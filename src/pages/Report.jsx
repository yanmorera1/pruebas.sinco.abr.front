import { Card, Typography } from '@material-tailwind/react'
import Layout from '../components/Layout'
import { BASE_URL } from '../consts'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const TABLE_HEAD = ['Año académico', 'Identificación Alumno', 'Nombre Alumno', 'Código Materia', 'Nombre Materia', 'Identificación del profesor', 'Nombre del profesor', 'Calificación final', 'Aprobó']
export default function Report() {
  const [ratings, setRatings] = useState([])

  useEffect(() => {
    getRatings()
  }, [])

  const getRatings = () => {
    fetch(`${BASE_URL}/subjects/report`, {
      method: 'GET',
      headers: new Headers({ 'content-type': 'application/json' })
    })
      .then((res) => {
        if (res.ok) return res.json()
        else throw new Error(res.statusText)
      })
      .then((json) => {
        setRatings(json)
      })
      .catch((error) => console.error(error))
  }

  return (
    <Layout>
      <Typography variant='h4' color='blue-gray' className='mb-3'>
        Reporte
      </Typography>
      <Link to={`/students/rating`} className='font-medium text-blue-900'>
        Calificar
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
            {ratings.map(
              ({ id, academicYear, studentIdentificationNumber, studentName, subjectCode, subjectName, teacherIdentificationNumber, teacherName, rating, wasApproved }, index) => {
                const isLast = index === ratings.length - 1
                const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50'

                return (
                  <tr key={id}>
                    <td className={classes}>
                      <Typography variant='small' color='blue-gray' className='font-normal'>
                        {academicYear}
                      </Typography>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                      <Typography variant='small' color='blue-gray' className='font-normal'>
                        {studentIdentificationNumber}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant='small' color='blue-gray' className='font-normal'>
                        {studentName}
                      </Typography>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                      <Typography variant='small' color='blue-gray' className='font-normal'>
                        {subjectCode}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant='small' color='blue-gray' className='font-normal'>
                        {subjectName}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant='small' color='blue-gray' className='font-normal'>
                        {teacherIdentificationNumber}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant='small' color='blue-gray' className='font-normal'>
                        {teacherName}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant='small' color='blue-gray' className='font-normal'>
                        {rating}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant='small' color='blue-gray' className='font-normal'>
                        {wasApproved ? 'SI' : 'NO'}
                      </Typography>
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
