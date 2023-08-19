/** @format */

function App() {
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }

  interface CoursePartWithDescription extends CoursePartBase {
    description: string;
  }

  interface CoursePartBasic extends CoursePartWithDescription {
    kind: "basic";
  }

  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group";
  }

  interface CoursePartBackground extends CoursePartWithDescription {
    backgroundMaterial: string;
    kind: "background";
  }
  interface CoursePartWithRequirements extends CoursePartWithDescription {
    requirements: string[];
    kind: "requirements";
  }

  type CoursePart =
    | CoursePartBasic
    | CoursePartGroup
    | CoursePartBackground
    | CoursePartWithRequirements;

  const courseName = "Half Stack application development";

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
  ];

  interface HeaderProps {
    name: string;
  }

  function Header({ name }: HeaderProps) {
    return (
      <div>
        <h1 className='text-3xl my-4 font-bold'>{name}</h1>
      </div>
    );
  }

  function Part({ part }: { part: CoursePart }) {
    switch (part.kind) {
      case "basic":
        return (
          <div>
            <p className='text-xl my-2'>Name: {part.name}</p>
            <p className=' text-lg my-1 font-normal'>
              Exercise Count: {part.exerciseCount}
            </p>
            <p className='text-lg my-1 font-normal'>
              Description: {part.description}
            </p>
          </div>
        );
      case "group":
        return (
          <div>
            <p className='text-xl my-2'>Name: {part.name}</p>
            <p className='text-lg my-1 font-normal'>
              Exercise Count: {part.exerciseCount}
            </p>
            <p className='text-lg my-1 font-normal'>
              Group Project Count: {part.groupProjectCount}
            </p>
          </div>
        );
      case "background":
        return (
          <div>
            <p className='text-xl my-2'>Name: {part.name}</p>
            <p className='text-lg my-1 font-normal'>
              Exercise Count: {part.exerciseCount}
            </p>
            <p className='text-lg my- font-normal'>
              Description: {part.description}
            </p>
            <p className='text-lg my-1 font-normal'>
              Background Material: {part.backgroundMaterial}
            </p>
          </div>
        );
      case "requirements":
        return (
          <div>
            <p className='text-xl my-2 '>Name: {part.name}</p>
            <p className='text-lg my-1 font-normal'>
              Exercise Count: {part.exerciseCount}
            </p>
            <p className='text-lg my-1 font-normal'>
              Description: {part.description}
            </p>
            <p className='text-lg my-1 font-normal'>
              Requirements: {part.requirements.join(", ")}
            </p>
          </div>
        );
      default:
        return null;
    }
  }

  function Content({ parts }: { parts: CoursePart[] }) {
    return (
      <div>
        {parts.map((part) => (
          <div key={part.name} className='flex flex-row gap-2 font-bold'>
            <div className='my-2 '>
              <Part part={part} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  function Total({ parts }: { parts: CoursePart[] }) {
    const totalExercises = parts.reduce((sum, part) => {
      return sum + part.exerciseCount;
    }, 0);

    return (
      <p className='flex flex-row gap-2 text-lg font-bold font-mono my-4'>
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
