import App from './App'
import LandingPage from './components/marketing/LandingPage'
import About from './components/marketing/About'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import TestTodosVariable from './components/marketing/TestTodosVariable'


const routes = [
    { path: '/', name: 'home', component: LandingPage},
    { path: '/todo', name: 'todo', component: App},
    { path: '/about', name: 'about', component: About},
    { path: '/login', name: 'login', component: Login},
    { path: '/register', name: 'register', component: Register},
    { path: '/todos/:id', name: 'todos', component: TestTodosVariable}
]

export default routes