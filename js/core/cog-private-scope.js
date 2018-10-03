/**
 * COG Private Scope Object
 *
 * @param obj
 * @constructor
 */
cog.PrivateScope = function PrivateScope(obj) {
    this.self = obj;
    this.super = {};
};
cog.PrivateScope.abstract = true;