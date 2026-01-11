export const PREV_BUTTON_TEXT = 'Previous';
export const NEXT_BUTTON_TEXT = 'Next';
export const PREV_BUTTON_ARIA_LABEL = () => 'Previous page';
export const PAGE_BUTTON_ARIA_LABEL = (pageNum) => `Page ${pageNum}`;
export const NEXT_BUTTON_ARIA_LABEL = () => 'Next page';

export const BUTTON_BASE_CLASSES = 'px-3 py-1 text-gray-700 rounded text-md bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500';
export const PREV_BUTTON_BASE_CLASSES = `${BUTTON_BASE_CLASSES} disabled:bg-gray-100`;
export const PAGE_BUTTON_BASE_CLASSES = BUTTON_BASE_CLASSES;
export const NEXT_BUTTON_BASE_CLASSES = `${BUTTON_BASE_CLASSES} disabled:bg-gray-100`;
