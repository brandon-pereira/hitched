// CLIENT API IS WIP!!

async function lookup(email) {
  return post(`api/lookup`, { email }).catch(handleServerError);
}

async function setDeclined(email) {
  return post(`api/rsvp`, {
    email,
    isDeclined: true,
    isConfirmed: false,
  }).catch(handleServerError);
}

// async function rsvp()
