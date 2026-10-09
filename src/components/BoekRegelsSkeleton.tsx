export default function BoekRegelsSkeleton() {
    return (
        <>
            <p aria-busy="true">
                Titel boek:{" "}
                <span className="inline-block h-4 w-48 align-middle rounded bg-gray-300 animate-pulse" />
            </p>
            <p aria-busy="true">
                Auteur boek:{" "}
                <span className="inline-block h-4 w-36 align-middle rounded bg-gray-300 animate-pulse" />
            </p>
            <p aria-busy="true">
                Omschrijving:{" "}
                <span className="inline-block h-4 w-72 align-middle rounded bg-gray-300 animate-pulse" />
            </p>
        </>
    );
}