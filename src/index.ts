import signale from "signale";

signale.info("The");

import "dotenv/config";
import { connect } from "mongoose";

connect(process.env.MONGO_URI).then(() => signale.success("[DB] READY"));

import { App } from "./Server";
new App().start();
