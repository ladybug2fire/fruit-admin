/**
 * 评论信息
 */
var mongoose = require('../config/db'),
    Schema = mongoose.Schema;

var ReviewSchema = new Schema({
    userid: { type: String }, // 用户 id
    username: {type: String} , // 用户昵to
    avatar: String, //头像
    star: { type: Number }, //评分
    addTime: {type: String}, // 添加时间
    desc: {type: String},
    articleid: String,  // 文章 id
});

module.exports = mongoose.model('Review',ReviewSchema);