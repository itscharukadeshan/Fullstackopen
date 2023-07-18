/** @format */

import { useState } from "react";
import { useField } from "./hooks";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div className='menu menu-horizontal'>
      <Link className='btn lowercase btn-ghost btn-sm' style={padding} to='/'>
        anecdotes
      </Link>
      <Link
        className='btn lowercase btn-ghost btn-sm '
        style={padding}
        to='/create'>
        create new
      </Link>
      <Link
        className='btn lowercase btn-ghost btn-sm'
        style={padding}
        to='/about'>
        about
      </Link>
    </div>
  );
};

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2 className='text-xl font-bold my-4'>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link
            className='link my-3 text-justify font-semibold hover:text-gray-400'
            to={`/anecdote/${anecdote.id}`}>
            {anecdote.content}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id;

  const anecdote = anecdotes.find((a) => a.id === Number(id));
  return (
    <div className='flex flex-col items-center mt-40  '>
      <div className=' text-2xl text-center sm:text-5xl font-mono font-bold '>
        {anecdote.content}
      </div>
    </div>
  );
};

const About = () => (
  <div className='flex flex-col items-center'>
    <h2 className='text-2xl my-6'>About anecdote app</h2>
    <p className='text-sm my-4'>According to Wikipedia</p>
    <div className='bg-base-300 p-6 rounded-xl shadow-lg w-96'>
      <em className='font-mono '>
        An anecdote is a brief, revealing account of an individual person or an
        incident. Occasionally humorous, anecdotes differ from jokes because
        their primary purpose is not simply to provoke laughter but to reveal a
        truth more general than the brief tale itself, such as to characterize a
        person by delineating a specific quirk or trait, to communicate an
        abstract idea about a person, place, or thing through the concrete
        details of a short narrative. An anecdote is "a story with a point."
      </em>
    </div>

    <p className='text-md my-12'>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const Footer = () => (
  <footer className='footer footer-center p-4 bg-base-300 text-base-content '>
    <div>
      <p>
        Copyright © 2023 - All right reserved by{" "}
        <a className='link' href='https://fullstackopen.com/'>
          Full Stack Open
        </a>
      </p>
    </div>
  </footer>
);

export const CreateNew = (props) => {
  const navigate = useNavigate();
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");

  const handleReset = () => {
    content.reset();
    author.reset();
    info.reset();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    navigate("/");
  };

  return (
    <div>
      <h2 className='text-xl font-bold my-12'>Create a new anecdote</h2>
      <form className='w-96' onSubmit={handleSubmit} onReset={handleReset}>
        <div className='my-8'>
          <div className='flex flex-row items-center gap-4  '>
            <div className=''>Content</div>
            <input
              className='input input-sm input-bordered rounded-none'
              name='content'
              value={content.value}
              onChange={content.onChange}
            />
          </div>
          <div className='flex flex-row items-center my-3 gap-6'>
            <div>Author</div>
            <input
              className='input input-sm input-bordered rounded-none'
              name='author'
              value={author.value}
              onChange={author.onChange}
            />
          </div>
          <div className='flex flex-row items-center my-3 gap-11'>
            <div>URL</div>
            <input
              className='input input-sm input-bordered rounded-none'
              name='info'
              value={info.value}
              onChange={info.onChange}
            />
          </div>
        </div>
        <div className='flex flex-row gap-4'>
          <button type='submit' className='btn btn-sm btn-outline my-4'>
            Create
          </button>
          <button type='reset' className='btn btn-sm btn-outline my-4'>
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const [notification, setNotification] = useState("");

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification(`${anecdote.content} was added to the list !`);
  };

  const Notification = () => {
    if (notification) {
      setTimeout(() => {
        setNotification("");
      }, 5000);
    }

    return <div>{notification}</div>;
  };

  const Navbar = () => {
    return (
      <div className='navbar g-base-300 shadow-xl'>
        <div className='flex-1 flex-row justify-between m-2'>
          <Link to='/'>
            <h1 className='text-xl font-bold my-4 hover:text-gray-500'>
              Software anecdotes
            </h1>
          </Link>

          <Menu />
        </div>
      </div>
    );
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <div className='m-8 flex-grow'>
        <Notification />
        <Routes>
          <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path='/about' element={<About />} />
          <Route path='/create' element={<CreateNew addNew={addNew} />} />
          <Route
            path='/anecdote/:id'
            element={<Anecdote anecdotes={anecdotes} />}
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
