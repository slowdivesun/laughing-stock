const User = require("../../models/User");
const Conversation = require("../../models/Conversation");
const router = require("express").Router();

// create new conv
router.post("/", async (req, res) => {
  const newConv = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConv = await newConv.save();
    res.status(200).json(savedConv);
  } catch (err) {
    res.status(500).json(error);
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const conversations = await Conversation.find({
      members: { $in: [req.params.userId] },
    });

    res.status(200).json(conversations);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
