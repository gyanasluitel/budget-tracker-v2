import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router"
import type { BudgetItem } from "./BudgetFormPage";
import { useBudgetContext } from "../context/BudgetContextProvider";

const BudgetItemEdit = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const {budgetItems} = useBudgetContext();

   const item = useMemo(() => {
        if (budgetItems) {
            return budgetItems.find((item) => item.id === id);
        }

    return null;
   }, [budgetItems, id])

    const [form, setForm] = useState<BudgetItem | null>(item ? item : null); 

    if (!form) {
        return <div>Item not found...</div>
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value} = e.target;

        setForm(prev => prev ? {...prev, [name]: name === "amount" ? Number(value) : value} : null);
    }


    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();

        if (!form) {
            return;
        }

        try {
            const localStorageItems = localStorage.getItem("budgetItems");

            if (localStorageItems) {
                const parsedItems: BudgetItem[] = JSON.parse(localStorageItems);
                const updatedItems = parsedItems.map(item => item.id === form.id ? form : item);
                localStorage.setItem("budgetItems", JSON.stringify(updatedItems));
            }

            navigate("/");
        } catch (error) {
            console.log("Error saving item: ", error);
        }
    }

    const handleCancel = () => {
        navigate(`/item/${id}`)
    }
   
    return <form className="budget-tracker-form" onSubmit={handleSave}>
        <div className="budget-tracker-form__group">
            <label className="budget-tracker-form__label">Description</label>
            <input
                className="budget-tracker-form__input"
                type="text"
                name="description"
                value={form.description || ""}
                onChange={handleChange}
                required
                style={{width:'100%'}}
            />                
        </div>
        <div className="budget-tracker-form__group">
            <label className="budget-tracker-form__label">Amount</label>
            <input
                className="budget-tracker-form__input"
                type="number"
                name="amount"
                value={form.amount ?? 0}
                onChange={handleChange}
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
                name="date"
                value={form.date || ""}
                onChange={handleChange}
                required
                style={{width:'100%'}}
            />
        </div>
        <div className="budget-tracker-form__group">
            <label className="budget-tracker-form__label">Category</label>
            <select
                className="budget-tracker-form__select"
                value={form.category}
                name="category"
                onChange={handleChange}
                style={{width:'100%'}}
            >
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
            </select>
        </div>

        <button type="submit">Save</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
    </form>
}

export default BudgetItemEdit;