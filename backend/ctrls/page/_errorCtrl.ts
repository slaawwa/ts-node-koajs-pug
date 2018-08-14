
import * as Koa from 'koa'


export default async (ctx: Koa.Context, next: any) => {
    await next()
    if(ctx.status === 404 && ctx.url.indexOf('/api/')) {
        await ctx.render('index', {user: 'NOT FOUND PAGE'})
        ctx.status = 404
    }
}
