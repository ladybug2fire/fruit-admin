var User = require("../../models/user.js");
var express = require('express')
var router = express.Router()

router.get('/', function(req, res){
    User.find(function(err, docs){
        // res.json(docs)
        res.render("admin/user/list", {title: '用户管理', layout: 'admin/layout', list: docs });
    })
});

router.get('/getuser', function(req, res){
    User.find(function(err, docs){
        if(err){
            res.json({
                code: 500,
                msg: '错误'
            })
        }else{
            res.json({
                code: 200,
                data: docs,
            })
        }
    })
});

router.post('/new', function(req, res){
    User.find({ username: req.body.username}, function(err, result){
        if(result.length){
            res.send('用户名已经被占用')
        }else{
            console.log(req.body)
            var user = new User({
                username : req.body.username,
                password: req.body.password,
                phone: req.body.phone,
            });
            user.save(function (err, result) {
                if (err) {
                    console.log("Error:" + err);
                    res.json({
                        code: 500,
                        msg: err,
                    })
                }
                else {
                    res.json({
                        code: 200,
                        msg: '创建账号成功'
                    }) 
                }
            });
        }
    })
})

router.get('/new', function(req, res){
    res.render("admin/user/new", {title: '创建用户', layout: 'admin/layout'})
})

// 编辑要修改下
router.post('/edit', function(req, res){
    console.log(req.body.name, req.body)
    User.find({ username: req.body.username}, function(err, result){
        if(result.length){
            res.send('username is in used')
        }else{
            var user = new User({
                username : req.body.username,
                password: req.body.username,
                phone: req.body.phone,
            });
            user.save(function (err, result) {
                if (err) {
                    console.log("Error:" + err);
                    res.json({
                        code: 500,
                        msg: err,
                    })
                }
                else {
                    res.json({
                        code: 200,
                        msg: '创建账号成功'
                    }) 
                }
            });
        }
    })
})

router.get('/delete', function(req, res){
    User.findByIdAndRemove(req.query.id, (err, result)=>{
        if(err){
            res.json({
                code: 500,
                msg: '异常'
            })
        }else{
            res.json({
                code: 200,
                msg: '删除成功'
            })
        }
    })
    // res.render("admin/index", {title: '登入', layout: 'admin/layout' });
});

router.get('/get', function(req, res){
    User.findById(req.query.id, function(err, result){
        res.json(result)
    })
    // res.render("admin/index", {title: '登入', layout: 'admin/layout' });
});

module.exports = router;