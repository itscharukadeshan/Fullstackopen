/** @format */

import React from "react";

function Notification({ message }) {
  return (
    <div className='text-green-700 font-serif font-bold text-3xl mt-3 bg-slate-400 p-8 border-solid border-4 border-green-700'>
      Added {message} to the phone book
    </div>
  );
}

export default Notification;
