import { app } from "./app";
import { envConfig } from "./config/envConfig";

const port = envConfig.port || 5000;

async function Server() {
  try {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.log("Failed to start server", error);
    process.exit(1);
  }
}

Server();
