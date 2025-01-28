import app from "./app.js";
import { dbConnect } from "./config/db.js";
import { port } from "./config/env.js";

await dbConnect().then(console.log("Connected to Database"));

app.listen(port, () => {
  console.log("server is running on " + port);
});
