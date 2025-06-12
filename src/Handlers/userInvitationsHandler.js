const { getUserInvitations } = require("../Controllers/getUserInvitations");


const getUserInvitationsHandler = async (req, res) => {
  return getUserInvitations(req, res);
};

module.exports = {
  getUserInvitationsHandler
};