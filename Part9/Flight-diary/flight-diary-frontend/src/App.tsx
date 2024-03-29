/** @format */
import { useState, useEffect } from "react";
import axios from "axios";

import { Entry } from "./types";

import DiaryEntry from "./components/DiaryEntry";
import NewDiaryEntry from "./components/NewDiaryEntry";

function App() {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get<Entry[]>(
          "http://localhost:3000/api/diaries"
        );
        setEntries(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEntries();
  }, []);

  return (
    <main className='flex flex-col p-8'>
      <NewDiaryEntry />
      <DiaryEntry entries={entries} />
    </main>
  );
}

export default App;
