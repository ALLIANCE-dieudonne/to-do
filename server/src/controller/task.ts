// import { Request, Response } from "express";
// import prisma from "../prisma/prisma-client";
// import ServerResponse from "../utils/ServerResponse";
// import { AuthRequest } from "../types";

// export const getUserTasks: any = async (req: AuthRequest, res: Response) => {
//   const { status, priority, search } = req.query;
//   const userId = req.user?.id;

//   try {
//     const tasks = await prisma.task.findMany({
//       where: {
//         userId,
//         ...(status && { status: status as string }),
//         ...(priority && { priority: priority as string }),
//         ...(search && {
//           OR: [
//             { title: { contains: search as string, mode: "insensitive" } },
//             {
//               description: { contains: search as string, mode: "insensitive" },
//             },
//           ],
//         }),
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     ServerResponse.success(res, "Tasks fetched successfully", tasks);
//   } catch (error) {
//     console.error("Get tasks error:", error);
//     ServerResponse.error(res, "Server error");
//   }
// };

// export const getAllTasks = async (req: Request, res: Response) => {
//     const { status, priority, search } = req.query;
  
//     try {
//       const tasks = await prisma.task.findMany({
//         where: {
//           ...(status && { status: status as string }),
//           ...(priority && { priority: priority as string }),
//           ...(search && {
//             OR: [
//               { title: { contains: search as string, mode: "insensitive" } },
//               { description: { contains: search as string, mode: "insensitive" } },
//               {
//                 user: {
//                   OR: [
//                     { name: { contains: search as string, mode: "insensitive" } },
//                     { email: { contains: search as string, mode: "insensitive" } },
//                   ],
//                 },
//               },
//             ],
//           }),
//         },
//         include: {
//           user: {
//             select: {
//               id: true,
//               name: true,
//               email: true,
//               role: true,
//             },
//           },
//         },
//         orderBy: {
//           createdAt: "desc",
//         },
//       });
  
//       ServerResponse.success(res, "All tasks fetched successfully", tasks);
//     } catch (error) {
//       console.error("Get all tasks error:", error);
//       ServerResponse.error(res, "Server error");
//     }
//   };

// export const createTask = async(req: AuthRequest, res: Response) =>{
//     const { title, description, status, priority, dueDate } = req.body;
//     const userId = req.user?.id;
  
//     try {
//       const task = await prisma.task.create({
//         data: {
//           title,
//           description,
//           status,
//           priority,
//           dueDate: dueDate ? new Date(dueDate) : null,
//           userId
//         }
//       });
  
//       ServerResponse.created(res, 'Task created successfully', task);
//     } catch (error) {
//       console.error('Create task error:', error);
//       ServerResponse.error(res, 'Server error');
//     }
// }


// export const updateTask = async (req: AuthRequest, res:Response) =>{
//     const { id } = req.params;
//     const { title, description, status, priority, dueDate } = req.body;

  
//     try {
//       // Check if task exists
//       const existingTask = await prisma.task.findUnique({
//         where: { id }
//       });
  
//       if (!existingTask) {
//         return ServerResponse.error(res, 'Task not found', 404);
//       }
  
//       // Update task
//       const updatedTask = await prisma.task.update({
//         where: { id },
//         data: {
//           title: title ?? existingTask.title,
//           description: description ?? existingTask.description,
//           status: status ?? existingTask.status,
//           priority: priority ?? existingTask.priority,
//           dueDate: dueDate !== undefined ? new Date(dueDate) : existingTask.dueDate
//         }
//       });
  
//       ServerResponse.success(res, 'Task updated successfully', updatedTask);
//     } catch (error) {
//       console.error('Update task error:', error);
//       ServerResponse.error(res, 'Server error');
//     }
// }

// export const deleteTask = async(req: Request, res:Response) =>{
//     const { id } = req.params;


//   try {
//     // Check if task exists
//     const existingTask = await prisma.task.findUnique({
//       where: { id }
//     });

//     if (!existingTask) {
//       return ServerResponse.error(res, 'Task not found', 404);
//     }

//     // Delete task
//     await prisma.task.delete({
//       where: { id }
//     });

//     ServerResponse.success(res, 'Task deleted successfully');
//   } catch (error) {
//     console.error('Delete task error:', error);
//     ServerResponse.error(res, 'Server error');
//   }
// }