import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [
      {
        id: 1,
        title: "Complete React Project",
        description: "Finish implementing features for the client dashboard.",
        dueDate: "2024-09-18",
        priority: "high",
        status: "in progress"
      },
      {
        id: 2,
        title: "Submit Financial Report",
        description: "Prepare and submit the financial report to management.",
        dueDate: "2024-09-20",
        priority: "medium",
        status: "completed"
      }
    ],

    searchQuery: '',  
    filterStatus: 'all', // Filter by task status (all, completed, in-progress)
    filterPriority: 'all', // Filter by priority (high, medium, low, all)
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action) => {
      const { id, title, description, dueDate, priority, status } = action.payload;
      const task = state.tasks.find(task => task.id === id);
      if (task) {
        task.title = title;
        task.description = description;
        task.dueDate = dueDate;
        task.priority = priority;
        task.status = status;
      }

    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
    setFilterPriority: (state, action) => {
      state.filterPriority = action.payload;
    }
  }
});

export const { addTask, updateTask, deleteTask, setSearchQuery, setFilterStatus, setFilterPriority } = tasksSlice.actions;
export default tasksSlice.reducer;
