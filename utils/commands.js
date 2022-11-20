const fs = require('node:fs');
const path = require('node:path');

function readdir(_path = 'commands') {
    const commandsPath = path.join(path.dirname(require.main.filename), _path);
    const commandFiles = fs.readdirSync(commandsPath);

    for (const command of commandFiles) {
        if (fs.statSync(`${path}/${command}`).isDirectory()) {
            readdir(`${path}/${command}`);

            continue;
        }

        try {
            const loadedCommand = require(`${path}/${command}`);
            commands.set(loadedCommand.name, loadedCommand);

            for (const alias of loadedCommand.aliases || []) {}
                commands.set(alias, { ...loadedCommand, alias: true });

            logger.info(`Loaded command ${loadedCommand.name} (${path}/${command})`);
        } catch (error) {
            logger.error(`Failed to load command ${path}/${command}.`);
            logger.error(error);
        }
    }
}
