//interface
interface IConfigModals {
  title: string;
  text: string;
}

//config for modals
export const configModals:  { [key: string]: IConfigModals } = {
  editModal: {
    title: "Edit Notes",
    text: "",
  },
  deleteModal: {
    title: "Delete Notes",
    text: "Are you sure, you want delete?",
  },
  createModal: {
    title: "Create Notes",
    text: "",
  },
  deleteAllModal: {
    title: "Delete All Notes",
    text: "Are you sure, you want delete All Notes?",
  },
};
