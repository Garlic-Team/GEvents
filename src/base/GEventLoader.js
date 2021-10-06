const { Collection } = require('discord.js');
const Color = require('../structures/Color'), { Events } = require('../util/Constants');
const fs = require('fs');
const Event = require('../structures/Event');
const { isClass } = require('../util/util');

class GEventLoader {
    constructor(client, options = {}) {
        if (typeof client !== 'object') return console.log(new Color('&d[GEvents] &cNo discord.js client provided!',{json:false}).getText());

        this.client = client;

        this.eventDir = this.client.eventDir ? this.client.eventDir : options.eventDir;
        this.client.gevents = new Collection();

        if(!this.eventDir) return;
        this.__loadEventFiles();
    }

    async __loadEventFiles() {
        for(let dir of (await fs.readdirSync(`${this.eventDir}`))) {
            let file;
            let fileName = dir.split('.').reverse()[1]
            let fileType = dir.split('.').reverse()[0]
            if(fileType == 'js' || fileType == 'ts') {
                try {
                    let finalFile;

                    file = await require(`${this.eventDir}/${dir}`);
                    if (isClass(file)) {
                        finalFile = await new file(this.client)
                        if(!(finalFile instanceof Event)) return console.log(new Color(`&d[GEvents] &cEvent ${fileName} doesnt belong in Events.`).getText())
                    } else finalFile = file;

                    finalFile._path = `${this.eventDir}/${fileName}.${fileType}`;
                    this.client.gevents.set(finalFile.name, finalFile);
                    this.client.emit(Events.LOG, new Color('&d[GEvents] &aLoaded (File): &e➜   &3' + fileName, {json:false}).getText());
                } catch(e) {
                    this.client.emit(Events.DEBUG, new Color('&d[GEvents Debug] '+e).getText());
                    this.client.emit(Events.LOG, new Color('&d[GEvents] &cCan\'t load ' + fileName).getText());
                }
            } else {
                for(let eventFile of (await fs.readdirSync(`${this.eventDir}/${dir}`))) {
                    let file2;
                    let fileName2 = eventFile.split('.').reverse()[1];
                    let fileType2 = eventFile.split('.').reverse()[0];
                    try {
                        let finalFile2;

                        file2 = await require(`${this.eventDir}/${dir}/${eventFile}`);
                        if (isClass(file2)) {
                            finalFile2 = await new file2(this.client)
                            if(!(finalFile2 instanceof Event)) return console.log(new Color(`&d[GEvents] &cEvent ${fileName2} doesnt belong in Events.`).getText());
                        } else finalFile2 = file2;

                        finalFile2._path = `${this.eventDir}/${dir}/${fileName2}.${fileType2}`;
                        this.client.gevents.set(finalFile2.name, finalFile2);
                        this.client.emit(Events.LOG, new Color('&d[GEvents] &aLoaded (File): &e➜   &3' + fileName2, {json:false}).getText());
                    } catch(e) {
                        this.client.emit(Events.DEBUG, new Color('&d[GEvents Debug] '+e).getText());
                        this.client.emit(Events.LOG, new Color('&d[GEvents] &cCan\'t load ' + fileName2).getText());
                    }
                }
            }
        }

        await this.__loadEvents()
    }

    async __loadEvents() {
        this.client.gevents.forEach(event => {
            if(event.name == 'ready') return event.run(this.client);

            if(event.ws) {
                if(event.once) this.client.ws.once(event.name, (...args) => event.run(this.client, ...args));
                else this.client.ws.on(event.name, (...args) => event.run(this.client, ...args));
            } else {
                if(event.once) this.client.once(event.name, (...args) => event.run(this.client, ...args));
                else this.client.on(event.name, (...args) => event.run(this.client, ...args));
            }
        })
    }
}

module.exports = GEventLoader;
