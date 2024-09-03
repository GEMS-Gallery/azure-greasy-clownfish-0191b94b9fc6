import React, { useState, useEffect } from 'react';
import { backend } from 'declarations/backend';
import TaskList from './components/TaskList';
import CategoryList from './components/CategoryList';
import AddTaskForm from './components/AddTaskForm';

interface Task {
  id: bigint;
  category: string;
  description: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedTasks, fetchedCategories] = await Promise.all([
          backend.getTasks(),
          backend.getCategories()
        ]);
        setTasks(fetchedTasks);
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const addTask = async (category: string, description: string) => {
    try {
      const result = await backend.addTask(category, description);
      if ('ok' in result) {
        const newTask: Task = {
          id: result.ok,
          category,
          description,
          completed: false
        };
        setTasks([...tasks, newTask]);
      } else {
        console.error('Error adding task:', result.err);
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const completeTask = async (taskId: bigint) => {
    try {
      const result = await backend.completeTask(taskId);
      if ('ok' in result) {
        setTasks(tasks.map(task =>
          task.id === taskId ? { ...task, completed: true } : task
        ));
      } else {
        console.error('Error completing task:', result.err);
      }
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const deleteTask = async (taskId: bigint) => {
    try {
      const result = await backend.deleteTask(taskId);
      if ('ok' in result) {
        setTasks(tasks.filter(task => task.id !== taskId));
      } else {
        console.error('Error deleting task:', result.err);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Task Manager</h1>
      </header>
      <div className="grid">
        <div>
          <CategoryList categories={categories} />
          <AddTaskForm categories={categories} onAddTask={addTask} />
        </div>
        <div>
          <TaskList tasks={tasks} onCompleteTask={completeTask} onDeleteTask={deleteTask} />
        </div>
      </div>
    </div>
  );
};

export default App;
