import { useSelector } from 'react-redux'
import { loginSelector } from './features/login/loginSlice'
import AppRouter from 'components/router/AppRouter'
import Login from 'components/Login'

function App() {
  const { isLoggedIn } = useSelector(loginSelector)

  return <div className="app">{isLoggedIn ? <AppRouter /> : <Login />}</div>
}

export default App
