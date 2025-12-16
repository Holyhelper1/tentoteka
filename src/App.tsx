import './App.module.css'
import { Route, Routes } from 'react-router-dom'
import {Header} from './Components/Header/Header'
import { routes, type RouteConfig } from './Routes/routes'

function App() {

  return (
    <>
    <Header/>
    <main>
      <Routes>
        {routes.map(({ path, component: Component }: RouteConfig) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Routes>

    </main>
    </>
  )
}

export default App
