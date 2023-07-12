/** @format */

import { setFilter } from "../reducers/filterReducer";
import { useDispatch } from "react-redux";

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const inputText = event.target.value;
    dispatch(setFilter(inputText));
  };

  return (
    <div className='font-bold'>
      Filter{" "}
      <input
        className='input input-info input-sm'
        name='filter'
        onChange={handleChange}
      />
    </div>
  );
};

export default Filter;
