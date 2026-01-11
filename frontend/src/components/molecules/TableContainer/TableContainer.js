import { Loader } from '@/components/atoms/Loader/Loader';

export const TableContainer = ({ children, loading, className = '', ...props }) => {
    return (
        <div className={`relative ${className}`} {...props}>
            <div className="overflow-x-auto">{children}</div>
            {loading && <Loader loading={loading} />}
        </div>
    );
};
