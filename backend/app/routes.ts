
import * as path from 'path'
import * as glob from 'glob'
import * as Router from 'koa-router'
import * as Koa from 'koa'
import {Middleware} from 'koa-compose'


import errorCtrl from '@back/ctrls/page/_errorCtrl'

export {errorCtrl}


enum OptionsMethod {
    get = 'get',
    post = 'post',
}
// OR
// type OptionsMethod = 'get' | 'post';


interface InterfaceCtrl {
    method: OptionsMethod,
    path: string,
    handler: Router.IMiddleware,
}


export default function(): Middleware<Koa.Context> {

    const router = new Router()

    glob.sync('**/!(_)*{Ctrl,Ctrl.ts}', {cwd: './backend/ctrls/'})
        .forEach( file => {

            let ctrlTmp: InterfaceCtrl | Array<InterfaceCtrl> = require(
                path.resolve( `./backend/ctrls/${file}` )
            ).default

            if (!Array.isArray( ctrlTmp )) {
                ctrlTmp = [ctrlTmp]
            }

            ctrlTmp.forEach((ctrl: InterfaceCtrl) => {
                router[ ctrl.method ]( ctrl.path, ctrl.handler )
            })

            console.log(' - ctrl::', file )
        })

    return router.routes()
}
