//config buttons
import React from "react";
//interface
export interface IConfigButtons {
  id: string;
  text: string | React.ReactNode;
  type?: "button" | "submit" | "reset";
  className: string;
}

//buttonConfig
export const configButtons: { [key: string]: IConfigButtons } = {
  createNotes: {
    id: "create-notes",
    text: "Create",
    type: "submit",
    className: "p-2 border-none bg-sky-500 rounded-md",
  },
  editNotes: {
    id: "edit-notes",
    text: "Edit",
    type: "submit",
    className: "p-2 border-none bg-sky-500 rounded-md",
  },
  deleteNotes: {
    id: "delete-notes",
    text: "Delete",
    type: "submit",
    className: "p-2 border-none bg-sky-500 rounded-md",
  },
  createNotesModal: {
    id: "create-notes-modal",
    text: "Create Notes",
    className: "border-none p-2 bg-sky-500 rounded-md",
  },
  cancel: {
    id: "cancel",
    text: "Cancel",
    className: "border-none p-2 bg-red-500 rounded-md",
  },
  deleteNotesModal: {
    id: "delete-notes-modal",
    text: React.createElement("img", {
      className: "w-6 h-6",
      src: "./img/icon/free-icon-bin-4402519.png",
      alt: "delete icon",
    }),
    className: "border-none flex w-10 items-center",
  },
  editNotesModal: {
    id: "edit-notes-modal",
    text: React.createElement("img", {
      className: "w-6 h-6",
      src: "./img/icon/free-icon-pen-2007034.png",
      alt: "download icon",
    }),
    className: "border-none flex w-10 items-center",
  },
  archivNotes: {
    id: "archiv-notes",
    text: React.createElement("img", {
      className: "w-6 h-6",
      src: "./img/icon/free-icon-down-arrow-800892.png",
      alt: "edit icon",
    }),
    className: "border-none flex w-10 items-center",
  },
  archivAllNotes: {
    id: "archiv-all-notes",
    text: React.createElement("img", {
      className: "w-6 h-6",
      src: "./img/icon/free-icon-down-arrow-800892.png",
      alt: "edit icon",
    }),
    className: "border-none flex w-10 items-center",
  },
  closeModal: {
    id: "close",
    className:
      "bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none",
    text: React.createElement("span", {
      className: "w-2 h-2",
      text: "x",
    }),
  },
};
