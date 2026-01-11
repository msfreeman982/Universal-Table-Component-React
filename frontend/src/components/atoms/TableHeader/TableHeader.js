const TABLE_CLASS_NAME =
    'border-b border-gray-300 px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500';

const ACTION_TITLE = '';

export const TableHeader = ({ columns, showEditColumn, showDeleteColumn }) => {
    return (
        <thead className="bg-gray-50">
            <tr>
                {columns?.map((col, index) => (
                    <th className={TABLE_CLASS_NAME} key={col.key || index}>
                        {col.title}
                    </th>
                ))}
                {(showEditColumn || showDeleteColumn) && (
                    <th className={TABLE_CLASS_NAME}>
                        {ACTION_TITLE}
                    </th>
                )}
            </tr>
        </thead>
    );
};
