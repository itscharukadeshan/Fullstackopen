/** @format */

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className=' text-red-700 text-2xl bg-slate-400 border-solid border-red-700 border-4 rounded-md p-8  mb-10'>
      {message}
    </div>
  );
};

export default Notification;
