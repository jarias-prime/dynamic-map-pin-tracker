import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Banner
        title="Info text goes here"
        description="This is a simple banner component."
      />
    </>
  );
}

export default App;
