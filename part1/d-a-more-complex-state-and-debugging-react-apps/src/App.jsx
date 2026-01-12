import { useState } from "react";

const History = (props) => {
  if (props.allClicks.length === 0) {
    return <div>the app is used by pressing the buttons</div>;
  }

  return <div>button press history: {props.allClicks.join(" ")}</div>;
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);

  // const [clicks, setClicks] = useState({
  //   left: 0,
  //   right: 0,
  // });

  // const handleLeftClick = () => {
  //   setClicks({ ...clicks, left: clicks.left + 1 });
  // };

  // const handleRightClick = () => {
  //   setClicks({ ...clicks, right: clicks.right + 1 });
  // };

  const [allClicks, setAll] = useState([]);
  const [total, setTotal] = useState(0);

  const handleLeftClick = () => {
    setAll(allClicks.concat("L"));
    const updatedLeft = left + 1;
    setLeft(updatedLeft);
    setTotal(updatedLeft + right);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat("R"));
    const updatedRight = right + 1;
    setRight(updatedRight);
    setTotal(left + updatedRight);
  };

  const handleClick = () => {
    console.log("clicked the button");
  };

  const hello = (who) => () => console.log("hello", who);

  const [value, setValue] = useState(10);

  const setToValue = (newValue) => () => {
    console.log("value now", newValue); // print the new value to console
    setValue(newValue);
  };

  return (
    <>
      <div>
        {left}
        <Button onClick={handleLeftClick} text="left" />
        <Button onClick={handleRightClick} text="right" />
        {right}
      </div>

      {/* <div>
        {clicks.left}
        <button onClick={handleLeftClick}>left</button>
        <button onClick={handleRightClick}>right</button>
        {clicks.right}
      </div> */}

      <History allClicks={allClicks} />

      <p>total {total}</p>

      <Button onClick={handleClick} text="button" />
      <Button onClick={hello("world")} text="hello" />
      <Button onClick={hello("react")} text="hello" />

      <div>
        {value}
        <Button onClick={setToValue(1000)} text="thousand" />
        <Button onClick={setToValue(0)} text="reset" />
        <Button onClick={setToValue(value + 1)} text="increment" />
      </div>
    </>
  );
};

export default App;
