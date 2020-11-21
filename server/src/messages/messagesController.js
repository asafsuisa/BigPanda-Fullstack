const MessageModel = require('./messagesModel');

exports.add = (req, res) => {

  if (!req.body) {
    res.status(400).json({
      result: 'Please supply the email and the message content inside the body of the request.'
    });

    return;
  }
  let emailFromReq = req.body.email;
  let messageFromReq = req.body.message;
  if (!emailFromReq) {
    res.status(400).json({
      result: 'Email is required and not supplied.'
    });

    return;
  }

  if (!messageFromReq) {
    res.status(400).json({
      result: 'Message is required and not supplied.'
    });

    return;
  }

  let messageData = new MessageModel();
  messageData.email = emailFromReq;
  messageData.message = messageFromReq;
  messageData.timeStamp = new Date();

  messageData.save((err) => {
    if (err) {
      res.status(500).json(err);
    }
    res.json({
      message: "Message save successfully.",
      data: messageData
    });
  });
};

exports.getUserLastActived = (req, res) => {

  let emailFromReq = req.query && req.query.email;
  if (!emailFromReq) {
    res.status(400).json({
      result: 'Email is required and not supplied.'
    });

    return;
  }

  MessageModel.find({ email: emailFromReq })
    .sort({ timeStamp: -1 })
    .limit(1)
    .exec((err, data) => {
      if (err)
        res.status(500).json(err);
      
      if (data.length === 0) {
        res.status(400).json({
          result: 'No results found for the given email.'
        });
        return;
      }

      res.json({
        lastActive: data[0].timeStamp
      });
    });
}

exports.getItems = (req, res) => {
  let filterValue = req.query.filterBy || '';
  let limit = req.query.limit || (!filterValue ? 10 : 0);
  MessageModel.find({ email: { $regex: filterValue, $options: "i" } })
    .sort({ timeStamp: -1 })
    .limit(limit)
    .exec((err, messages) => {
      if (err)
        res.status(500).json(err);
      res.json({
        data: messages
      });
    });
}