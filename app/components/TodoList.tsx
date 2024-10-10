import React from "react";
import Task from "./Task";
import { useTasks } from "@/taskContext/TaskContext";

const TodoList = () => {
  const { data } = useTasks();

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="bg-neutral-300">
            <tr className="flex justify-between">
              <th>Tasks</th>
              <th>Actions</th>
            </tr>
          </thead>

          {data?.map((dt: any) => (
            <Task key={dt?.id} dt={dt} />
          ))}
        </table>
      </div>
    </div>
  );
};

export default TodoList;
