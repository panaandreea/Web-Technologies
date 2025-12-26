import { useState } from "react";

export default function App() {
  const [steps, setSteps] = useState(0);

  return (
    <div>
      <h1>Step Counter</h1>

      {steps === 0 ? (
        <p>You haven't taken any steps yet.</p>
      ) : (
        <p>Today you've taken {steps} steps.</p>
      )}

      <button onClick={() => setSteps(steps + 1)}>
        Click me
      </button>

      {steps >= 5 && <p>Good job! Keep going 🚶‍♂️</p>}
    </div>
  );
}
