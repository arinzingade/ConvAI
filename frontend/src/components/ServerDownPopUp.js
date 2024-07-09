


const ServerDownPopup = ({ isVisible,onclose}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-red-400 w-1/2 h-1/3 p-5 rounded-xl shadow-lg flex flex-col justify-around items-center">
      <div className="w-full text-xl text-white">
      <h2>Server Down</h2>
      <p>It looks like the server is currently down. Please try again later.</p>
      </div>
      
        <button onClick={onclose} className="border-2 border-black w-1/4">close</button>
      </div>

    </div>
  );
};

export default ServerDownPopup;
