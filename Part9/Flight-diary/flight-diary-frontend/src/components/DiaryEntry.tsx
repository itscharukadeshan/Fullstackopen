/** @format */
import { Entry } from "../types";

interface DiaryEntryProps {
  entries: Entry[];
}

function DiaryEntry(props: DiaryEntryProps) {
  const { entries } = props;

  return (
    <>
      <h1 className='text-3xl my-4 mx-2 font-bold'>Diary entries</h1>
      <div>
        {entries.map((entry) => (
          <div className='my-8 mx-4' key={entry.id}>
            <h2 className='text-lg font-mono font-bold my-2'>{entry.date}</h2>
            <p> Visibility : {entry.weather}</p>
            <p>Wether: {entry.visibility}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default DiaryEntry;
