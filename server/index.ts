import FusionApp, { createPlugin, createToken } from "fusion-core"


type SamplePluginT = {
    name: string
}


// eslint-disable-next-line
type Deps = {}

const SampleToken = createToken<SamplePluginT>('Sample')

const SamplePlugin = createPlugin<Deps, SamplePluginT>({
    middleware: () => async (ctx, next) => {
        if (ctx.path == '/api/sample' && ctx.method == "GET") {
            console.log('ok')
            ctx.response.body = { data: 'ok' }
        }
        if (ctx.path == '/api/sample' && ctx.method == "POST") {


            // ctx.response.body = ctx
        }
        await next()
    },
    provides: () => ({ name: "Sample Plugin" })
})

export const initServer = (app: FusionApp) => {

    app.register(SampleToken, SamplePlugin)

}