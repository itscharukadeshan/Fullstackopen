/** @format */

const Filter = () => {
  const handleChange = (event) => {
    event.preventDefault();
  };

  return (
    <div className='font-bold'>
      Filter{" "}
      <input className='input input-info input-sm' onChange={handleChange} />
    </div>
  );
};

export default Filter;
