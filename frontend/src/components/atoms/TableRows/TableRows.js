import { Button } from '../Button/Button';

const TABLE_CELL_CLASSES = 'border-b border-gray-300 px-4 py-3 text-sm text-gray-900';

const TABLE_ROW_CLASSES = (rowIndex) =>
    `${rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'} transition-colors hover:bg-gray-100`;

const renderCell = (col, row, editMode, editingRow, editFormData, editRow, onEditFormChange, editErrors) => {
    const value = row[col.key];

    if (editMode && editingRow === row.id && editRow?.find(field => field.key === col.key)) {
        const editField = editRow.find(field => field.key === col.key);
        const { renderInput } = require('@/utils/inputRenderer');
        return renderInput(editField, editFormData[col.key] || value, onEditFormChange, editErrors?.[col.key]);
    }

    if (col.render) return col.render(value, row);

    return value || 'N/A';
};

export const TableRows = ({ data, columns, editMode, editingRow, editFormData, editRow, onDelete, onEdit, onEditFormChange, editErrors }) => {
    if (!data || !Array.isArray(data) || data.length === 0) {
        return null;
    }

    return (
        <>
            {data?.map((row, rowIndex) => (
                <tr key={rowIndex} className={TABLE_ROW_CLASSES(rowIndex)}>
                    {columns?.map((col, colIndex) => (
                        <td className={TABLE_CELL_CLASSES} key={col.key || colIndex}>
                            {renderCell(col, row, editMode, editingRow, editFormData, editRow, onEditFormChange, editErrors)}
                        </td>
                    )) || null}
                    {(onEdit || onDelete) && (
                        <td className={TABLE_CELL_CLASSES}>
                            <div className="flex gap-1">
                                {onEdit && editMode && (
                                    <Button
                                        type={editingRow === row.id ? "green" : "blue"}
                                        onClick={() => onEdit(row)}
                                        className="text-xs px-2 py-1"
                                    >
                                        {editingRow === row.id ? "" : "Edit"}
                                    </Button>
                                )}
                                {onDelete && (
                                    <Button
                                        type="red"
                                        onClick={() => onDelete(row)}
                                        className="text-xs px-2 py-1"
                                    >
                                        X
                                    </Button>
                                )}
                            </div>
                        </td>
                    )}
                </tr>
            )) || null}
        </>
    );
};
