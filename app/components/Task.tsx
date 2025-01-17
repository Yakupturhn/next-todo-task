"use client";
import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { postAPI, updateAPI, getAPI } from "@/services/fetchAPI";
import { toast } from "react-toastify";
import { useTasks } from "@/taskContext/TaskContext";

interface TaskProps {
  dt: {
    id?: string;
    Configdata: string;
  };
}

const Task = ({ dt }: TaskProps) => {
  const { setData } = useTasks();

  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(dt.Configdata);

  const handleSubmitEditTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await updateAPI("/other/dataUpdateChecker", {
        where: { id: dt.id },
        newData: { Configdata: taskToEdit },
      });

      if (!response) {
        throw new Error("An error occurred during the update.");
      }
      toast.success("Task updated successfully!");
      setOpenModalEdit(false);

      const fetchData = async () => {
        const allData = await getAPI("/other/dataUpdateChecker");
        setData(allData.data);
      };

      fetchData();
    } catch (error) {
      console.error(error);
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      const response = await postAPI(
        `/other/dataUpdateChecker?id=${id}`,
        {},
        "DELETE"
      );
      if (!response || response.error) {
        throw new Error("An error occurred during the deletion.");
      }
      toast.success("Task deleted successfully!");
      console.log("Delete operation successful:", response);
      setOpenModalDelete(false);

      const fetchData = async () => {
        const allData = await getAPI("/other/dataUpdateChecker");
        setData(allData.data);
      };

      fetchData();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <tbody>
      <tr key={dt?.id}>
        <td className="flex w-full items-center justify-between">
          <div>{dt?.Configdata}</div>
          <div className="flex items-center gap-2">
            <FiEdit
              onClick={() => setOpenModalEdit(true)}
              className="text-blue-600 cursor-pointer size-5 md:size-6"
            />
            <Modal open={openModalEdit} setOpen={setOpenModalEdit}>
              <form onSubmit={handleSubmitEditTodo}>
                <h3 className="font-bold  text-lg">Edit Task</h3>
                <div className="modal-action">
                  <input
                    value={taskToEdit}
                    onChange={(e) => setTaskToEdit(e.target.value)}
                    type="text"
                    placeholder="Type here"
                    className="input placeholder:text-sm input-bordered w-full outline-none max-w-xs"
                  />
                  <button type="submit" className="btn md:text-md text-xs">
                    Submit
                  </button>
                </div>
                <button
                  onClick={() => setOpenModalEdit(false)}
                  className="text-red-400 btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >
                  ✕
                </button>
              </form>
            </Modal>
            <FiTrash2
              onClick={() => setOpenModalDelete(true)}
              className="text-red-600 cursor-pointer size-5 md:size-6"
            />
            <Modal open={openModalDelete} setOpen={setOpenModalDelete}>
              <h3 className="font-bold  text-lg">
                Are you sure , you want to delete this task?
              </h3>
              <div className="modal-action">
                <button
                  onClick={() => handleDeleteTask(dt?.id)}
                  type="submit"
                  className="btn bg-red-600 text-white md:text-md text-xs"
                >
                  Delete
                </button>
              </div>
              <button
                onClick={() => setOpenModalDelete(false)}
                className="text-black btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
            </Modal>
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default Task;
