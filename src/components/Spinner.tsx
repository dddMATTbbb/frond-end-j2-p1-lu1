export default function Spinner({ className = "h-10 w-10 border-t-blue-500" }) {
    return (
        <div
            role="status"
            aria-label="Laden"
            className={`animate-spin rounded-full border-4 border-gray-200 ${className}`}
        />
    );
}