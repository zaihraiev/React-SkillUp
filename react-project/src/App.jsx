import CoreConcepts from "./components/CoreConcepts.jsx";
import Examples from "./components/Examples.jsx";
import Header from "./components/Header.jsx";
import { Fragment } from "react";

// function CoreConcept({image, title, description}) {
//   return (
//     <li>
//       <img src={image} alt={title}></img>
//       <h3>{title}</h3>
//       <p>{description}</p>
//     </li>
//   );
// }

//We can write braces because of anonymous function
function App() {
  
  // <></> = Fragment !!!!!!!!
  return (
    <Fragment>
      <Header />
      <main>
        <CoreConcepts />
        <Examples />
      </main>
    </Fragment>
  );
}

export default App;
