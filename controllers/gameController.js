const catchAsync = require('../utils/catchAsync');

exports.getAllGames = catchAsync(async (req, res, next) => {
  //   const games = await Game.find();

  res.status(200).json({
    status: 'success',
    results: 0,
    data: {
      message: 'This route is not yet defined!'
    }
  });
});
