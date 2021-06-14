import _get from "lodash.get";

function parseOptions(providedOpts) {
  // make sure a database is provided
  if (!providedOpts.database) {
    throw new Error("You must provide a Mongoose database object.");
  }
  const options = _get(providedOpts, "options", {});
  validate(options, {
    path: "options",
    requiredFields: ["emails", "admin"],
  });
  validate(options.emails, {
    path: "options.emails",
    requiredFields: ["templates", "emailSender", "emailReplyAddress"],
  });
  validate(options.emails, {
    path: "options.emails",
    requiredFields: ["templates", "emailSender"],
  });
  return {
    database: providedOpts.database,
    config: options,
  };
}

function validate(opt, { path, requiredFields }) {
  if (!opt || typeof opt !== "object") {
    throw new Error(
      `"${path}" is not defined. It needs to be an object with the following fields ["${requiredFields.join(
        ', "'
      )}"]`
    );
  }
  const missingFields = requiredFields.filter((key) => !opt[key]);
  if (missingFields.length) {
    throw new Error(
      `"${path}" is missing the following required fields ["${missingFields.join(
        ', "'
      )}"]`
    );
  }
}

export default parseOptions;
