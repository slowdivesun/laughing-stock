const User = require("../../models/User");
const Conversation = require("../../models/Conversation");
const router = require("express").Router();

// create new conv
router.post("/", async (req, res) => {
  try {
    try {
      const sender = await User.findById(req.body.senderId);
      const receiver = await User.findById(req.body.receiverId);
      console.log(sender, receiver);
    } catch (err) {
      return res.status(400).json({ error: "User ID invalid" });
    }

    const newConv = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
    });
    const savedConv = await newConv.save();
    res.status(200).json(savedConv);
  } catch (err) {
    res.status(500).json(err);
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
