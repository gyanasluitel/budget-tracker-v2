import { useEffect } from "react";
import useBudgetTracker from "../hooks/useBudgetTracker";

const BudgetList = () => {
    const { budgetItems, handleDelete } = useBudgetTracker();

    useEffect(() => {
        localStorage.setItem("budgetItems", JSON.stringify(budgetItems));
    }, [budgetItems]);
    
    return (
        <div className="budget-tracker">
            <div className="budget-list">
            {budgetItems.map(item => (
                <div className="budget-item" key={item.id}>
                    <div>
                        <p className="budget-item__description">{item.description}</p>
                        <p className="budget-item__amount">{item.amount}</p>
                        <p className="budget-item__date">{item.date}</p>
                        <p className="budget-item__category">{item.category}</p>
                    </div>

                    <button onClick={() => handleDelete(item.id)} className="budget-item__delete">Delete</button>
                </div>
            ))}
        </div>
        </div>
    )
}

export default BudgetList