export const TaskCard = ({ task, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-gray-50 rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition border border-gray-200"
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-gray-900 text-sm">{task.title}</h4>
        <span className="text-xs text-gray-500">{task.points}pts</span>
      </div>
      <p className="text-xs text-gray-600 line-clamp-2">{task.description}</p>
    </div>
  );
};