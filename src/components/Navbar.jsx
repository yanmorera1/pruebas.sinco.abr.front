import { Typography, Navbar } from '@material-tailwind/react'

import { Link } from 'react-router-dom'
export default function CustomNavbar() {
  return (
    <Navbar className='w-full rounded-none'>
      <ul className='flex gap-3 text-lg'>
        <Typography as='li' variant='small' color='blue-gray' className='p-1 font-medium'>
          <Link className='flex items-center hover:text-blue-500 transition-colors' to={'/students'}>
            Estudiantes
          </Link>
        </Typography>
        <Typography as='li' variant='small' color='blue-gray' className='p-1 font-medium'>
          <Link className='flex items-center hover:text-blue-500 transition-colors' to={'/teachers'}>
            Profesores
          </Link>
        </Typography>
        <Typography as='li' variant='small' color='blue-gray' className='p-1 font-medium'>
          <Link className='flex items-center hover:text-blue-500 transition-colors' to={'/subjects'}>
            Asignaturas
          </Link>
        </Typography>
        <Typography as='li' variant='small' color='blue-gray' className='p-1 font-medium'>
          <Link className='flex items-center hover:text-blue-500 transition-colors' to={'/report'}>
            Reporte
          </Link>
        </Typography>
      </ul>
    </Navbar>
  )
}
