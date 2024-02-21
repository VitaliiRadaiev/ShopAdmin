import { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    defaultValue?: string;
    errorState: boolean;
}

