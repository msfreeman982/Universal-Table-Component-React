const BASE_BUTTON_STYLES = 'px-3 py-1 text-white rounded text-md';
const BUTTON_STYLES = `${BASE_BUTTON_STYLES} bg-blue-600`;
const DISABLE_BUTTON_STYLES = `${BASE_BUTTON_STYLES} bg-gray-500`;
const RED_BUTTON_STYLES = `${BASE_BUTTON_STYLES} bg-red-600 hover:bg-red-700`;

const getButtonClass = (type) => {
    if (type === 'gray') return DISABLE_BUTTON_STYLES;
    if (type === 'red') return RED_BUTTON_STYLES;
    return BUTTON_STYLES;
};

export const Button = ({ children, type, ...props }) => {
    const buttonClass = getButtonClass(type);

    return (
        <button className={buttonClass} {...props}>
            {children}
        </button>
    );
};

export default Button;
