/** @format */

import React, { useEffect } from "react";

const Notification = ({ message, clearNotification }) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        clearNotification();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message, clearNotification]);

  if (!message) return null;

  return <div style={style}>{message}</div>;
};

export default Notification;
