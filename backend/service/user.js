const { prisma } = require("../db-client");
const {
  ServiceError,
  ErrorStatusCodes,
} = require("../error-handling/service-error");
const jwt = require("jsonwebtoken");

const secretKey = "0123456789";

const createJWTToken = (id, email, username) => {
  const payload = {
    id: id,
    email: email,
    username: username,
  };
  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
  return { token: token };
};

const UserService = {
  createUser: async function (req) {
    const { name, email, password, username } = req.body;
    const usersWithSameEmailORNumber = await prisma.user.findMany({
      where: {
        OR: [{ email: email, username: username }],
      },
    });
    if (usersWithSameEmailORNumber.length > 0) {
      throw new ServiceError(
        "user with same email/number already exists",
        ErrorStatusCodes.Bad_Request
      );
    }
    const userDetails = await prisma.user.create({
      data: {
        name: name,
        email: email,
        username: username,
        password: password,
      },
    });
    return createJWTToken(
      userDetails.id,
      userDetails.email,
      userDetails.username
    );
  },

  loginUser: async function (username, password) {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      throw new ServiceError("user not found", ErrorStatusCodes.Bad_Request);
    }
    if (user.password !== password) {
      throw new ServiceError(
        "invalid username or password",
        ErrorStatusCodes.Bad_Request
      );
    }
    return createJWTToken(user.id, user.email, user.username);
  },

  checkToken : async function (token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    console.log(decoded);
    let result = {isValidToken : true};
    const userDetails = await prisma.user.findUnique({
      where : {id: decoded.id},
      select : {
        email : true,
        username: true,
        name: true
      }
    })
    result = {...result, ...userDetails};
    return result;
  } catch (error) {
    console.log(error);
    throw new ServiceError(error, ErrorStatusCodes.Bad_Request);
  }
  }
};

module.exports = UserService;
