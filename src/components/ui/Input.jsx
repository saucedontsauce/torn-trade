export function Input({ value, onChange, placeholder, type = "text", className = "", ...props }) {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none ${className}`}
            {...props}
        />
    )
}
