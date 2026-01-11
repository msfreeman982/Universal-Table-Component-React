const FOOTER_CLASSES = 'border-t border-gray-300 px-4 py-3 text-sm font-medium text-gray-700';

export const TableFooter = ({ total }) => {
    return (
        <tfoot className="bg-gray-50">
            <tr>
                <td colSpan="100%" className={FOOTER_CLASSES}>
                    {total}
                </td>
            </tr>
        </tfoot>
    );
};
