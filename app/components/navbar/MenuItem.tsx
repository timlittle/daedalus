
interface MenuItemProps {
    action: () => void;
    actionLabel: string
}

const MenuItem: React.FC<MenuItemProps> = ({ action, actionLabel }) => {
    return (
        <div tabIndex={-1} className="dropdown-item" onClick={action}>{actionLabel}</div>
    );
}
 
export default MenuItem;