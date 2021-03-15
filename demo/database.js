import mongoose from "mongoose";

// Use Promises
mongoose.Promise = Promise;

// Error logging
mongoose.connection.on("error", (err) =>
  console.error("Connection error:", err)
);

// Connection Logic
mongoose.connect(
  `mongodb://localhost/${process.env.DATABASE_NAME || "wedding"}`,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

export default mongoose;
