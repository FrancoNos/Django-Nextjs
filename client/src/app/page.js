import FormTask from "./components/FormTask";
import ListTask from "./components/ListTask";

export default function HomePage() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Task App</h1>
      <div className="flex justify-center gap-10">
        <FormTask />
        <ListTask />
      </div>
    </div>
  );
}
