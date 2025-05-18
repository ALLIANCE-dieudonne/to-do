import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTaskStore } from '../stores/taskStore';
import { useAuthStore } from '../stores/authStore';
import TaskItem from '../components/TaskItem';
import TaskForm from '../components/TaskForm';
import TaskFilter from '../components/TaskFilter';
import { PlusCircle, AlertCircle } from 'lucide-react';
import { Task } from '../types';

const Dashboard = () => {
  const { user } = useAuthStore();
  const { tasks, isLoading, error, fetchTasks, setCurrentTask, currentTask } = useTaskStore();
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddTask = () => {
    setCurrentTask(null);
    setIsFormOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setCurrentTask(task);
    setIsFormOpen(true);
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="px-4 py-6 sm:px-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Your Tasks</h1>
            <p className="mt-1 text-sm text-gray-600">
              Welcome back, {user?.name}! Here's your task dashboard.
            </p>
          </div>
          <motion.button
            className="btn btn-primary mt-4 md:mt-0 inline-flex items-center"
            onClick={handleAddTask}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Add new task
          </motion.button>
        </div>

        <TaskFilter />

        {error && (
          <motion.div
            className="mb-6 bg-error-50 border-l-4 border-error-500 p-4 rounded"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-error-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-error-700">{error}</p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="loader h-8 w-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
            </div>
          ) : tasks.length === 0 ? (
            <div className="py-12 px-4 text-center">
              <p className="text-gray-500">No tasks found. Create your first task!</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              <AnimatePresence initial={false}>
                {tasks.map((task) => (
                  <TaskItem key={task.id} task={task} onEdit={handleEditTask} />
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <TaskForm 
            task={currentTask} 
            isOpen={isFormOpen} 
            onClose={() => setIsFormOpen(false)} 
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Dashboard;