import { ERRORS } from "../constants";
import ical from "ical-generator";

function initRsvpRoutes({ router, db, mailer }) {
  router.post("/api/rsvp", async (req, res) => {
    const {
      email: _email,
      attending,
      dietaryRestrictions,
      musicSuggestions,
      plusOne,
    } = req.body;
    if (!_email) {
      return sendError(res, ERRORS.ERR_EMAIL_NOT_EXIST);
    }
    const email = _email.toLowerCase();
    let _user;
    try {
      _user = await db.Guest.findOne({ email });
      if (!_user) {
        console.error("Invalid guest", email);
        return sendError(res, ERRORS.ERR_UNKNOWN);
      }
      _user.isConfirmed = attending;
      _user.isDeclined = !attending;
      if (attending) {
        _user.dietaryRestrictions = dietaryRestrictions || undefined;
        _user.musicSuggestions = musicSuggestions || undefined;
        if (plusOne && plusOne.firstName && plusOne.lastName) {
          _user.plusOne.firstName = plusOne.firstName;
          _user.plusOne.lastName = plusOne.lastName;
        } else {
          _user.plusOne = {};
        }
      }
      await _user.save();
    } catch (err) {
      console.error(err);
      return sendError(res, ERRORS.ERR_UNKNOWN, err);
    }

    if (attending) {
      try {
        const html = await mailer.useTemplate("confirmation", _user.toObject());
        await mailer.sendMail({
          to: email,
          subject: "We've received your RSVP!",
          html,
          sendCalendarAttachment: true,
        });
        _user.isConfirmationSent = true;
        await _user.save();
      } catch (err) {
        console.error(err);
        // TODO: should we return here or does that create more bugs?
        // return sendError(res, ERR_UNKNOWN, err);
      }
    }

    res.json({ success: true });
  });
}

function sendError(res, message) {
  return res.status(500).send(message);
}

export default initRsvpRoutes;
