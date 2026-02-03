import { useState } from "react";
import "./BudgetTracker.css";

type Category = "Income" | "Expense";

interface BudgetItem {
    id: string;
    description: string;
    amount: number;
    date: string;
    category: Category;
}

const INITIAL_BUDGET_ITEMS: BudgetItem[] = [
    {
        id: "id1",
        description: "Salary",
        amount: 5000,
        date: "2026-02-03",
        category: "Income"
    },
    {
        id: "id2",
        description: "Coffee",
        amount: 200,
        date: "2026-02-03",
        category: "Expense"
    }
];

const BudgetTracker = () => {
    const [budgetItems, setBudgetItems] = useState<BudgetItem []>(INITIAL_BUDGET_ITEMS);

    console.log(budgetItems);

    return (
        <div className="budget-tracker">
            <div>
                <h2> This is a form</h2>
                <form></form>
            </div>

            <div className="budget-list">
                <h2>This is a budget list</h2>
                {budgetItems.map(item => (
                    <div className="budget-item" key={item.id}>
                        <p className="budget-item__description">{item.description}</p>
                        <p className="budget-item__amount">{item.amount}</p>
                        <p className="budget-item__date">{item.date}</p>
                        <p className="budget-item__category">{item.category}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BudgetTracker;