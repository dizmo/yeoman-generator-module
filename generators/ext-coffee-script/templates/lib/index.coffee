###
Returns provided argument(s) as is without any modification.

The identify function is a no-operation and does not modify the provided list
of arguments. If no or a single argument is provided then nothing or only the
same single argument is returned.

@param arguments list of anything
@returns provided argument(s)
###
export id = () ->
  if arguments.length == 0
    return undefined
  if arguments.length == 1
    return arguments[0]
  return arguments

export default id
