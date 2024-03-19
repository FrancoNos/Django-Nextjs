"use client"
import { useState } from "react";
import FormTask from "./components/FormTask";
import ListTask from "./components/ListTask";

export default function HomePage() {
  const [refreshKey, setRefreshKey] = useState(0); 

  const handleTaskAdded = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Task App</h1>
      <div className="flex gap-10">
        <FormTask onTaskAdded={handleTaskAdded} />
        <div className="w-full">
          <ListTask key={refreshKey} /> 
        </div>
      </div>
    </div>
  );
}
