/**
 * Returns provided argument(s) as is without any modification.
 *
 * The identify function is a no-operation and does not modify the provided list
 * of arguments. If no or a single argument is provided then nothing or only the
 * same single argument is returned.
 *
 * @param args list of anything
 * @returns provided argument(s)
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
