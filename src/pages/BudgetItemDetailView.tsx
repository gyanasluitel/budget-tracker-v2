import { useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import type { BudgetItem } from "./BudgetFormPage";
import "./BudgetItemDetailView.css";
import { useBudgetContext } from "../context/BudgetContextProvider";

const BudgetItemDetailView = () => {
    const { id } = useParams();
    const { deleteBudgetItem } = useBudgetContext();
    const navigate = useNavigate();

    const item = useMemo(() => {
        const items = localStorage.getItem("budgetItems");
        if (items) {
            const parsedItems: BudgetItem[] = JSON.parse(items);
            return parsedItems.find(item => item.id === id);
        }

        return null;
    }, [id])

    const onDelete = (id: string) => {
        try {
            deleteBudgetItem(id);
            navigate("/");
        }
        catch (error) {
            console.log("Error deleting item: ", error);
        }
    }

    const handleEdit = () => {
        navigate(`/item/${id}/edit`);
    }

    if (!item) {
        return <div>Budget item not found</div>
    }

    return (
        <div className="budget-item-detail">
            <h2>Budget Item Detail</h2>
            <ul className="budget-item-detail__list">
                <li className="budget-item-detail__item">
                    <p className="budget-item-detail__item-title">Description:</p>
                    <p className="budget-item-detail__item-content">{item.description}</p>
                </li>
                <li className="budget-item-detail__item"><p className="budget-item-detail__item-title">Amount:</p><p className="budget-item-detail__item-content">${item.amount}</p></li>
                <li className="budget-item-detail__item"><p className="budget-item-detail__item-title">Date:</p><p className="budget-item-detail__item-content">{item.date}</p></li>
                <li className="budget-item-detail__item"><p className="budget-item-detail__item-title">Category:</p><p className="budget-item-detail__item-content">{item.category}</p></li>

                <button className="budget-item-detail__btn" onClick={handleEdit} >Edit</button>
                <button className="budget-item-detail__btn budget-item-detail__delete-btn" onClick={() => onDelete(item.id)} >Delete</button>
            </ul>
        </div>
    )
}


export default BudgetItemDetailView;