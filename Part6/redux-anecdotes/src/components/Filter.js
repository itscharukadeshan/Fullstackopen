/** @format */

import { setFilter } from "../slices/filterSlice";
import { useDispatch } from "react-redux";

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const inputText = event.target.value;
    dispatch(setFilter(inputText));
  };

  return (
    <div className='font-bold my-8'>
      Filter{"  "}
      <input
        className='input input-info input-sm'
        name='filter'
        onChange={handleChange}
      />
    </div>
  );
};

export default Filter;
