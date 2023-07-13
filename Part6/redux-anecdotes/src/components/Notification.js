/** @format */

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { clearNotification } from "../slices/notificationSlice";

const Notification = () => {
  const notification = useSelector((state) => state.notifications);

  const dispatch = useDispatch();

  useEffect(() => {
    if (notification) {
      const timeout = setTimeout(() => {
        dispatch(clearNotification());
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [notification, dispatch]);

  if (!notification) return null;

  return (
    <div className='flex flex-row items-center my-8'>
      <div className='text-2xl font-bold bg-slate-600 py-8 px-40 rounded-xl '>
        {notification}
      </div>
    </div>
  );
};

export default Notification;
