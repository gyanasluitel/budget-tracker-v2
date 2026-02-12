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
    const { budgetItems, setBudgetItems } = useBudgetTracker();

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
        <form className="budget-tracker-form" onSubmit={handleSubmit}>
            <div className="budget-tracker-form__group">
                <label className="budget-tracker-form__label">Description</label>
                <input
                    className="budget-tracker-form__input"
                    type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                    style={{width:'100%'}}
                />                
            </div>
            <div className="budget-tracker-form__group">
                <label className="budget-tracker-form__label">Amount</label>
                <input
                    className="budget-tracker-form__input"
                    type="number"
                    value={amount}
                    onChange={e => setAmount(Number(e.target.value))}
                    required
                    min="0.01"
                    step="0.01"
                    style={{width:'100%'}}
                />
            </div>
            <div className="budget-tracker-form__group">
                <label className="budget-tracker-form__label">Date</label>
                <input
                    className="budget-tracker-form__input"
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    required
                    style={{width:'100%'}}
                />
            </div>
            <div className="budget-tracker-form__group">
                <label className="budget-tracker-form__label">Category</label>
                <select
                    className="budget-tracker-form__select"
                    value={category}
                    onChange={e => setCategory(e.target.value as Category)}
                    style={{width:'100%'}}
                >
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                </select>
            </div>

            <button type="submit" className="budget-tracker-form__submit">Submit</button>
        </form>
    )
}

export default BudgetForm;