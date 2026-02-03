import './App.css'
import BudgetTracker from './components/BudgetTracker'
import Header from './components/Header'

function App() {
  return (
    <div className="container">
      <Header title="Budget Tracker" description='This is a budget tracker app' />
      
      <BudgetTracker />
    </div>
  )
}

export default App
