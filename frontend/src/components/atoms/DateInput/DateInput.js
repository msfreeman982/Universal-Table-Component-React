const BASE_INPUT_STYLES = 'w-full rounded-md border px-3 py-2 text-gray-600';
const ERROR_INPUT_BORDER = 'border-red-500';
const NORMAL_INPUT_BORDER = 'border-gray-300';
const EROR_STYLES = 'absolute top-full left-0 mt-1 text-red-500 text-xs';

export const DateInput = ({ label, error, ...props }) => {
    const hasError = error && error.length > 0;

    return (
        <div className="relative mb-3">
            {label && <label className="sr-only">{label}</label>}
            <input
                type="date"
                className={`${BASE_INPUT_STYLES} ${hasError ? ERROR_INPUT_BORDER : NORMAL_INPUT_BORDER}`}
                {...props}
            />
            {hasError && <div className={EROR_STYLES}>{error}</div>}
        </div>
    );
};
