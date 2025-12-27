import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const ventaboralikealikeloltoken = process.env.DISCORD_BOT_TOKEN!;
const maboralikealikelolclientid = process.env.DISCORD_CLIENT_ID!;
const guildidalikealikelol = process.env.GUILD_ID!;

const commandsalikealikelol = [
    new SlashCommandBuilder()
        .setName('roleall')
        .setDescription('Add or remove a role from all server members')
        .addStringOption(option =>
            option.setName('action')
                .setDescription('Choose whether to add or remove the role')
                .setRequired(true)
                .addChoices(
                    { name: '➕ Add Role', value: 'add' },
                    { name: '➖ Remove Role', value: 'remove' }
                ))
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('The role to add or remove')
                .setRequired(true))
        .setDefaultMemberPermissions(0x8) 
].map(command => command.toJSON());

const restaboralikealikelol = new REST({ version: '10' }).setToken(ventaboralikealikeloltoken);
(async () => {
    try {
        console.log('Started refreshing application (/) commands');
        await restaboralikealikelol.put(
            Routes.applicationGuildCommands(maboralikealikelolclientid, guildidalikealikelol),
            { body: commandsalikealikelol },
        );
        console.log('Successfully reloaded application (/) commands');
        console.log('Commands registered for guild');
    } catch (erroralikelol) {
        console.error('Error deploying commands', erroralikelol);
    }
})();
