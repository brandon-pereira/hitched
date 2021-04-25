import router from "./router";

import database from "./database";
import mailer from "./mailer";

function Hitched(options) {
  if (!options.database) {
    throw new Error("You must provide a Mongoose database object.");
  }
  const internalOptions = {
    config: options.config,
  };
  internalOptions.db = database(options);
  internalOptions.mailer = mailer(options);

  return router(internalOptions);
}

export default Hitched;
