export const StatusBadge = ({ status }) => {
  const getStatusColors = (status) => {
    const colors = {
      planned: 'bg-gray-100 text-gray-700',
      active: 'bg-blue-100 text-blue-700',
      on_hold: 'bg-yellow-100 text-yellow-700',
      completed: 'bg-green-100 text-green-700',
      archived: 'bg-gray-100 text-gray-500',
      todo: 'bg-gray-100 text-gray-700',
      in_progress: 'bg-blue-100 text-blue-700',
      in_review: 'bg-yellow-100 text-yellow-700',
      done: 'bg-green-100 text-green-700'
    };
    return colors[status] || colors.planned;
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColors(status)}`}>
      {status.replace('_', ' ')}
    </span>
  );
};