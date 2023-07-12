/** @format */

import { filterChange } from "../reducers/filterReducer";
import { useDispatch } from "react-redux";

const VisibilityFilter = (props) => {
  const dispatch = useDispatch();

  const inputStyle =
    "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500";

  return (
    <div className='flex flex-row items-center  gap-2 my-6 text-lg font-mono font-bold '>
      <input
        className={inputStyle}
        type='radio'
        name='filter'
        onChange={() => dispatch(filterChange("ALL"))}
      />
      All
      <input
        className={inputStyle}
        type='radio'
        name='filter'
        onChange={() => dispatch(filterChange("IMPORTANT"))}
      />
      Important
      <input
        className={inputStyle}
        type='radio'
        name='filter'
        onChange={() => dispatch(filterChange("NONIMPORTANT"))}
      />
      Nonimportant
    </div>
  );
};

export default VisibilityFilter;
