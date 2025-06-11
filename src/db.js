require("dotenv").config();
const {Sequelize} = require("sequelize");
const fs = require('fs');
const path = require('path');

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false,
    native: false,
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);



const { User, Event, Post, Comment, FollowRequest, Notification, Message, Chat} = sequelize.models;

// User
User.hasMany(Message, { foreignKey: "senderId" });
User.hasMany(Chat, { foreignKey: "user1Id", as: "chatsInitiated" });
User.hasMany(Chat, { foreignKey: "user2Id", as: "chatsReceived" });

// Chat
Chat.belongsTo(User, { foreignKey: "user1Id", as: "user1" });
Chat.belongsTo(User, { foreignKey: "user2Id", as: "user2" });
Chat.hasMany(Message, { foreignKey: "chatId" });

// Message
Message.belongsTo(Chat, { foreignKey: "chatId" });
Message.belongsTo(User, { foreignKey: "senderId" });


//Follow
FollowRequest.belongsTo(User, { foreignKey: 'requesterId', as: 'requester' });
FollowRequest.belongsTo(User, { foreignKey: 'targetId', as: 'target' });

// Opcional si querés acceder inversamente
User.hasMany(FollowRequest, { foreignKey: 'requesterId', as: 'sentRequests' });
User.hasMany(FollowRequest, { foreignKey: 'targetId', as: 'receivedRequests' });

Notification.belongsTo(User, { as: 'recipient', foreignKey: 'recipientId' });
Notification.belongsTo(User, { as: 'actor', foreignKey: 'actorId' });

User.hasMany(Comment);
Comment.belongsTo(User);

Post.hasMany(Comment);
Comment.belongsTo(Post);

// Likes (usuario puede dar like a muchos posts, un post tiene muchos likes)
User.belongsToMany(Post, { through: 'Like', as: 'LikedPosts' });
Post.belongsToMany(User, { through: 'Like', as: 'Likers' });



//van estos dos de followRequest , mover archovos a model:
User.belongsToMany(User, {
  through: 'FollowRequest',
  as: 'FollowRequestsSent',
  foreignKey: 'requesterId',
  otherKey: 'targetId',
});
User.belongsToMany(User, {
  through: 'FollowRequest',
  as: 'FollowRequestsReceived',
  foreignKey: 'targetId',
  otherKey: 'requesterId',
});

// Evento creado por un usuario
User.hasMany(Event, { as: 'createdEvents', foreignKey: 'creatorId' });
Event.belongsTo(User, { as: 'creator', foreignKey: 'creatorId' });

// Usuario invitado a eventos (relación N:M)
User.belongsToMany(Event, { through: 'UserEvent', as: 'attendingEvents' });
Event.belongsToMany(User, { through: 'UserEvent', as: 'attendees' });

// Post en evento
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

Event.hasMany(Post, { foreignKey: 'eventId' });
Post.belongsTo(Event, { foreignKey: 'eventId' });

module.exports = {
    ...sequelize.models,
    conn: sequelize,
  };
