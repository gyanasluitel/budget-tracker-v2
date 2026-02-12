import { Outlet } from "react-router";

const BudgetItemDetailLayout = () => {
    return (
        <div>
            {/* This is just a placeholder for different components to be rendered based on the nested route. Please select an option above. */}
            <Outlet />
        </div>
    )
}

export default BudgetItemDetailLayout;