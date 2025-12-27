import { 
    Client, 
    GatewayIntentBits, 
    EmbedBuilder, 
    ChatInputCommandInteraction,
    Role,
    GuildMember,
    PermissionFlagsBits
} from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const mertaboralikealikeloltoken = process.env.DISCORD_BOT_TOKEN;
const whypaboralikealikelolclient = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
    ],
});

interface RoleStatsLikeForReal {
    totalMembersYeah: number;
    processedSoFar: number;
    successfulOnes: number;
    alreadyHadItOrNot: number;
    failedOhNo: number;
    skippedBots: number;
}

function createProgressEmbedSuperNice(
    actionTypeYeah: 'add' | 'remove',
    roleNameCool: string,
    statsYeahBoi: RoleStatsLikeForReal,
    isFinishedOrNot: boolean
): EmbedBuilder {
    const progressPercentage = statsYeahBoi.totalMembersYeah > 0 
        ? Math.round((statsYeahBoi.processedSoFar / statsYeahBoi.totalMembersYeah) * 100) 
        : 0;
    const progressBarLength = 20;
    const filledLength = Math.round((progressPercentage / 100) * progressBarLength);
    const progressBarCool = '█'.repeat(filledLength) + '░'.repeat(progressBarLength - filledLength);
    const actionTextYeah = actionTypeYeah === 'add' ? 'ADD' : 'REMOVE';
    const actionEmojiCool = actionTypeYeah === 'add' ? '➕' : '➖';
    const colorForEmbed = actionTypeYeah === 'add' ? 0x57F287 : 0xED4245;
    const statusTextYeah = isFinishedOrNot 
        ? '✅ Abgeschlossen!' 
        : '⏳ Verarbeite...';
    const embedalikealikelol = new EmbedBuilder()
        .setColor(isFinishedOrNot ? (statsYeahBoi.failedOhNo > 0 ? 0xFEE75C : 0x57F287) : colorForEmbed)
        .setTitle(`${actionEmojiCool} Mass-Role: ${actionTextYeah}`)
        .setDescription(`**Rolle:** <@&${roleNameCool}>\n**Status:** ${statusTextYeah}`)
        .addFields(
            { 
                name: '📊 Fortschritt', 
                value: `\`${progressBarCool}\` ${progressPercentage}%`, 
                inline: false 
            },
            { 
                name: '👥 Gesamt', 
                value: `\`${statsYeahBoi.totalMembersYeah}\``, 
                inline: true 
            },
            { 
                name: '✅ Fertig', 
                value: `\`${statsYeahBoi.processedSoFar}/${statsYeahBoi.totalMembersYeah}\``, 
                inline: true 
            },
            { 
                name: '\u200B', 
                value: '\u200B', 
                inline: true 
            },
            { 
                name: actionTypeYeah === 'add' ? '➕ Hinzugefügt' : '➖ Entfernt', 
                value: `\`${statsYeahBoi.successfulOnes}\``, 
                inline: true 
            },
            { 
                name: actionTypeYeah === 'add' ? '⏭️ Hatte bereits' : '⏭️ Hatte nicht', 
                value: `\`${statsYeahBoi.alreadyHadItOrNot}\``, 
                inline: true 
            },
            { 
                name: '🤖 Bots übersprungen', 
                value: `\`${statsYeahBoi.skippedBots}\``, 
                inline: true 
            },
            { 
                name: '❌ Fehlgeschlagen', 
                value: `\`${statsYeahBoi.failedOhNo}\``, 
                inline: true 
            }
        )
        .setFooter({ 
            text: `ventiyy• Mass Role Bot`, 
            iconURL: whypaboralikealikelolclient.user?.displayAvatarURL() 
        })
        .setTimestamp();
    return embedalikealikelol;
}

