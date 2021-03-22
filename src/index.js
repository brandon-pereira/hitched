import router from "./router";

import database from "./database";

function Hitched(options) {
  if (!options.database) {
    throw new Error("You must provide a Mongoose database object.");
  }
  const internalOptions = {
    config: options.config,
  };
  internalOptions.db = database(options);

  return router(internalOptions);
}

export default Hitched;
