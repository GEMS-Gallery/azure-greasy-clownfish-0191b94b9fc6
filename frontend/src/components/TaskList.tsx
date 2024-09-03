import React from 'react';
import { Checkbox, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CircleIcon from '@mui/icons-material/Circle';

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
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'work': return <WorkIcon />;
      case 'personal': return <PersonIcon />;
      case 'shopping': return <ShoppingCartIcon />;
      case 'health': return <FavoriteIcon />;
      default: return <CircleIcon />;
    }
  };

  return (
    <div>
      <h2>Tasks</h2>
      <ul className="list">
        {tasks.map((task) => (
          <li key={task.id.toString()} className="list-item">
            <Checkbox
              checked={task.completed}
              onChange={() => onCompleteTask(task.id)}
              disabled={task.completed}
            />
            {getCategoryIcon(task.category)}
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none', marginLeft: '10px' }}>
              {task.description} ({task.category})
            </span>
            <IconButton onClick={() => onDeleteTask(task.id)} style={{ marginLeft: 'auto' }}>
              <DeleteIcon />
            </IconButton>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
