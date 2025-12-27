Hier ist die übersetzte und vereinfachte Version der README für deinen Mass Role Bot:

# Mass Role Bot

## Discord Mass Role

A Discord bot with a `/roleall` command to add or remove roles for all server members at once.

### Features

* Slash Command: `/roleall` with add and remove options.
* Progress Embed: Live status display with statistics during the process.
* Detailed Stats: Shows successful changes, errors, and skipped bots.
* Rate Limit Protection: Automatic delays to prevent Discord API limits.
* Admin Only: Restricted to administrators for security.

### Installation

```bash
# Install dependencies
npm install

# Compile TypeScript
npm run build

# Register slash commands (run once)
npm run deploy

# Start the bot
npm start

```

### Configuration

1. Create a `.env` file with the following:

```
DISCORD_CLIENT_ID=your_client_id
DISCORD_CLIENT_SECRET=your_client_secret
DISCORD_BOT_TOKEN=your_bot_token

```

### Discord Bot Setup

1. Go to [https://discord.com/developers/applications](https://discord.com/developers/applications)
2. Select your application.
3. Go to the "Bot" section and enable:
* SERVER MEMBERS INTENT (Required)


4. Invite the bot using this link:
```
https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=268435456&scope=bot%20applications.commands

```



### Required Permissions

* Manage Roles: To assign and remove roles.
* Use Application Commands: To allow users to use slash commands.

### Usage

```
/roleall action:Add Role role:@Verified
/roleall action:Remove Role role:@OldRole

```

### Important Notes

* The bot can only manage roles that are positioned lower than the bot's own role.
* Other bots are automatically skipped.
* Only users with Administrator permissions can use this command.

---
