export default function StudentCardSkeleton() {
    return (
        <div
            className="flex flex-col h-fit w-fit border-3 rounded-md py-3 px-1 animate-pulse"
            aria-busy="true"
            aria-label="Student laden"
        >
            {/* Afbeelding placeholder (zelfde breedte als w-60, vierkant als aanname) */}
            <div className="w-60 aspect-square rounded-md bg-gray-300" />

            {/* Email regel */}
            <div className="h-4 w-48 mt-2 rounded bg-gray-300" />

            {/* Knop placeholder */}
            <div className="h-10 w-full mt-4 rounded-md bg-gray-300" />
        </div>
    )
}