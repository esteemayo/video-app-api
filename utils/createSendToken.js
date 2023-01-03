/* eslint-disable */

const createSendToken = (user, status, req, res) => {
  const token = user.generateToken();

  const { password, ...rest } = user._doc;

  res
    .cookie('access_token', token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      signed: true,
      sameSite: true,
      secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    })
    .status(status)
    .json({
      status: 'success',
      ...rest,
    });
};

export default createSendToken;
