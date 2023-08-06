//interface
interface IConfigInputs {
  id: string;
  text: string;
  type?: string;
  className: string;
}

//config for inputs
export const configInputs: { [key: string]: IConfigInputs } = {
  name: {
    id: "name",
    text: "task",
    className: "w-[100%] p-2 rounded-md border-2 border-sky-500",
  },
  date: {
    id: "dates",
    text: "04.05.2024",
    type: "date",
    className: "w-[100%] p-2 rounded-md border-2 border-sky-500",
  },
  content: {
    id: "content",
    text: "Notes ...",
    className: "w-[100%] p-2 rounded-md border-2 border-sky-500",
  },
};
