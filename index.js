const e = require('./src/engine')
const commander = require('commander').Command

const program = new commander();

program
    .option('-d, --dev', 'Hosts mongo in memory');

process.args = program.parse(process.argv).opts();

//starts engine
e
    .init(process.env, process.args)
    .then((e) => e.start())
    .then(() => console.log("Service started"))
    //handle any error in startup
    .catch(err=>{
        console.error('Error in startup')
        console.error(err)
    })