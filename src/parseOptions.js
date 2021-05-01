import _get from "lodash.get";

function parseOptions(providedOpts) {
  const _opts = {};
  // make sure a database is provided
  if (!providedOpts.database) {
    throw new Error("You must provide a Mongoose database object.");
  }
  const config = _get(providedOpts, "config", {});
  validateEmailConfig(config);
  //   if (!config.emails || !config.emails.templates) _opts.config = config;

  return _opts;
}

function validateEmailConfig() {
  return validate(config, { requiredFields: ["templates", "emailSender"] });
}

function validate(opt, { requiredFields }) {}

export default parseOptions;
