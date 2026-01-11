import {
    PREV_BUTTON_TEXT,
    NEXT_BUTTON_TEXT,
    PREV_BUTTON_ARIA_LABEL,
    PAGE_BUTTON_ARIA_LABEL,
    NEXT_BUTTON_ARIA_LABEL,
    PREV_BUTTON_BASE_CLASSES,
    PAGE_BUTTON_BASE_CLASSES,
    NEXT_BUTTON_BASE_CLASSES,
} from './data';

export const Pagination = ({ pagination, setPage }) => {
    if (!pagination) return null;

    const { page, totalPages, hasNext, hasPrev } = pagination;

    const prev = () => {
        if (!hasPrev) return;
        setPage(page - 1);
    };

    const next = () => {
        if (!hasNext) return;
        setPage(page + 1);
    };

    return (
        <nav aria-label="Pagination">
            <div className="flex gap-2 my-2">
                <button
                    type="button"
                    className={`${PREV_BUTTON_BASE_CLASSES} ${!hasPrev ? 'cursor-not-allowed opacity-50' : ''}`}
                    onClick={prev}
                    aria-label={PREV_BUTTON_ARIA_LABEL()}
                    aria-disabled={!hasPrev}
                    disabled={!hasPrev}
                >
                    {PREV_BUTTON_TEXT}
                </button>
                {Array.from({ length: totalPages }, (_, i) => {
                    const pageNum = i + 1;
                    const isActive = page === pageNum;
                    return (
                        <button
                            key={pageNum}
                            type="button"
                            className={[PAGE_BUTTON_BASE_CLASSES, isActive && '!bg-blue-600 text-white hover:bg-blue-700'].filter(Boolean).join(' ')}
                            onClick={() => setPage(pageNum)}
                            aria-label={PAGE_BUTTON_ARIA_LABEL(pageNum)}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            {pageNum}
                        </button>
                    );
                })}
                <button
                    type="button"
                    className={`${NEXT_BUTTON_BASE_CLASSES} ${!hasNext ? 'cursor-not-allowed opacity-50' : ''}`}
                    onClick={next}
                    aria-label={NEXT_BUTTON_ARIA_LABEL()}
                    aria-disabled={!hasNext}
                    disabled={!hasNext}
                >
                    {NEXT_BUTTON_TEXT}
                </button>
            </div>
        </nav>
    );
};
