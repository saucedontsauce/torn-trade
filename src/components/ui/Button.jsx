export function Button({ children, onClick, type = "button", className = "", variant = "default", disabled }) {
    const base = "rounded-lg px-4 py-2 font-medium transition-all"
    const styles = variant === "outline"
        ? "border border-gray-300 text-gray-700 hover:bg-gray-100"
        : "bg-blue-600 text-white hover:bg-blue-700"

    return (
        <button type={type} onClick={onClick} disabled={disabled}
            className={`${base} ${styles} ${className}`}>
            {children}
        </button>
    )
}
