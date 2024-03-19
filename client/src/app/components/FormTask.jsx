"use client"

import { useState } from "react";

export default function FormTask({ onTaskAdded }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/`, {
            method: 'POST',
            body: JSON.stringify({title, description}),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await res.json();
        console.log(data);
        onTaskAdded();
        setTitle("");
        setDescription("");
    };


    return (
        <div className="bg-slate-200 p-7">
            <form onSubmit={handleSubmit}>
                <h1 className="text-black font-bold">Añadir tarea</h1>
                <label htmlFor="title" className="text-sm text-black">Titulo:</label>
                <input 
                    type="text" 
                    name="tile"
                    value={title} 
                    onChange={e => setTitle(e.target.value)}
                    className="bg-slate-400 rounded-md p-2 mb-2 block w-full text-slate-900"
                />
                <label htmlFor="description" className="text-sm text-black">Descripción:</label>
                <textarea 
                    name="description" 
                    placeholder="Descripción"
                    value={description} 
                    onChange={e => setDescription(e.target.value)}
                    className="bg-slate-400 rounded-md p-2 mb-2 block w-full text-slate-900"
                />
                <button
                    type="submit"
                    className="bg-indigo-500 text-white rouded-md p-2 mb-2 block w-full"
                >
                    Guardar
                </button>
            </form>
        </div>
    );
}
