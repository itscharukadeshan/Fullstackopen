/** @format */

const Book = require("./models/book");

async function getBookCount(authorIds) {
  try {
    const bookCounts = await Book.aggregate([
      {
        $match: { author: { $in: authorIds } },
      },
      {
        $group: {
          _id: "$author",
          count: { $sum: 1 },
        },
      },
    ]);

    const bookCountMap = new Map();
    bookCounts.forEach((item) => {
      bookCountMap.set(item._id.toString(), item.count);
    });

    const bookCountsForAuthors = authorIds.map((authorId) => {
      const count = bookCountMap.get(authorId.toString()) || 0;
      return count;
    });

    return bookCountsForAuthors;
  } catch (error) {
    throw new Error("Error fetching book counts for authors");
  }
}

module.exports = {
  getBookCount,
};
