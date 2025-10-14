export function Card({ children, className = "" }) {
    return (
        <div className={` shadow rounded-2xl ${className}`}>
            {children}
        </div>
    )
}

export function CardHeader({ children, className = "" }) {
    return <div className={`border-b p-3 font-semibold ${className}`}>{children}</div>
}

export function CardContent({ children, className = "" }) {
    return <div className={`p-3 ${className}`}>{children}</div>
}
