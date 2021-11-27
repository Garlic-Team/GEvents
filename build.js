const { execSync } = require('child_process');
const fs = require('fs');

let build = (execSync('npx babel --extensions .ts ./src -d ./dist --minified')).toString();
if (build.includes('Successfully')) {
    let content = (fs.readFileSync('./dist/index.js')).toString();
    content += '\nmodule.exports = { GEvents: exports.GEventsRaw.default, Event: exports.EventRaw.default, EventOptionsBuilder: exports.EventOptionsBuilderRaw.default };'

    fs.writeFileSync('./dist/index.js', content);
    console.log('Done!')
}