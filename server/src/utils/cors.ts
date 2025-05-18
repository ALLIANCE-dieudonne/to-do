// filepath: c:\Users\filal\OneDrive\Documents\NE prep\my temps\to do app\server\src\utils\cors.ts
const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      const allowedOrigins = ["http://localhost:5173", "https://your-production-domain.com"];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Allow the request
      } else {
        callback(new Error("Not allowed by CORS")); // Deny the request
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    exposedHeaders: ["Authorization"],
  };
  
  export default corsOptions;