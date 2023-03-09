console.log("module")

async function start() {
    return await Promise.resolve('start')
}

start().then(console.log)