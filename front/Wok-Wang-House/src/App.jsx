import { useState } from 'react'
import { Empleado } from './Components/Empleado'
import { Pedidos } from './Components/Pedidos'
import { Producto } from './Components/Producto'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Empleado></Empleado>
      <Pedidos></Pedidos>
      <Producto></Producto>
    </>
  )
}

export default App
