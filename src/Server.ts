import { Server } from "@overnightjs/core";
import signale from "signale";
import cors from "cors";
import express, { Handler } from "express";
import { errorHandler } from "./utils/errorHandler";
import { BigController } from "./api";

export class App extends Server {
  constructor() {
    super(false);
    signale.pending("DOing the server");

    this.app.use(
      cors({
        origin: ["http://localhost:3000"].filter(Boolean) as string[],
        optionsSuccessStatus: 200,
        credentials: true,
      })
    );
    this.app.use(express.json());

    this.app.get("/", (req, res) => {
      return res.status(200).json({
        message:
          "Hi! Welcome to a small project made by boon-cpu on github for buildergroup's builderhacks https://discord.gg/dzyHdj9AYf",
      });
    });
    this.register();
  }

  public start(): this {
    this.app.listen(8000, () => {
      signale.success("Listening on", 8000);
    });
    return this;
  }

  private register() {
    this.addControllers(
      [new BigController()],
      undefined,
      errorHandler as unknown as Handler
    );
    signale.complete("Did it!");
  }
}
