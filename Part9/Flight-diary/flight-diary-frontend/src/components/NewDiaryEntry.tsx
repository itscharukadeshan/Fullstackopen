/** @format */
import { useState } from "react";

function NewDiaryEntry() {
  const [visibility, setVisibility] = useState<string>("");
  const [weather, setWeather] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const entry = {
      visibility,
      weather,
      comment,
      date,
    };

    console.log(entry);
  };

  return (
    <>
      <h1 className='text-3xl my-4 mx-2 font-bold'>Add new entry</h1>
      <form onSubmit={handleSubmit} className='mx-4'>
        <div className='my-2'>
          <label htmlFor='date'>Date : </label>

          <input
            className='input'
            type='date'
            id='date'
            name='date'
            value={date}
          />
        </div>

        <fieldset>
          <legend className='my-4'>Visibility</legend>
          <div className='my-2'>
            <input type='radio' id='grate' name='visibility' value='grate' />
            <label htmlFor='grate'>Grate</label>
            <input type='radio' id='good' name='visibility' value='good' />
            <label htmlFor='good'>Good</label>
            <input type='radio' id='ok' name='visibility' value='ok' />
            <label htmlFor='ok'>Ok</label>
            <input type='radio' id='poor' name='visibility' value='poor' />
            <label htmlFor='poor'>poor</label>
          </div>
        </fieldset>
        <fieldset>
          <legend className='my-4'>Whether</legend>
          <div className='my-2'>
            <input type='radio' id='sunny' name='whether' value='sunny' />
            <label htmlFor='sunny'>Sunny</label>

            <input type='radio' id='rainy' name='whether' value='rainy' />
            <label htmlFor='rainy'>Rainy</label>

            <input type='radio' id='cloudy' name='whether' value='cloudy' />
            <label htmlFor='cloudy'>Cloudy</label>

            <input type='radio' id='stormy' name='whether' value='stormy' />
            <label htmlFor='stormy'>Stormy</label>

            <input type='radio' id='windy' name='whether' value='windy' />
            <label htmlFor='windy'>Windy</label>
          </div>
        </fieldset>
        <label htmlFor='comment'>Comment :</label>
        <input className='rounded-md my-2 mx-2' type='text' id='comment' />

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
