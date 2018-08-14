
import * as Koa from 'koa'
import cnf from '@root/_config'
import * as serve from 'koa-static'


export default [
    {
        method: 'get',
        path: '/',
        handler: async (ctx: Koa.Context) => {
            await ctx.render('index', {user: 'Admin'})
        },
    }, {
        method: 'get',
        path: '/*',
        // handler: async(ctx: Koa.Context, next: Koa.Context) => {
        handler: async(ctx: Koa.Context, next: any) => {
            const a = await serve( cnf.static )
            await a(ctx, next)
            // if (ctx.status === 404) {
            //     return await ctx.render('index', {user: '404'})
            // }
        },
    },
]
