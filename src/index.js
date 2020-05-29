const RouterProxy = require('./routerProxy')

const handler = {
    get(target, key) {
        return function(...args) {
            const origMethod = target.getOriginalMethod(key)
            let [path, ...callbacks] = args;
            let middleware = target.getMiddleware()  

            path = '/' + path.replace(/^\/+/g, '')     
            let result = origMethod.call(target.router, path, ...middleware, ...callbacks)
            return result
        }
    }
}

function routeGroup(Router) {
    let defaultOptions = {
        prefix: '/',
        middleware: []
    }

    Router.group = function(options, fn) {
        if (typeof fn === 'undefined') {
            fn = options
            options = defaultOptions
        } else {
            options = {...defaultOptions, ...options}
        }

        let proxiedRouter = new RouterProxy(Router(), options)
        let router = new Proxy(proxiedRouter, handler)
        
        fn(router);
        this.use(proxiedRouter.getPrefix(), proxiedRouter.router)

        return router;
    }
}

module.exports = routeGroup