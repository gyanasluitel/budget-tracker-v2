import type { BudgetItem } from "../pages/BudgetFormPage";

export interface ExtendedBudgetItem extends BudgetItem {
    // Add any additional properties or methods if needed
    medium: "Cash" | "Card" | "Online";

}

interface Props {
    budgetItems?: BudgetItem[];
}

const useBudgetTracker = ({ budgetItems }: Props) => {
    const newBudgetItems : ExtendedBudgetItem[] = budgetItems? budgetItems.map(item => {
        return {
            ...item,
            medium: "Cash"
        }
    }) : [];

    return {
        newBudgetItems
    }
}

export default useBudgetTracker;