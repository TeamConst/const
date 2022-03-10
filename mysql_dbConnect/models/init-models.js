// var DataTypes = require("sequelize").DataTypes;
// var _artist = require("./artist");
// var _music = require("./music");
// var _user = require("./user");

// function initModels(sequelize) {
//   var artist = _artist(sequelize, DataTypes);
//   var music = _music(sequelize, DataTypes);
//   var user = _user(sequelize, DataTypes);

//   music.belongsTo(artist, { as: "artist_idArtist_artist", foreignKey: "artist_idArtist"});
//   artist.hasMany(music, { as: "musics", foreignKey: "artist_idArtist"});
//   artist.belongsTo(user, { as: "user_idUser_user", foreignKey: "user_idUser"});
//   user.hasMany(artist, { as: "artists", foreignKey: "user_idUser"});

//   return {
//     artist,
//     music,
//     user,
//   };
// }
// module.exports = initModels;
// module.exports.initModels = initModels;
// module.exports.default = initModels;
