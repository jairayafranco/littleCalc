import { useRef } from 'react';
import './App.css';

function App() {
  const calcButtons = useRef([]);
  const calcInput = useRef(null);

  const calculator = [
    "CE", "C", "÷",
    7, 8, 9, "x",
    4, 5, 6, "-",
    1, 2, 3, "+",
    0, "="
  ];

  const handleClassName = { 0: "zero-button", "CE": "ce-button" } ?? '';
  const handleRole = (number) => ["÷", "x", "-", "+", "="].includes(number) ? "operator" : "number";

  const handleClick = (elIndex) => {
    const input = calcInput.current;
    const buttonValue = calcButtons.current[elIndex].innerHTML;

    if (!["CE", "C"].includes(buttonValue)) {
      input.value += buttonValue;
    }

    if (buttonValue === "CE") {
      input.value = input.value.slice(0, -1);
    }

    if (buttonValue === "C") {
      input.value = "";
    }

    if (buttonValue === "=") {
      input.value = eval(input.value.replace("x", "*").replace("÷", "/").slice(0, -1)) ?? '';
    }
  }

  return (
    <main>
      <div className='calc-container'>
        <input type="text" readOnly ref={calcInput} />
        {
          calculator.map((number, index) => (
            <button
              onClick={() => handleClick(index)}
              key={index}
              className={handleClassName[number]}
              role={handleRole(number)}
              ref={(element) => calcButtons.current[index] = element}
            >
              {number}
            </button>
          ))
        }
      </div>
    </main>
  )
}

export default App
