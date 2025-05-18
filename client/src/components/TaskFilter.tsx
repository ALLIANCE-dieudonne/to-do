import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, Search, X } from 'lucide-react';
import { useTaskStore } from '../stores/taskStore';
import { TaskFilters } from '../types';

const TaskFilter = () => {
  const { filters, setFilters, fetchTasks } = useTaskStore();
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<TaskFilters>({
    status: undefined,
    priority: undefined,
    search: ''
  });

  useEffect(() => {
    setLocalFilters({
      status: filters.status,
      priority: filters.priority,
      search: filters.search || ''
    });
  }, [filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLocalFilters({
      ...localFilters,
      [name]: value === 'all' ? undefined : value
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalFilters({
      ...localFilters,
      search: e.target.value
    });
  };

  const applyFilters = () => {
    setFilters(localFilters);
    fetchTasks();
    setIsOpen(false);
  };

  const clearFilters = () => {
    const emptyFilters = {
      status: undefined,
      priority: undefined,
      search: ''
    };
    setLocalFilters(emptyFilters);
    setFilters(emptyFilters);
    fetchTasks();
  };

  return (
    <div className="mb-6 bg-white shadow rounded-md p-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-grow max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search tasks..."
            className="input pl-10 pr-4 py-2 w-full"
            value={localFilters.search}
            onChange={handleSearchChange}
            onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <motion.button
            className="btn btn-outline inline-flex items-center"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </motion.button>
          
          {(filters.status || filters.priority || filters.search) && (
            <motion.button
              className="btn btn-ghost inline-flex items-center text-gray-500"
              onClick={clearFilters}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <X className="mr-1 h-4 w-4" />
              Clear
            </motion.button>
          )}
          
          <motion.button
            className="btn btn-primary"
            onClick={applyFilters}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Apply
          </motion.button>
        </div>
      </div>
      
      {isOpen && (
        <motion.div
          className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              className="input"
              value={localFilters.status || 'all'}
              onChange={handleFilterChange}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              className="input"
              value={localFilters.priority || 'all'}
              onChange={handleFilterChange}
            >
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TaskFilter;