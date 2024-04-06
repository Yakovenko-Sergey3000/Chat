// ---- NODE CONFIG ----
import cors from "cors";
import bodyParse from "body-parser";
import cookieParser from "cookie-parser";
import { CONFIG } from "./config/env.config.mjs";

// // ---- SERVER CONFIG ----
import http from "http";
import express from "express";
import session from "express-session";
import { Server } from "socket.io";

// ---- DATABASE CONFIG ----
import ConnectSessionKnex from "connect-session-knex";
import { DB } from "./DBConfig/configDB.mjs";

// ---- MIDDLEWARE CONFIG ----
import hadlersUser from "./components/handlersUser.mjs";
import hadlersMess from "./components/handlersMess.mjs";
import routes from "./routes/index.mjs";
import { DbMiddleware } from "./middleware/db.middleware.mjs";
import { Authenticator } from "./lib/authenticator/index.mjs";
import AuthService from "./services/auth.service.mjs";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const KnexSessionStore = ConnectSessionKnex(session);

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(DbMiddleware);

app.use(
  session({
    store: new KnexSessionStore({
      knex: DB,
      tablename: "session",
    }),
    secret: "SeCReT",
    cookie: {
      secure: true,
      expires: 1000 * 60 * 60,
    },
    saveUninitialized: false,
    resave: false,
  }),
);

app.use(Authenticator.session());

Authenticator.serialiseUser = async (userId) => {
  const user = await DB("users").where({ id: userId }).first();

  if (user) delete user.password;

  return user;
};

Authenticator.authenticateStrategy = new AuthService().authenticateStrategy;

io.on("connection", (socket) => {
  console.log(
    "connection" + " " + new Date().getHours() + ":" + new Date().getMinutes(),
  );
  hadlersUser(io, socket);
  hadlersMess(io, socket);
});

// ---- ROUTER ----

app.use(routes);
app.use(express.static("public"));

// ---- INIT APP ----
const PORT = CONFIG.PORT || 6000;

try {
  server.listen(PORT, async () => {
    // await createTables();

    console.log(`Server running on port: ${PORT}`);
  });
} catch (e) {
  console.log(e);
}
