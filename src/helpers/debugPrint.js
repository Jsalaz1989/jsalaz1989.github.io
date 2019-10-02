export const debugPrint = (variObj, context) => {
    let location
    context.forEach(level => {
        if (location === undefined)
            location = level
        else
            location = location + ' > ' + level
    })

    // console.log('variObj = ', variObj)

    const varToString = varObj => Object.keys(varObj)[0]

    console.log(location, ' : ', varToString(variObj), ' = ', variObj[varToString(variObj)])
}