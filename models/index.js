const User = require('./User');
const Post = require('./Post');
const VerifiedDrunk = require('./VerifiedDrunk');
const Review = require('./Review');

//create associations
User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

User.belongsToMany(Post, {
    through: VerifiedDrunk,
    as: 'verified_drinks',
    foreignKey: 'user_id'
});

Post.belongsToMany(User, {
    through: VerifiedDrunk,
    as: 'verified_drinks',
    foreignKey: 'post_id'
});

VerifiedDrunk.belongsTo(User, {
    foreignKey: 'user_id'
});

VerifiedDrunk.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(VerifiedDrunk, {
    foreignKey: 'user_id'
});

Post.hasMany(VerifiedDrunk, {
    foreignKey: 'post_id'
});

Review.belongsTo(User, {
    foreignKey: 'user_id'
});

Review.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Review, {
    foreignKey: 'user_id'
});

Post.hasMany(Review, {
    foreignKey: 'post_id'
});

module.exports = { User, Post, VerifiedDrunk, Review };