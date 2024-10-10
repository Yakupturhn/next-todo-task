"use client";

import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { postAPI, getAPI } from "@/services/fetchAPI/index";
import { toast } from "react-toastify";
import { useTasks } from "@/taskContext/TaskContext";

const AddTask = () => {
  const { setData } = useTasks();

  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const deleteAll = async () => {
    try {
      await postAPI("/other/dataUpdateChecker", null, "DELETE");
      toast.success("All tasks have been deleted successfully");

      const fetchData = async () => {
        const allData = await getAPI("/other/dataUpdateChecker");
        setData(allData.data);
      };

      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
      toast.error("An error occurred while deleting the tasks");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!!value) {
        const response = await postAPI("/other/dataUpdateChecker", {
          data: value,
          method: "POST",
        });

        if (response.error) {
          throw new Error(response.error);
        }

        setValue("");
        setOpen(false);
        toast.success("New todo added successfully!");

        const fetchData = async () => {
          const allData = await getAPI("/other/dataUpdateChecker");
          setData(allData.data);
        };

        fetchData();
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Görev eklenirken bir hata oluştu.");
    }
  };

  return (
    <div className="md:flex md:justify-center md:items-center">
      <div className="flex flex-col md:flex-row items-center md:space-y-0 space-y-1 md:gap-4">
        <div className="w-full flex items-center justify-center flex-row md:w-1/2">
          <button
            onClick={() => setOpen(true)}
            className="text-xs md:text-base md:w-auto w-full btn btn-active btn-neutral"
          >
            Add Task
            <AiOutlinePlus className="ml-1 size-4 md:size-6" />
          </button>
        </div>
        <div className="w-full text-center md:w-1/2">
          <button
            onClick={deleteAll}
            className="md:w-auto w-full btn text-xs md:text-base bg-red-600 text-white"
          >
            Delete All
          </button>
        </div>
      </div>
      <Modal open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit}>
          <h3 className="font-bold text-xl md:text-lg">Add New Task</h3>
          <div className="modal-action">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-red-400 btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
