//interface select
interface IConfigSelect {
    options: Array<string>
}

//select config
export const configSelects:{ [key: string]: IConfigSelect } = {
  notes: {
    options: ["Task", "Idea", "Random Thought", "Quote"],
  },
};
