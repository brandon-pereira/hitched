function filterGuests(guests, filterBy) {
  return guests.filter((guest) => {
    if (filterBy === "ALL") {
      return true;
    } else if (filterBy === "CONFIRMED") {
      return guest.isConfirmed;
    } else if (filterBy === "DECLINED") {
      return guest.isDeclined;
    } else if (filterBy === "PENDING") {
      return !guest.isConfirmed && !guest.isDeclined;
    } else {
      return false;
    }
  });
}

export default filterGuests;
