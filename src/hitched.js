import router from "./router";
import database from "./database";
import mailer from "./mailer";
import Mongoose from "mongoose";
import parseOptions from "./parseOptions";

function Hitched(options) {
  const internalOptions = parseOptions(options);
  internalOptions.db = database(internalOptions);
  internalOptions.mailer = mailer(internalOptions);
  return router(internalOptions);
}

export default Hitched;
