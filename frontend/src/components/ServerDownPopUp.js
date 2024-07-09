


const ServerDownPopup = ({ isVisible,onclose}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2>Server Down</h2>
        <p>It looks like the server is currently down. Please try again later.</p>
        <button onClick={onclose}>close</button>
      </div>

    </div>
  );
};

export default ServerDownPopup;
