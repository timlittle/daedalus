"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({ id, label, type = "text", disabled, required, register, errors }) => {
  // Input component used across the plaform
  // Includes feedback to the user when errors occur when submitting forms
  // Passes in the register for the use-hook-form firms
  return (
    <div className="w-full relative">
      <input
        data-cy={`input-${id}`}
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        type={type}
        className={`
                input
                peer
                p-4
                pt-10
                max-w-full
                ${errors[id] ? "border-rose-500" : "border-neutral-300"}
                ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
                `}
      />
      <label
        className={`
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
                ${errors[id] ? "text-rose-500" : "text-zinc-400"}
                peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0
                peer-focus:scale-75
                peer-focus:-translate-y-4
            `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
