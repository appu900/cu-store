import { env } from "./env";
import app from "../app";
import { connectDB } from "./db";

async function bootStrap() {
  try {
    await connectDB();
    app.listen(env.port, () => {
      console.log(`server started on PORT ${env.port}`);
    });
  } catch (error) {
    console.error("failed to startup the server");
    process.exit(1);
  }
}

export default bootStrap;
