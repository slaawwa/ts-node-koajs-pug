
import * as Koa from 'koa'
import cnf from '@root/_config'


export default async (ctx: Koa.Context, next: any) => {
    try {

        await next()

        const color = ctx.response.status === 200
            ? cnf.color.GREEN
            : cnf.color.RED,

            method = ctx.method,
            status = ctx.response.status,
            url = ctx.url

        console.info(
            `${color}${method} [${status}]${cnf.color.RESET} ${url}`
        )

    } catch (error) {
        console.error(' => Error:', error)
    }
}
