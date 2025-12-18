const InfoNode = ({ data }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl border p-4 w-56">
      {/* Title row */}
      <div className="flex items-center gap-2 mb-2">
        {data.icon && (
          <img src={data.icon} className="w-6 h-6" alt="icon" />
        )}
        <h3 className="font-semibold text-gray-900 text-lg">{data.label}</h3>
      </div>

      {/* Description */}
      {data.description && (
        <p className="text-sm text-gray-700 leading-snug">
          {data.description}
        </p>
      )}

      {/* Additional info */}
      {data.role && (
        <span className="mt-2 inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
          {data.role}
        </span>
      )}
    </div>
  );
};

export default InfoNode;
