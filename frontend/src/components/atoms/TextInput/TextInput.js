const ERROR_MESSAGE_CLASSES = 'absolute top-full left-0 mt-1 text-red-500 text-xs';

const getInputClasses = (hasError) =>
    `w-full rounded-md border px-3 py-2 ${hasError ? 'border-red-500' : 'border-gray-300'}`;

export const TextInput = ({ label, error, ...props }) => {
    const hasError = error && error.length > 0;

    return (
        <div className="relative mb-3">
            {label && <label className="sr-only">{label}</label>}
            <input type="text" className={getInputClasses(hasError)} {...props} />
            {hasError && <div className={ERROR_MESSAGE_CLASSES}>{error}</div>}
        </div>
    );
};
