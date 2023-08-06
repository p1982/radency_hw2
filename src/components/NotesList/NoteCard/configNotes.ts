import React from "react";

//interface
export interface IConfigNotes {
  Task: React.ReactNode;
  Quote: React.ReactNode;
  Idea: React.ReactNode;
  "Random Thought": React.ReactNode;
}

export interface IConfigNotesList {
  id: string;
  text: Array<string>;
  className: Array<string>;
}

//config Notes
export const configNotes: { [key: string]: React.ReactNode } = {
  Task: React.createElement("img", {
    className: "w-6 h-6",
    src: "./img/icon/task.png",
    alt: "task icon",
  }),
  Quote: React.createElement("img", {
    className: "w-6 h-6",
    src: "./img/icon/quote.png",
    alt: "quote icon",
  }),
  Idea: React.createElement("img", {
    className: "w-6 h-6",
    src: "./img/icon/idea.png",
    alt: "idea icon",
  }),
  "Random Thought": React.createElement("img", {
    className: "w-6 h-6",
    src: "./img/icon/onmind.png",
    alt: "on mind icon",
  }),
};

export const configNotesList: { [key: string]: IConfigNotesList } = {
  notes: {
    id: "Notes",
    text: ["", "Name", "Created", "Category", "Content", "Dates", ""],
    className: [
      "w-10 flex justify-center align-center",
      "w-36 flex justify-center items-center",
      "w-60 flex justify-center items-center",
      "w-60 flex justify-center items-center",
      "w-60 flex justify-center items-center",
      "w-56 flex justify-center items-center",
      "w-10 flex justify-center items-center",
    ],
  },
  stats: {
    id: "Stats",
    text: ["", "Note Category", "Active", "Archived"],
    className: [
      "w-10 flex justify-center align-center",
      "w-36 flex justify-center items-center",
      "w-[32rem] flex justify-center items-center",
      "w-[32rem] flex justify-center items-center",
    ],
  },
  archive: {
    id: "Archive",
    text: ["", "Name", "Created", "Category", "Content", "Dates", ""],
    className: [
      "w-10 flex justify-center align-center",
      "w-36 flex justify-center items-center",
      "w-60 flex justify-center items-center",
      "w-60 flex justify-center items-center",
      "w-60 flex justify-center items-center",
      "w-56 flex justify-center items-center",
      "w-10 flex justify-center items-center",
    ],
  },
};
