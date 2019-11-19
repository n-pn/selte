const regex = /:[a-z_]+|\*[a-z_]+/g

const tests = ['aa/b/c', 'aa/:bc/cc', '*ax/bc/cc', 'a/*b/:c', ':a/b/:c']

for (let test of tests) {
    console.log({ test })

    let match
    do {
        match = regex.exec(test)
        if (match) {
            console.log(match[0])
        }
    } while (match)
}
