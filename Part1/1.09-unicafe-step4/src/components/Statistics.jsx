/** @format */

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total || 0;
  const positive = (good / total) * 100 || 0;

  return (
    <>
      {total === 0 ? (
        <p>No feedback given</p>
      ) : (
        <>
          <h1>statistics</h1>
          <p>Good: {good}</p>
          <p>Neutral: {neutral}</p>
          <p>Bad: {bad}</p>
          <p>All: {total}</p>
          <p>Average: {average}</p>
          <p>Positive: {positive}%</p>
        </>
      )}
    </>
  );
};

export default Statistics;
