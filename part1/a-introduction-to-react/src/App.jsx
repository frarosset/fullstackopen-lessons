const Hello = ({ name, age }) => {
  const bornYear = () => new Date().getFullYear() - age;

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probabily born in {bornYear()}</p>
    </div>
  );
};

const App = () => {
  const name = "Peter";
  const age = 10;

  const friends = [
    { name: "Peter", age: 4 },
    { name: "Maya", age: 10 },
  ];

  const friendsNames = ["Peter", "Maya"];

  return (
    <>
      <h1>Greetings</h1>
      <Hello name={"Maya"} age={26 + 10} />
      <Hello name={name} age={age} />

      <div>
        <p>
          {friends[0].name} {friends[0].age}
        </p>
        <p>
          {friends[1].name} {friends[1].age}
        </p>
      </div>

      <div>
        <p>{friendsNames}</p>
      </div>
    </>
  );
};

export default App;
