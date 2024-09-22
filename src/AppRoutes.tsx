import { Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import CheckEmail from './CheckEmail.tsx'
import BreachAnalysis from './BreachAnalysis.tsx'
import CheckDomain from './CheckDomains.tsx'
import CheckPassword from './CheckPassword.tsx'
import Breaches from './Breaches.tsx'

function AppRoutes() {
    return(
        <Routes>
            <Route path='/' element={ <App/> }/>
            <Route path='/Breaches' element={ <Breaches/>} />
            <Route path='/CheckEmail' element={ <CheckEmail/> }/>
            <Route path='/BreachAnalysis/:email' element={ <BreachAnalysis/> }/>
            <Route path='/CheckDomain' element={ <CheckDomain/>} />
            <Route path='/CheckPassword' element={ <CheckPassword/>} />
        
            
            {/** Your Routes come here */}
        </Routes>
    )
}

export default AppRoutes