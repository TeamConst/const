exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send("로그인 필요");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent("로그인한 상태입니다.");
    res.redirect(`/?error=${message}`);
  }
};

exports.isCorrectMetamask = async (req, res, next) => {
  console.log("여기가나와라");
  console.log(req.user.address);
  console.log(req.body.address);
  if (req.user.address == JSON.parse(req.body.address)) {
    next();
  } else {
    res
      .status(403)
      .send("메타마스크 연결 된 아이디와 세션 아이디가 같지 않습니다.");
  }
};
