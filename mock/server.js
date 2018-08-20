var Koa = require('koa');
var app = new Koa();
var Router=require('koa-router');
var router =new Router();

//为了解决同源问题
var cors=require("koa-cors");

app.use(new cors(
    {
        origin: function (ctx) {
            // if (ctx.url === '/test') {
            //     return "*"; // 允许来自所有域名请求
            // }
            return "*"; // 这样就能只允许 http://localhost:8080 这个域名的请求了
        },
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
        maxAge: 5,
        credentials: true,
        allowMethods: ['GET', 'POST', 'DELETE','HEAD', 'PUT'],
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    }
));
// 开始服务并生成路由
// 对于任何请求，app将调用该异步函数处理请求：
// app.use(async (ctx, next) => {
//     console.log(ctx.request.path+':'+ctx.request.method);
//     await next();
// });


// router.get('/', function *(next) {
//     this.body = 'hello koa !'
// });
//
// router.get('/api', function *(next) {
//     this.body = 'test data'
// });

// 首页 —— 广告（超值特惠）
console.log('./home/ad.js------------');
var homeAdData = require('./home/ad.js');
console.log('homeAdData------------');
router.get('/api/homead', (ctx, next) => {
    console.log('首页 —— 广告（超值特惠）');
    console.log('homeAdData');
    ctx.body = homeAdData;
});
console.log('end------------');

//  router.get('/api/homead',  async  (ctx, next) => {
//     await next();
//     console.log(homeAdData);
//     // ctx.response.body = homeAdData;
//     ctx.response.type = 'text/html';
//     // 设置response的内容:
//     ctx.response.body = '<h1>Hello, koa2!</h1>';
// });

// 首页 —— 推荐列表（猜你喜欢）
var homeListData = require('./home/list.js')
router.get('/api/homelist/:city/:page', (ctx, next) => {
    console.log('首页 —— 推荐列表（猜你喜欢）')
    console.log(ctx,ctx.params,'ctx--------');
    // 参数
    const params = ctx.params
    const paramsCity = params.city
    const paramsPage = params.page

    console.log('当前城市：' + paramsCity)
    console.log('当前页数：' + paramsPage)

    ctx.body = homeListData;
});

// 搜索结果页 - 搜索结果 - 三个参数
var searchListData = require('./home/ad.js');
router.get('/api/search/:page/:city/:category/:keyword', (ctx, next) =>  {
    console.log('搜索结果页 - 搜索结果')

    // 参数
    const params = ctx.params;
    const paramsPage = params.page;
    const paramsCity = params.city;
    const paramsCategory = params.category;
    const paramsKeyword = params.keyword;

    console.log('当前页数：' + paramsPage);
    console.log('当前城市：' + paramsCity);
    console.log('当前类别：' + paramsCategory);
    console.log('关键字：' + paramsKeyword);

    ctx.body = searchListData;
})
// 搜索结果页 - 搜索结果 - 两个参数
router.get('/api/search/:page/:city/:category', (ctx, next) =>  {
    console.log('搜索结果页 - 搜索结果')
    console.log(ctx,ctx._matchedRoute,'ctx--------');
    // 参数
    const params = ctx.params;
    console.log(params,'params-----------');
    const paramsPage = params.page || '';
    const paramsCity = params.city || '';
    const paramsCategory = params.category || '';

    console.log('当前页数：' + paramsPage);
    console.log('当前城市：' + paramsCity);
    console.log('当前类别：' + paramsCategory);

    ctx.body = {hasMore:true,data:searchListData};
})

// 详情页 - 商户信息
const detailInfo = require('./detail/info.js')
router.get('/api/detail/info/:id', (ctx, next) =>  {
    console.log('详情页 - 商户信息')

    const params = ctx.params;
    const id = params.id;

    console.log('商户id: ' + id);

    ctx.body = detailInfo;
});
// 详情页 - 用户评论
const detailComment = require('./detail/comment.js')
router.get('/api/detail/comment/:page/:id', (ctx, next) =>  {
    console.log('详情页 - 用户点评')

    const params = ctx.params;
    const page = params.page;
    const id = params.id;

    console.log('商户id: ' + id);
    console.log('当前页数: ' + page);

    ctx.body = detailComment;
});

// 订单列表
const orderList = require('./orderlist/orderList.js');
router.get('/api/orderlist/:username', (ctx, next) =>  {
    console.log('订单列表');

    const params = ctx.params;
    const username = params.username;
    console.log('用户名：' + username);

    ctx.body = orderList;
});

// 提交评论
router.post('/api/submitComment', (ctx, next) =>  {
    console.log('提交评论')

    // 获取参数

    ctx.body = {
        errno: 0,
        msg: 'ok'
    };
})


app
    .use(router.routes())
    .use(router.allowedMethods());
app.listen(3000);

console.log('app started at port 3000...');
