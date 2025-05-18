import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Edit2, Trash2 } from 'lucide-react';
import { useTaskStore } from '../stores/taskStore';
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
}

const TaskItem = ({ task, onEdit }: TaskItemProps) => {
  const { updateTask, deleteTask } = useTaskStore();
  
  const handleStatusChange = () => {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    updateTask(task.id, { status: newStatus });
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-error-100 text-error-800';
      case 'medium':
        return 'bg-warning-100 text-warning-800';
      case 'low':
        return 'bg-success-100 text-success-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-success-100 text-success-800';
      case 'in_progress':
        return 'bg-primary-100 text-primary-800';
      case 'pending':
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatStatusText = (status: Task['status']) => {
    return status.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
      transition={{ duration: 0.2 }}
      className={`px-4 py-4 sm:px-6 border-l-4 ${
        task.status === 'completed' ? 'border-success-500 bg-success-50/30' : 'border-transparent'
      } hover:bg-gray-50 transition-colors`}
    >
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={task.status === 'completed'}
              onChange={handleStatusChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded cursor-pointer"
            />
            <div className="ml-3">
              <p className={`text-sm font-medium ${task.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                {task.title}
              </p>
              {task.description && (
                <p className={`mt-1 text-sm ${task.status === 'completed' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {task.description}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="ml-5 flex-shrink-0 flex items-center space-x-4">
          <div className="flex space-x-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
              {formatStatusText(task.status)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <motion.button
              onClick={() => onEdit(task)}
              className="p-1 rounded-full text-gray-400 hover:text-primary-600 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Edit2 className="h-5 w-5" />
            </motion.button>
            <motion.button
              onClick={() => deleteTask(task.id)}
              className="p-1 rounded-full text-gray-400 hover:text-error-600 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Trash2 className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </div>
      {task.dueDate && (
        <div className="mt-2 text-xs text-gray-500">
          Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
        </div>
      )}
    </motion.li>
  );
};

export default TaskItem;