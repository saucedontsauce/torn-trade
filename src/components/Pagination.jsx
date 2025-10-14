import { useEffect } from "react";

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    maxVisible = 9,
}) {
    if (totalPages <= 1) return null;

    // Handle key navigation (← / →)
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "ArrowLeft" && currentPage > 1) {
                onPageChange(currentPage - 1);
            } else if (e.key === "ArrowRight" && currentPage < totalPages) {
                onPageChange(currentPage + 1);
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [currentPage, totalPages, onPageChange]);

    const handleClick = (page) => {
        if (page < 1 || page > totalPages) return;
        onPageChange(page);
    };

    // Build page list
    const visiblePages = [];
    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    if (currentPage <= half) {
        end = Math.min(totalPages, maxVisible);
    } else if (currentPage + half >= totalPages) {
        start = Math.max(1, totalPages - maxVisible + 1);
    }

    if (start > 1) {
        visiblePages.push(1);
        if (start > 2) visiblePages.push("...");
    }

    for (let i = start; i <= end; i++) visiblePages.push(i);

    if (end < totalPages) {
        if (end < totalPages - 1) visiblePages.push("...");
        visiblePages.push(totalPages);
    }

    return (
        <div
            className="flex flex-wrap justify-center mt-6 gap-2"
            role="navigation"
            aria-label="Pagination Navigation"
        >
            {/* Prev */}
            <button
                onClick={() => handleClick(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous Page"
                className={`px-3 py-1 rounded border border-gray-700 transition ${currentPage === 1
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-gray-800 hover:bg-gray-700 text-gray-100"
                    }`}
            >
                Prev
            </button>

            {/* Page Buttons */}
            {visiblePages.map((page, i) =>
                page === "..." ? (
                    <span
                        key={`ellipsis-${i}`}
                        className="px-2 py-1 text-gray-500 select-none"
                    >
                        ...
                    </span>
                ) : (
                    <button
                        key={page}
                        onClick={() => handleClick(page)}
                        aria-label={`Go to page ${page}`}
                        className={`px-3 py-1 rounded border border-gray-700 transition ${currentPage === page
                            ? "bg-blue-600 text-white font-semibold"
                            : "bg-gray-800 hover:bg-gray-700 text-gray-100"
                            }`}
                    >
                        {page}
                    </button>
                )
            )}

            {/* Next */}
            <button
                onClick={() => handleClick(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next Page"
                className={`px-3 py-1 rounded border border-gray-700 transition ${currentPage === totalPages
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-gray-800 hover:bg-gray-700 text-gray-100"
                    }`}
            >
                Next
            </button>
        </div>
    );
}
