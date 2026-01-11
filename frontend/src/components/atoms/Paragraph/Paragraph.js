export const Paragraph = ({ children, ...props }) => {
    return (
        <p className="mt-4 text-gray-600" {...props}>
            {children}
        </p>
    );
};