async function handleRoleAllCommandEpicStyle(
    interactionYeah: ChatInputCommandInteraction
): Promise<void> {
    const actionTypeYeah = interactionYeah.options.getString('action', true) as 'add' | 'remove';
    const roleToManage = interactionYeah.options.getRole('role', true) as Role;
    if (!interactionYeah.memberPermissions?.has(PermissionFlagsBits.Administrator)) {
        await interactionYeah.reply({
            content: 'Du brauchst Administrator-Rechte für diesen Command',
            ephemeral: true
        });
        return;
    }
    const botMemberYeah = interactionYeah.guild?.members.me;
    if (!botMemberYeah?.permissions.has(PermissionFlagsBits.ManageRoles)) {
        await interactionYeah.reply({
            content: 'Ich brauche die "Rollen verwalten" Berechtigung',
            ephemeral: true
        });
        return;
    }
    if (botMemberYeah.roles.highest.position <= roleToManage.position) {
        await interactionYeah.reply({
            content: 'Die Rolle ist höher als meine höchste Rolle. Ich kann sie nicht vergeben',
            ephemeral: true
        });
        return;
    }
    await interactionYeah.reply({
        content: 'Lade Mitglieder...',
        ephemeral: false
    });
    const guildYeah = interactionYeah.guild!;
    await guildYeah.members.fetch();
    const allMembersCool = guildYeah.members.cache.filter(member => !member.user.bot);
    const botMembersYeah = guildYeah.members.cache.filter(member => member.user.bot);
    const statsYeahBoi: RoleStatsLikeForReal = {
        totalMembersYeah: allMembersCool.size,
        processedSoFar: 0,
        successfulOnes: 0,
        alreadyHadItOrNot: 0,
        failedOhNo: 0,
        skippedBots: botMembersYeah.size
    };
    const initialEmbedYeah = createProgressEmbedSuperNice(actionTypeYeah, roleToManage.id, statsYeahBoi, false);
    await interactionYeah.editReply({ content: '', embeds: [initialEmbedYeah] });
    let updateCounterYeah = 0;
    for (const [memberIdYeah, memberYeah] of allMembersCool) {
        try {
            const hasRoleAlready = memberYeah.roles.cache.has(roleToManage.id);
            if (actionTypeYeah === 'add') {
                if (hasRoleAlready) {
                    statsYeahBoi.alreadyHadItOrNot++;
                } else {
                    await memberYeah.roles.add(roleToManage);
                    statsYeahBoi.successfulOnes++;
                }
            } else {
                if (!hasRoleAlready) {
                    statsYeahBoi.alreadyHadItOrNot++;
                } else {
                    await memberYeah.roles.remove(roleToManage);
                    statsYeahBoi.successfulOnes++;
                }
            }
        } catch (errorOhNo) {
            statsYeahBoi.failedOhNo++;
            console.error(`Failed for ${memberYeah.user.tag}:`, errorOhNo);
        }
        statsYeahBoi.processedSoFar++;
        updateCounterYeah++;
        if (updateCounterYeah >= 5 || statsYeahBoi.processedSoFar === statsYeahBoi.totalMembersYeah) {
            updateCounterYeah = 0;
            const updatedEmbedYeah = createProgressEmbedSuperNice(actionTypeYeah, roleToManage.id, statsYeahBoi, false);
            await interactionYeah.editReply({ embeds: [updatedEmbedYeah] });
        }
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    const finalEmbedYeah = createProgressEmbedSuperNice(actionTypeYeah, roleToManage.id, statsYeahBoi, true);
    await interactionYeah.editReply({ embeds: [finalEmbedYeah] });
    console.log(`Completed roleall: ${actionTypeYeah} ${roleToManage.name} - Success: ${statsYeahBoi.successfulOnes}, Failed: ${statsYeahBoi.failedOhNo}`);
}

whypaboralikealikelolclient.once('ready', () => {
    console.log(`Logged in as ${whypaboralikealikelolclient.user?.tag}`);
    console.log(`Use /roleall to manage roles`);
});

whypaboralikealikelolclient.on('interactionCreate', async (interactionYeah) => {
    if (!interactionYeah.isChatInputCommand()) return;
    if (interactionYeah.commandName === 'roleall') {
        await handleRoleAllCommandEpicStyle(interactionYeah);
    }
});

whypaboralikealikelolclient.on('error', (errorOopsie) => {
    console.error('Bot error:', errorOopsie);
});

if (!mertaboralikealikeloltoken) {
    console.error('ERROR: No bot token found Check your .env file');
    process.exit(1);
}

whypaboralikealikelolclient.login(mertaboralikealikeloltoken);
