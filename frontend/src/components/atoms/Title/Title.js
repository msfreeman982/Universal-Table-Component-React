const H1_STYLES = 'text-xl text-gray-400';

const LevelH1 = ({ children, ...props }) => (
    <h1 className={H1_STYLES} {...props}>
        {children}
    </h1>
);

export const Title = ({ children, level = 1, ...props }) => {
    if (level === 1) return <LevelH1 {...props}>{children}</LevelH1>;

    return children;
};
