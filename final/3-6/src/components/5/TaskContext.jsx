import { createContext, useContext, useReducer } from "react";

const TaskContext = createContext(null);

function taskReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        nextId: state.nextId + 1,
        tasks: [...state.tasks, {
          id: state.nextId,
          title: action.title,
          priority: action.priority,
          status: "todo",
          createdAt: new Date().toLocaleString("bg-BG"),
        }],
      };
    case "MOVE_TASK": {
      const flow = { todo: "in-progress", "in-progress": "done" };
      return {
        ...state,
        tasks: state.tasks.map(t =>
          t.id === action.id
            ? { ...t, status: flow[t.status] || t.status }
            : t
        ),
      };
    }
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter(t => t.id !== action.id),
      };
    default:
      return state;
  }
}

function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, {
    tasks: [],
    nextId: 1,
  });

  return (
    <TaskContext.Provider value={{ tasks: state.tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

function useTaskContext() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTaskContext трябва да е в TaskProvider");
  return ctx;
}

export { TaskProvider, useTaskContext };
