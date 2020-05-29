const RouterProxy = function (orgRouter, options) {
    this.router = orgRouter
    this.prefix = options.prefix
    this.setMiddleware(options.middleware)
    
}

RouterProxy.prototype.getOriginalMethod = function(method) {
    return this.router[method];
}

RouterProxy.prototype.setMiddleware = function(middleware) {
    this.middleware = !Array.isArray(middleware)
            ? [middleware] 
            : middleware
}

RouterProxy.prototype.getMiddleware = function() {
    return this.middleware
}

RouterProxy.prototype.getPrefix = function() {
    return '/' + this.prefix.replace(/\/+$/g, '')
}

module.exports = RouterProxy