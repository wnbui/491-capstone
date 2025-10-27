export const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-md' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`bg-white rounded-xl p-8 ${maxWidth} w-full shadow-2xl max-h-screen overflow-y-auto`}>
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            >
              ×
            </button>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};