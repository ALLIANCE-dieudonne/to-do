const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    const allowedOrigins = [
      /^http:\/\/localhost:5173$/,  // Your local frontend
      /^https:\/\/your-production-domain\.com$/, // Your production frontend
      /^http:\/\/localhost:5001\/api\/v1\/docs\/?.*/  // Allow Swagger documentation
    ];

    if (!origin || allowedOrigins.some((regex) => regex.test(origin))) {
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
