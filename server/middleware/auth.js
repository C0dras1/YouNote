const jwt = require('jsonwebtoken');
const auth = (req, res, next) => {
  let publicURLs = [
    {url: '/api/auth/', method: 'POST'}
  ]

  let isPublic = false;

  for(let i = 0; i < publicURLs.length; i++) {
    const {url, method} = publicURLs;
    if(req.url.includes(url) && req.method === method) {
      isPublic = true;
      break;
    }
  }

  if(isPublic) {
    next();
    return;
  }

  const token = req.header('x-auth-token');
  if (!token) {
    res.status(400).json({msg: "Invalid token. Access Denied"});
    return;
  }

  try {
    const decoded = jwt.verify(JSON.parse(token), 'secret');
    req.username = decoded;
    next();
  }.catch(exception) {
    res.status(400).json({msg: "Token is not valid"});
  }
}

module.exports = auth;