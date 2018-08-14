
import * as Koa from 'koa'
import * as views from 'koa-views'

import getRoutes, {errorCtrl} from './routes'
import logHandler from './extra/log-handler'
import cnf from '@root/_config'


const app = new Koa()


app
    .use(logHandler)

    .use( views(cnf.views, { extension: 'pug' } ) )

    .use( getRoutes() )
    .use(errorCtrl)

    .listen(cnf.server.port)


console.log(
    `Server running on port: ${cnf.color.CYAN}`,
    cnf.server.port,
    cnf.color.RESET
)
