/**
 * Created by yangyang on 17/2/8.
 */
var router = require('koa-router')();
var path = require('path');
var multer = require('koa-multer');
var fs = require( "fs" );

var upload = multer({ dest: path.resolve('./file/')});

router.post('/', upload.single('files'), async function (ctx, next) {
    console.log(ctx.req.file);
    fs.rename(path.resolve('./file/' + ctx.req.file.filename), path.resolve('./file/' + ctx.req.file.filename + '.' + ctx.req.file.mimetype.split('/')[1]), function (err, data) {
        if(err){
            console.log(err);
        }
        else {
            console.log('成功');
        }
    });
    ctx.body = 'end';
});

module.exports = router;