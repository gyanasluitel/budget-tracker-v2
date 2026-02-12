import { useEffect } from "react";
import useBudgetTracker from "../hooks/useBudgetTracker";
import './BudgetList.css';
import Budget from "../components/Budget";

const BudgetList = () => {
    const { budgetItems, handleDelete } = useBudgetTracker();

    useEffect(() => {
        localStorage.setItem("budgetItems", JSON.stringify(budgetItems));
    }, [budgetItems]);

    if (budgetItems.length === 0) {
        return <div>
            <p className="budget-item-list budget-item-list__empty">No budget items found. Please add some.</p>
        </div>
    }
    
    return (
        <div>
            <div className="budget-item-list" style={{width:'100%'}}>
                {budgetItems.map(item => (
                    <Budget key={item.id} item={item} handleDelete={handleDelete} />
                ))}
            </div>
        </div>

    )
}

export default BudgetList;