/* eslint @typescript-eslint/no-explicit-any: 0 */

/**
 * Returns list of provided arguments as is without any modification.
 *
 * The identify function is a no-operation and it does not modify the
 * provided list of arguments. If no or a single argument is provided
 * then nothing or only the same single argument is returned.
 *
 * @param args list of arguments
 * @returns array of arguments
 */
export function id(...args: any[]): any | any[] {
    if (args.length === 0) {
        return undefined;
    }
    if (args.length === 1) {
        return args[0];
    }
    return args;
}

export default id;
