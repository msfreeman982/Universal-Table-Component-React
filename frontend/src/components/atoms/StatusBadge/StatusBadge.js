const BASE_BADGE_STYLES = 'px-2 py-1 rounded-md text-sm font-semibold text-white';

const StatusBadge = ({ status, children, ...props }) => {
  let colorClass = '';

  if (status === 'Active') colorClass = 'bg-green-500';
  else if (status === 'Discharged') colorClass = 'bg-red-500';
  else if (status === 'Pending') colorClass = 'bg-yellow-500';
  else if (status === 'Canceled') colorClass = 'bg-gray-500';
  else colorClass = 'bg-gray-500';

  return (
    <span className={`${BASE_BADGE_STYLES} ${colorClass}`} {...props}>
      {children}
    </span>
  );
};

export default StatusBadge;
