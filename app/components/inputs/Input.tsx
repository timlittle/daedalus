'use client';

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
    id,
    label,
    type = "text",
    disabled,
    required,
    register,
    errors
}) => {
    return ( 
        <div className="w-full relative">
            <input 
                id={id}
                disabled={disabled}
                { ...register(id, {required})}
                placeholder=" "
                type={type}
                className={`
                input
                peer
                p-4
                pt-10
                max-w-full
                ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
                ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
                `}
            />
            <label className={`
                form-label
                absolute
                text-md
                duration-150
                left-3
                transform
                -translate-y-3
                top-5
                z-10
                origin-[0]
                ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}
                peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0
                peer-focus:scale-75
                peer-focus:-translate-y-4
            `}>
                {label}
            </label>
        </div> 
    );
}
 
export default Input; 