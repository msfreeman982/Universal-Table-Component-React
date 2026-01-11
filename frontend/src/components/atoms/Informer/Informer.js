const SPACES_STYLES = 'p-4 text-white rounded-md mb-3 font-bold';

export const Informer = ({ text, textError }) => {
    if (text) return <div className={`bg-blue-500 ${SPACES_STYLES}`}>{text}</div>;
    if (textError) return <div className={`bg-red-400 ${SPACES_STYLES}`}>{textError}</div>;

    return null;
};
