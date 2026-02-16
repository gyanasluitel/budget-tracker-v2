import './BudgetList.css';
import Budget from "../components/Budget";
import { useBudgetContext } from "../context/BudgetContextProvider";
import useBudgetTracker from '../hooks/useBudgetTracker';

const BudgetList = () => {
    const { deleteBudgetItem : handleDelete, budgetItems } = useBudgetContext();
    const { newBudgetItems  } = useBudgetTracker({ budgetItems });

    if (budgetItems.length === 0) {
        return <div>
            <p className="budget-item-list budget-item-list__empty">No budget items found. Please add some.</p>
        </div>
    }
    
    return (
        <div>
            <div className="budget-item-list" style={{width:'100%'}}>
                {newBudgetItems.map(item => (
                    <Budget key={item.id} item={item} handleDelete={handleDelete} />
                ))}
            </div>
        </div>

    )
}

export default BudgetList;