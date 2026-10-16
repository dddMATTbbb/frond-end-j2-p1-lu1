interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    disabled?: boolean;
}

type PageItem =
    | { type: 'page'; value: number }
    | { type: 'ellipsis'; key: string };

function getPageItems(currentPage: number, totalPages: number): PageItem[] {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => ({ type: 'page', value: i + 1 }));
    }
    if (currentPage <= 4) {
        return [
            { type: 'page', value: 1 },
            { type: 'page', value: 2 },
            { type: 'page', value: 3 },
            { type: 'page', value: 4 },
            { type: 'page', value: 5 },
            { type: 'ellipsis', key: 'ellipsis-end' },
            { type: 'page', value: totalPages },
        ];
    }
    if (currentPage >= totalPages - 3) {
        return [
            { type: 'page', value: 1 },
            { type: 'ellipsis', key: 'ellipsis-start' },
            { type: 'page', value: totalPages - 4 },
            { type: 'page', value: totalPages - 3 },
            { type: 'page', value: totalPages - 2 },
            { type: 'page', value: totalPages - 1 },
            { type: 'page', value: totalPages },
        ];
    }
    return [
        { type: 'page', value: 1 },
        { type: 'ellipsis', key: 'ellipsis-start' },
        { type: 'page', value: currentPage - 1 },
        { type: 'page', value: currentPage },
        { type: 'page', value: currentPage + 1 },
        { type: 'ellipsis', key: 'ellipsis-end' },
        { type: 'page', value: totalPages },
    ];
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    disabled = false,
}: PaginationProps) {
    if (totalPages <= 1) {
        return null;
    }

    const items = getPageItems(currentPage, totalPages);

    return (
        <nav aria-label="Paginering" className="flex items-center justify-center gap-2 my-8 w-full select-none">
            <button
                type="button"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={disabled || currentPage <= 1}
                aria-label="Vorige pagina"
                className="px-3.5 py-1.5 rounded-lg border-2 border-gray-300 bg-white text-gray-700 font-medium transition duration-200 hover:bg-gray-100 hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300"
            >
                &larr; Vorige
            </button>

            <div className="flex items-center gap-1">
                {items.map((item) => {
                    if (item.type === 'ellipsis') {
                        return (
                            <span
                                key={item.key}
                                className="px-2 py-1 text-gray-500 font-bold"
                            >
                                ...
                            </span>
                        );
                    }

                    const isCurrent = item.value === currentPage;

                    return (
                        <button
                            key={`page-${item.value}`}
                            type="button"
                            onClick={() => onPageChange(item.value)}
                            disabled={disabled}
                            aria-current={isCurrent ? 'page' : undefined}
                            aria-label={`Pagina ${item.value}`}
                            className={`min-w-10 h-10 px-3 rounded-lg border-2 font-medium transition duration-200 ${
                                isCurrent
                                    ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400'
                            } disabled:opacity-40 disabled:cursor-not-allowed`}
                        >
                            {item.value}
                        </button>
                    );
                })}
            </div>

            <button
                type="button"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={disabled || currentPage >= totalPages}
                aria-label="Volgende pagina"
                className="px-3.5 py-1.5 rounded-lg border-2 border-gray-300 bg-white text-gray-700 font-medium transition duration-200 hover:bg-gray-100 hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300"
            >
                Volgende &rarr;
            </button>
        </nav>
    );
}
