import { createContext, useContext, useEffect, useReducer } from "react";

const ClassroomContext = createContext(null);

function createStudentAverage(student) {
  const allGrades = Object.values(student.grades).flat();
  if (allGrades.length === 0) return 0;
  return allGrades.reduce((sum, grade) => sum + grade, 0) / allGrades.length;
}

function classroomReducer(state, action) {
  switch (action.type) {
    case "ADD_STUDENT":
      return {
        ...state,
        students: [...state.students, {
          id: Date.now(),
          name: action.name,
          class: action.className,
          grades: {},
        }],
      };
    case "ADD_GRADE":
      return {
        ...state,
        students: state.students.map(s =>
          s.id === action.studentId
            ? {
                ...s,
                grades: {
                  ...s.grades,
                  [action.subject]: [
                    ...(s.grades[action.subject] || []),
                    action.grade,
                  ],
                },
              }
            : s
        ),
      };
    case "REMOVE_STUDENT":
      return {
        ...state,
        students: state.students.filter(s => s.id !== action.id),
      };
    case "SET_FILTER":
      return { ...state, classFilter: action.classFilter };
    case "SET_SEARCH":
      return { ...state, searchQuery: action.searchQuery };
    default:
      return state;
  }
}

const defaultState = {
  students: [
    { id: 1, name: "Иван Петров", class: "11А", grades: { "Математика": [5, 6, 4], "Информатика": [6, 5], "Физика": [5] } },
    { id: 2, name: "Мария Иванова", class: "11Б", grades: { "Математика": [6, 6], "Физика": [5, 4], "Биология": [6] } },
    { id: 3, name: "Георги Стоянов", class: "11А", grades: { "Информатика": [6, 6, 5], "Английски": [5, 5] } },
    { id: 4, name: "Елица Димитрова", class: "11Б", grades: { "Математика": [4, 5], "Химия": [5, 5], "Информатика": [6] } },
    { id: 5, name: "Никола Колев", class: "11А", grades: { "Физика": [3, 4], "Математика": [4, 4], "История": [5] } },
    { id: 6, name: "Ралица Тонева", class: "11Б", grades: { "Информатика": [6, 5, 6], "Английски": [6, 5] } },
    { id: 7, name: "Петър Христов", class: "11А", grades: { "Математика": [5, 5], "Физика": [4, 5], "Химия": [4] } },
    { id: 8, name: "Десислава Маринова", class: "11Б", grades: { "Биология": [6, 5], "История": [5, 6], "Литература": [6] } },
    { id: 9, name: "Стефан Илиев", class: "11А", grades: { "Информатика": [4, 5], "Математика": [3, 4], "Английски": [5] } },
    { id: 10, name: "Анна Георгиева", class: "11Б", grades: { "Литература": [6, 6], "История": [5, 5], "Математика": [5] } },
    { id: 11, name: "Виктор Николав", class: "11А", grades: { "Информатика": [6, 6], "Математика": [5, 6], "Физика": [6] } },
  ],
  classFilter: "all",
  searchQuery: "",
};

function ClassroomProvider({ children }) {
  const saved = localStorage.getItem("classroom");
  const initial = saved ? JSON.parse(saved) : defaultState;
  const [state, dispatch] = useReducer(classroomReducer, initial);

  useEffect(() => {
    localStorage.setItem("classroom", JSON.stringify(state));
  }, [state]);

  return (
    <ClassroomContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ClassroomContext.Provider>
  );
}

function useClassroom() {
  const ctx = useContext(ClassroomContext);
  if (!ctx) throw new Error("useClassroom must be inside Provider");
  return ctx;
}

export { ClassroomProvider, createStudentAverage, useClassroom };
