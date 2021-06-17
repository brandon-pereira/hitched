import { ERRORS } from "../constants";

export default function initLookup({ router, db }) {
  router.post("/api/lookup", async (req, res) => {
    let { email } = req.body;
    if (!email) {
      return sendError(res, ERRORS.ERR_EMAIL_NOT_EXIST);
    }
    // db is all lowercase too
    email = email.toLowerCase();
    const guest = await db.Guest.findOne({ email });
    if (!guest) {
      return sendError(res, ERRORS.ERR_EMAIL_NOT_EXIST);
    }
    res.json({ success: true, guest });
  });
}

function sendError(res, message) {
  return res.status(500).send(message);
}
