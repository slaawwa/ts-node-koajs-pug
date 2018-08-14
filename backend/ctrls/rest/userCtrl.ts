
import * as Koa from 'koa'
// import cnf from '@root/_config'


export default {
    method: 'get',
    path: '/api/user',
    handler: async(ctx: Koa.Context) => {

        const user = {name: 'Admin'}

        ctx.body = {
            status: 'done',
            data: user,
        }
    },
}
