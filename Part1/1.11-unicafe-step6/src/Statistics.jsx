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
          <table>
            <tbody>
              <tr>
                <td>Good:</td>
                <td>{good}</td>
              </tr>
              <tr>
                <td>Neutral:</td>
                <td>{neutral}</td>
              </tr>
              <tr>
                <td>Bad:</td>
                <td>{bad}</td>
              </tr>
              <tr>
                <td>All:</td>
                <td>{total}</td>
              </tr>
              <tr>
                <td>Average:</td>
                <td>{average}</td>
              </tr>
              <tr>
                <td>Positive:</td>
                <td>{positive}%</td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default Statistics;
