/** @format */
import { useState, useEffect } from "react";
import axios from "axios";
import { NewEntry } from "../types";

function NewDiaryEntry() {
  const [visibility, setVisibility] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    if (errorMsg) {
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
    }
  }, [errorMsg]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const entry: NewEntry = {
      visibility,
      weather,
      comment,
      date,
    };
    try {
      await axios.post("http://localhost:3000/api/diaries", entry);

      setComment("");
      setDate("");
      setVisibility("");
      setWeather("");
    } catch (error) {
      setErrorMsg((error as any).response.data);
    }
  };

  return (
    <>
      <h1 className='text-3xl my-4 mx-2 font-bold'>Add new entry</h1>
      {errorMsg && <p className='text-warning'>{errorMsg}</p>}

      <form onSubmit={handleSubmit} className='mx-4'>
        <div className='my-2'>
          <label htmlFor='date'>Date : </label>

          <input
            className='input'
            type='date'
            id='date'
            name='date'
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>

        <fieldset>
          <legend className='my-4'>Visibility</legend>
          <div className='my-2'>
            <input
              type='radio'
              id='great'
              name='visibility'
              value='great'
              onChange={(event) => setVisibility(event.target.value)}
            />
            <label className='ml-2 mr-4' htmlFor='great'>
              Grate
            </label>
            <input
              type='radio'
              id='good'
              name='visibility'
              value='good'
              onChange={(event) => setVisibility(event.target.value)}
            />
            <label className='ml-2 mr-4' htmlFor='good'>
              Good
            </label>
            <input
              type='radio'
              id='ok'
              name='visibility'
              value='ok'
              onChange={(event) => setVisibility(event.target.value)}
            />
            <label className='ml-2 mr-4' htmlFor='ok'>
              Ok
            </label>
            <input
              type='radio'
              id='poor'
              name='visibility'
              value='poor'
              onChange={(event) => setVisibility(event.target.value)}
            />
            <label className='ml-2 mr-4' htmlFor='poor'>
              Poor
            </label>
          </div>
        </fieldset>
        <fieldset>
          <legend className='my-4'>Whether</legend>
          <div className='my-2'>
            <input
              type='radio'
              id='sunny'
              name='whether'
              value='sunny'
              onChange={(event) => setWeather(event.target.value)}
            />
            <label className='ml-2 mr-4' htmlFor='sunny'>
              Sunny
            </label>

            <input
              type='radio'
              id='rainy'
              name='whether'
              value='rainy'
              onChange={(event) => setWeather(event.target.value)}
            />
            <label className='ml-2 mr-4' htmlFor='rainy'>
              Rainy
            </label>

            <input
              type='radio'
              id='cloudy'
              name='whether'
              value='cloudy'
              onChange={(event) => setWeather(event.target.value)}
            />
            <label className='ml-2 mr-4' htmlFor='cloudy'>
              Cloudy
            </label>

            <input
              type='radio'
              id='stormy'
              name='whether'
              value='stormy'
              onChange={(event) => setWeather(event.target.value)}
            />
            <label className='ml-2 mr-4' htmlFor='stormy'>
              Stormy
            </label>

            <input
              type='radio'
              id='windy'
              name='whether'
              value='windy'
              onChange={(event) => setWeather(event.target.value)}
            />
            <label className='ml-2 mr-4' htmlFor='windy'>
              Windy
            </label>
          </div>
        </fieldset>
        <label className='my-8' htmlFor='comment'>
          Comment :
        </label>
        <input
          className='rounded-md my-6 mx-2'
          type='text'
          id='comment'
          onChange={(event) => setComment(event.target.value)}
        />

        <div>
          <button
            className='btn my-4 btn-warning btn-outline btn-sm '
            type='submit'>
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default NewDiaryEntry;
