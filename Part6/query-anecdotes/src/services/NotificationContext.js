/** @format */

import React, { createContext, useReducer } from "react";

const initialState = {
  notification: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return { ...state, notification: action.payload };
    case "CLEAR_NOTIFICATION":
      return { ...state, notification: null };
    default:
      return state;
  }
};

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setNotification = (message) => {
    dispatch({ type: "SET_NOTIFICATION", payload: message });
  };

  const clearNotification = () => {
    dispatch({ type: "CLEAR_NOTIFICATION" });
  };

  return (
    <NotificationContext.Provider
      value={{
        notification: state.notification,
        setNotification,
        clearNotification,
      }}>
      {children}
    </NotificationContext.Provider>
  );
};
