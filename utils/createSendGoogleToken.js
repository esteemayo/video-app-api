const createSendGoogleToken = (user, status, req, res) => {
  const token = user.generateToken();

  res.cookie('access_token', token, {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  });

  const details = user._doc;

  res.status(status).json({
    status: 'success',
    token,
    ...details,
  });
};

export default createSendGoogleToken;
