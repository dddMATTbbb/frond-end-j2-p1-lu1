export default function BoekCardSkeleton() {
    return (
        <div className="w-64 p-4 rounded-lg border border-gray-200 animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-3" />
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-6" />
            <div className="flex gap-2">
                <div className="h-8 w-8 bg-gray-300 rounded-full" />
                <div className="h-8 w-8 bg-gray-300 rounded-full" />
            </div>
        </div>
    );
}