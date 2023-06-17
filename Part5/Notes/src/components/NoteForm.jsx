const NoteForm = ({ onSubmit, handleChange, value }) => {
  return (
    <div>
      <h2 className="text-xl font-sans font-bold pb-4 mt-6">
        Create a new note
      </h2>

      <form onSubmit={onSubmit}>
        <input
          className="relative block overflow-hidden border-b border-gray-600 bg-transparent focus-within:border-blue-600 my-4"
          value={value}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
        >
          save
        </button>
      </form>
    </div>
  )
}

export default NoteForm
