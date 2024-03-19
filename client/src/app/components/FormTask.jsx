"use client"
import { useState } from "react";

export default function FormTask() {
    const [tile, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        console.log(tile, description);
    }


    return (
        <div className="bg-slate-200 p-7">
            <form onSubmit={handleSubmit}>
                <h1 className="text-black font-bold">Añadir tarea</h1>
                <label htmlFor="title"
                    className="text-sm text-black">
                    Titulo:</label>
                <input type="text" name="tile"
                    className="bg-slate-400 rounded-md p-2 mb-2 block w-full text-slate-900"
                    onChange={e => setTitle(e.target.value)}
                />
                <label htmlFor="description"
                    className="text-sm text-black">
                    Descripción:</label>
                <textarea name="description" placeholder="Descripción"
                    className="bg-slate-400 rounded-md p-2 mb-2 block w-full text-slate-900"
                    onChange={e => setDescription(e.target.value)}
                />
                <button
                    className="bg-indigo-500 text-white rouded-md p-2   mb-2 block w-full"
                >Guardar</button>
            </form>
        </div>
    );
}