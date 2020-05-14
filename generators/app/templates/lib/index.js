/**
 * Returns list of provided arguments as is without any modification.
 *
 * The identify function is a no-operation and it does not modify the
 * provided list of arguments. If no or a single argument is provided
 * then `undefined` or the same argument is returned.
 *
 * @function
 * @param {object} arguments
 *  object of arguments
 * @returns {any[]|undefined}
 *  array of arguments or `undefined`
 */
export function id() {
    if (arguments.length === 0) {
        return undefined;
    }
    if (arguments.length === 1) {
        return arguments[0];
    }
    return Array.prototype.slice.call(
        arguments
    );
}
export default id;
