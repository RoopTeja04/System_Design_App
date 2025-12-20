const UserModel = require("../Model/UserModel");
const { createClient } = require("redis");
const PostModel = require("../Model/post");

const createRedisClient = createClient({
  username: "default",
  password: "5gtcIw9hetS1cLftYhvUufpCClkeZzZk",
  socket: {
    host: "redis-17092.c8.us-east-1-2.ec2.cloud.redislabs.com",
    port: 17092,
  },
});

createRedisClient
  .connect()
  .then(() => {
    console.log("Redis Connected Successfully");
  })
  .catch((err) => {
    console.log("Redis connection failed:", err);
  });

exports.getProfileByID = async (req, res) => {
  try {
    const { userID } = req.params;

    if (!userID) {
      return res.status(401).json({ message: "Unaurthozied Access" });
    }

    const cacheKey = `profile: ${userID}`;

    const CachedData = await createRedisClient.get(cacheKey);

    if (CachedData) {
      return res.status(200).json({ message: "Data from Cache", User: JSON.parse(CachedData) })
    }

    const user = await UserModel.findById(userID);

    await createRedisClient.setEx(userID, 60, JSON.stringify(user))

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    return res.status(200).json({ message: "Success", User: user });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getPostsByUserID = async (req, res) => {
  try {
    const { userID } = req.params;

    const cacheKey = `posts: ${userID}`;

    const findUser = await UserModel.findById(userID);

    if (!findUser) {
      return res.status(404).json({ message: "User Not Found" });
    }

    const CachePosts = await createRedisClient.get(cacheKey);

    if (CachePosts) {
      return res.status(200).json({ message: "Data from Cache", Posts: JSON.parse(CachePosts) })
    }

    const Posts = await PostModel.find({ userID }).sort({ createdAt: -1 });

    await createRedisClient.setEx(userID, 60, JSON.stringify(Posts));

    return res.status(200).json({ message: "Success", Posts });
  } catch (err) {
    res.status(500).json({ message: err });
  }
}