/** @format */

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total || 0;
  const positive = (good / total) * 100 || 0;

  return (
    <>
      <p>All: {total}</p>
      <p>Average: {average}</p>
      <p>Positive: {positive}%</p>
    </>
  );
};

export default Statistics;
