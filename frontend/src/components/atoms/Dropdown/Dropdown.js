const PLACEHOLDER_TEXT = 'Please select';
const ERROR_MESSAGE_STYLES = 'absolute top-full left-0 mt-1 text-red-500 text-xs';
const DROPDOWN_BASE_STYLES = 'px-3 py-2 border rounded-md';

const getDropdownClassName = (hasError) => `${DROPDOWN_BASE_STYLES} ${hasError ? 'border-red-500' : 'border-gray-300'}`;

export const Dropdown = ({ label, error, value, onChange, options, ...props }) => {
    const hasError = error && error.length > 0;

    return (
        <div className="relative mb-3">
            {label && <label className="sr-only">{label}</label>}
            <select
                className={getDropdownClassName(hasError)}
                value={value || ''}
                onChange={(e) => onChange && onChange(e.target.value)}
                {...props}
            >
                <option value="">{PLACEHOLDER_TEXT}</option>
                {options?.map(({ value, label }) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
                ))}
            </select>
            {hasError && <div className={ERROR_MESSAGE_STYLES}>{error}</div>}
        </div>
    );
};
