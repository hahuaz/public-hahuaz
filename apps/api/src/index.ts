import { createServer } from "./server";
import { log } from "@repo/logger";

const myvar = "hello";

const port = process.env.PORT || 3001;
const server = createServer();

server.listen(port, () => {
  log(`api running on ${port}`);
});
