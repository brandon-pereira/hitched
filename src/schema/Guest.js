import { Schema } from "mongoose";

function Guest(mongoose) {
  const schema = new Schema({
    firstName: {
      type: String,
      required: true,
      maxlength: 50,
      minlength: 1,
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 50,
      minlength: 1,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    creationDate: {
      type: Date,
      default: Date.now,
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    isConfirmationSent: {
      type: Boolean,
      default: false,
    },
    isDeclined: {
      type: Boolean,
      default: false,
    },
    isInviteSent: {
      type: Boolean,
      default: false,
    },
    numberOfKids: {
      type: Number,
      maxlength: 50,
      minlength: 0,
    },
    plusOne: {
      firstName: {
        type: String,
        maxlength: 50,
        minlength: 1,
      },
      lastName: {
        type: String,
        maxlength: 50,
        minlength: 1,
      },
    },
    dietaryRestrictions: {
      type: String,
      minlength: 1,
    },
    musicSuggestions: {
      type: String,
      minlength: 1,
    },
  });

  const model = mongoose.model("User", schema);

  return model;
}

export default Guest;
