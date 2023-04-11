export type ErrorMessageProps = {
    message: string,
};

export function ErrorMessage({ message } : ErrorMessageProps) {
    return <span className="text-red-600">{message === "Invalid date"? "Data inválida" : message}</span>
}