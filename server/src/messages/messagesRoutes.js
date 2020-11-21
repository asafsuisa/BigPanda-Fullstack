var messagesController = require('./messagesController');

exports.initalizeRoutes = (router) => {
  router.route('/message')
    .post(messagesController.add);
  router.route('/message/getLastActivatedTime')
    .get(messagesController.getUserLastActived);
  router.route('/messages')
    .get(messagesController.getItems);
}
