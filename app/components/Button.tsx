"use client";

import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled, outline, icon: Icon }) => {
  return (
    <button
    data-cy={`button-${label.toLowerCase()}`}
      onClick={onClick}
      disabled={disabled}
      className={`    
            btn
            w-full
            ${outline ? "btn-outline-primary" : "btn-primary"}

        `}
    >
      {Icon && <Icon size={24} className="absolute left-4" />}
      {label}
    </button>
  );
};

export default Button;
