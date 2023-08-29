import Navbar from './Navbar'

export default function Layout({ children }) {
  return (
    <>
      <header className='w-full'>
        <Navbar />
      </header>
      <main className='max-w-screen-lg mx-auto mt-5'>{children}</main>
    </>
  )
}