import { CORE_CONCEPTS } from "../data";
import CoreConcept from "../components/CoreConcept.jsx";

export default function CoreConcepts() {
  return (
    <section id="core-concepts">
      <h2>Core Concepts</h2>
      <ul>
        {CORE_CONCEPTS.map((obj) => (
          <CoreConcept key={obj.title} {...obj} />
        ))}
      </ul>
    </section>
  );
}
