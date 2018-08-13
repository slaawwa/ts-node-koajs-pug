
import * as path from 'path'
import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as views from 'koa-views'
import * as serve from 'koa-static'


const cnf = {
    views: path.join(__dirname, '/../frontend/views'),
    static: path.join(__dirname, '../frontend/static/'),
}


const app = new Koa()


app.use(async (ctx, next) => {
    try {
        await next()
        console.info(
            ctx.method + ' ' + ctx.url + ' RESPONSE: ' + ctx.response.status
        )
    } catch (error) {}
});


app.use( views(cnf.views, { extension: 'pug' } ) );


const router = new Router()

router
    .get('/', async (ctx) => {
        await ctx.render('index', {user: 'Admin'})
        // OR
        // ctx.state = {
        //     user: 'Admin',
        // }
        // await ctx.render('index')
    })
    // .get('/*', serve( path.join(__dirname, '../frontend/static/'), {defer: true}))
    .get('/*', async(ctx, next) => {
        const a = await serve( cnf.static )
        await a(ctx, next)
        // if (ctx.status === 404) {
        //     return await ctx.render('index', {user: '404'})
        // }
    })
    .get('/api/user', async(ctx, next) => {

        const user = {name: 'Admin'}

        ctx.body = {
            status: 'done',
            data: user,
        }
    })
    .get('/api/*', async(ctx, next) => {
        ctx.status = 404
        ctx.body = {
            status: 'error',
            data: {},
            mess: '404 NOT FOUND',
        }
    })

app.use( router.routes() )

app.use(async (ctx, next) => {
    await next()
    if(ctx.status === 404 && ctx.url.indexOf('/api/')) {
        await ctx.render('index', {user: 'NOT FOUND PAGE'})
    }
})

app.listen(3000)

console.log('Server running on port 3000')
