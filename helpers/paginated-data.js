const paginatedData = (data, req) => {
  let page = 1;
  let limit = 10;

  if (req && req.query) {
     page = parseInt(req.query.page);
     limit = parseInt(req.query.limit);
  } 

  const startIdx = (page - 1) * limit;
  const endIdx = page * limit;
  const results = {};

  if (endIdx < data.length) {
    results.next = {
      page: page + 1,
      limit: limit
    }
  }

  if (startIdx > 0) {
    results.previous = {
      page: page -1,
      limit: limit
    }
  }

  results.data = data.slice(startIdx, endIdx);

  return results;
};

module.exports = {
  paginatedData,
};