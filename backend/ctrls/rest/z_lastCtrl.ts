
import * as Koa from 'koa'


export default {
    method: 'get',
    path: '/api/*',
    handler: async(ctx: Koa.Context, next: any) => {
        ctx.status = 404
        ctx.body = {
            status: 'error',
            data: {},
            mess: '404 NOT FOUND',
        }
    },
}
