/** @format */

function App() {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  interface HeaderProps {
    name: string;
  }

  interface ContentProps {
    parts: {
      name: string;
      exerciseCount: number;
    }[];
  }

  function Header({ name }: HeaderProps) {
    return (
      <div>
        <h1 className='text-3xl my-4 font-bold'>{name}</h1>
      </div>
    );
  }

  function Content({ parts }: ContentProps) {
    return (
      <div>
        {parts.map((part) => (
          <div key={part.name} className='flex flex-row gap-2 font-bold'>
            <div>{part.name}</div>
            <div>{part.exerciseCount}</div>
          </div>
        ))}
      </div>
    );
  }
  function Total({ parts }: ContentProps) {
    const totalExercises = parts.reduce((sum, part) => {
      return sum + part.exerciseCount;
    }, 0);

    return (
      <p className='flex flex-row gap-2 font-bold font-mono my-4'>
        Number of exercises {totalExercises}
      </p>
    );
  }

  return (
    <main className='m-6'>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </main>
  );
}

export default App;
