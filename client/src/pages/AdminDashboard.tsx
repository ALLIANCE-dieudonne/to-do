import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTaskStore } from '../stores/taskStore';
import { useAuthStore } from '../stores/authStore';
import AdminTaskItem from '../components/AdminTaskItem';
import TaskForm from '../components/TaskForm';
import AdminTaskFilter from '../components/AdminTaskFilter';
import { AlertCircle, Users } from 'lucide-react';
import { Task } from '../types';

const AdminDashboard = () => {
  const { user } = useAuthStore();
  const { tasks, isLoading, error, fetchAllTasks, setCurrentTask, currentTask } = useTaskStore();
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchAllTasks();
  }, [fetchAllTasks]);

  const handleEditTask = (task: Task) => {
    setCurrentTask(task);
    setIsFormOpen(true);
  };

  // Group tasks by user
  const tasksByUser = tasks.reduce((acc, task) => {
    if (task.user) {
      if (!acc[task.user.id]) {
        acc[task.user.id] = {
          user: task.user,
          tasks: []
        };
      }
      acc[task.user.id].tasks.push(task);
    }
    return acc;
  }, {} as Record<string, { user: Task['user'], tasks: Task[] }>);

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
            <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
            <p className="mt-1 text-sm text-gray-600">
              Welcome, {user?.name}! View and manage all user tasks.
            </p>
          </div>
        </div>

        <AdminTaskFilter />

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

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="loader h-8 w-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
          </div>
        ) : Object.keys(tasksByUser).length === 0 ? (
          <div className="bg-white shadow rounded-md py-12 px-4 text-center">
            <p className="text-gray-500">No tasks found.</p>
          </div>
        ) : (
          <div className="space-y-8">
            <AnimatePresence initial={false}>
              {Object.values(tasksByUser).map(({ user, tasks }) => (
                <motion.div
                  key={user?.id}
                  className="bg-white shadow overflow-hidden sm:rounded-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-gray-500 mr-2" />
                      <h3 className="text-lg font-medium text-gray-900">{user?.name}</h3>
                      <span className="ml-2 text-sm text-gray-500">{user?.email}</span>
                      <span className="ml-auto text-sm text-gray-500">{tasks.length} tasks</span>
                    </div>
                  </div>
                  <ul className="divide-y divide-gray-200">
                    {tasks.map((task) => (
                      <AdminTaskItem key={task.id} task={task} onEdit={handleEditTask} />
                    ))}
                  </ul>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <TaskForm 
            task={currentTask} 
            isOpen={isFormOpen} 
            onClose={() => setIsFormOpen(false)} 
            isAdmin={true}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdminDashboard;