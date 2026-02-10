import { Route, Routes } from 'react-router'
import './App.css'
import Header from './components/Header'
import BudgetList from './pages/BudgetList'
import BudgetForm from './pages/BudgetForm'

function App() {
  return (
    <>
      <Header title="Budget Tracker" description='This is a budget tracker app' />

        <Routes>
          <Route index element={<BudgetList />} />
          <Route path="list" element={<BudgetList />} />
          <Route path="/add" element={<BudgetForm />} />
        </Routes>    
    </>
  )
}

export default App
