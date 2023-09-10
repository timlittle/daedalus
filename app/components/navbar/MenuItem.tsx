"use client";
import { IconType } from "react-icons";

interface MenuItemProps {
  action: () => void;
  actionLabel: string;
  icon?: IconType;
}

const MenuItem: React.FC<MenuItemProps> = ({ action, actionLabel, icon: Icon }) => {
  // Custome menuitem component
  // Injects data for tests (data-cy) and setups classes for styling
  // Icon is optional
  return (
    <div
      data-cy={`menuitem-${actionLabel.split(" ").join("-").toLowerCase()}`}
      tabIndex={-1}
      className="dropdown-item flex flex-row gap-4 justify-between"
      onClick={action}
    >
      {actionLabel}
      {Icon && <Icon size={16} />}
    </div>
  );
};

export default MenuItem;
