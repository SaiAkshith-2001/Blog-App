export const paginationMiddleware = (model) => {
  return async (req, res, next) => {
    try {
      const skip = parseInt(req.query.skip);
      const limit = parseInt(req.query.limit) || 10;
      const paginatedResults = {};
      const total = await model.countDocuments();
      paginatedResults.posts = await model.find().limit(limit).skip(skip);
      paginatedResults.data = {
        total,
        limit,
        skip,
      };
      // // if (skip > 0) {
      //   paginatedResults.prev = {
      //     page: page - 1,
      //     limit,
      //   };
      // }

      // if (skip < total) {
      //   paginatedResults.next = {
      //     page: page + 1,
      //     limit,
      //   };
      // }
      res.paginatedResults = paginatedResults;
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};
