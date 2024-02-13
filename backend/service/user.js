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
};

module.exports = UserService;
