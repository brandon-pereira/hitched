import Guest from "./schema/Guest";

function initDatabase({ database }) {
  return {
    Guest: Guest(database),
  };
}

export default initDatabase;
