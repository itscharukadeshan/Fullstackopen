/** @format */

const DataLoader = require("dataloader");
const { getBookCount } = require("./getBookCount");

const authorBookCountLoader = new DataLoader(async (authorIds) => {
  const bookCounts = await getBookCount(authorIds);
  return bookCounts;
});

module.exports = {
  authorBookCountLoader,
};
