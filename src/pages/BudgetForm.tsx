import { useEffect, useState } from "react";
import "./BudgetForm.css";
import useBudgetTracker from "../hooks/useBudgetTracker";

export type Category = "Income" | "Expense";

export interface BudgetItem {
    id: string;
    description: string;
    amount: number;
    date: string;
    category: Category;
}

const BudgetForm = () => {
        const { budgetItems, setBudgetItems, handleDelete } = useBudgetTracker();
    
        const [description, setDescription] = useState("");
        const [amount, setAmount] = useState<number>(0);
        const [date, setDate] = useState("");
        const [category, setCategory] = useState<Category>("Expense");
    
        useEffect(() => {
            localStorage.setItem("budgetItems", JSON.stringify(budgetItems));
        }, [budgetItems]);
    
        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
    
            if (description.trim() === "") {
                alert("Description is required");
                console.log("Description is required");
                return;
            }
    
            if (amount === undefined || isNaN(amount) || amount <= 0) {
                console.log("Amount must be a positive number");
                alert("Amount must be a positive number");
                return;
            }
    
            const itemToAdd: BudgetItem = {
                id: crypto.randomUUID(),
                description,
                amount: amount,
                date: date,
                category: category
            }
    
            setBudgetItems(prev => [...prev, itemToAdd])
    
            setDescription("");
            setAmount(0);
            setDate("");
            setCategory("Expense");
        }
    

    return (
        <div className="budget-tracker">

        <div>
            <form className="budget-tracker-form" onSubmit={handleSubmit}>
                <input 
                    className="budget-tracker-form__input"
                    type="text" 
                    placeholder="Enter budget item..." 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}  />

                    <input
                        className="budget-tracker-form__input"
                        type="number"
                        placeholder="Enter the amount..."
                        value={amount}
                        onChange={e => setAmount(Number(e.target.value))}
                    />

                    <input
                        className="budget-tracker-form__input"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />

                    <select
                        className="budget-tracker-form__input"
                        value={category}
                        onChange={(e) => setCategory(e.target.value as Category)}
                    >
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                    </select>

                    <button type="submit" className="budget-tracker-form__submit">Submit</button>
            </form>
        </div>

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

export default BudgetForm;