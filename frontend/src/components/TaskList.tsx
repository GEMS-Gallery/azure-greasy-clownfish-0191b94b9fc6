import React from 'react';

interface Task {
  id: bigint;
  category: string;
  description: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onCompleteTask: (taskId: bigint) => void;
  onDeleteTask: (taskId: bigint) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onCompleteTask, onDeleteTask }) => {
  return (
    <div>
      <h2>Tasks</h2>
      <ul className="list">
        {tasks.map((task) => (
          <li key={task.id.toString()} className="list-item">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onCompleteTask(task.id)}
              disabled={task.completed}
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none', marginLeft: '10px' }}>
              {task.description} ({task.category})
            </span>
            <button onClick={() => onDeleteTask(task.id)} className="button" style={{ marginLeft: 'auto' }}>
              <i data-feather="trash-2"></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
