/*
 *   |-src
 ?       |-index.aoi
 *       |-commands
 ?           |-command.template.aoi
 *       |-voice
 ?           |-voice.template.aoi
 ?       |-config.aoi
 *       |-customFunctions
 ?           |-customFunction.template.aoi
 !       |- _config_.aoi
*/

const files = {
    "index.aoi": `
## Including modules
auto aoijs = [ include: 'aoi.js' ] as const
auto { AoiVoice -> Voice } = [ include: '@akarui/aoi.music' ] as const
auto {config -> envConfig } = [ include: 'dotenv' ] as const
auto Config = [ include: './config.aoi' ] as const 

## Allowing the bot to read the .env file
envConfig()

## Creating the bot
auto bot = new aoijs.Client(
    Config.client
)

bot.customFunctions = {}

string commandDir = './commands'
auto loader = new aoijs.Loader(bot,Config.loader)
loader.load(bot.cmds,commandDir)

## Creating the voice client
auto voice = new Voice(bot,Config.voice)
string voiceEventDir = './voice'
loader.load(voice.cmds,voiceEventDir)

## Custom functions
string customFunctionDir = './customFunctions'
loader.load(bot.customFunctions,customFunctionDir)

        `,
    "config.aoi": `
        
auto { Events, Intents } = [ include: 'aoi.js' ] as const
auto { process } = [ include: 'process'] as const
## Configuring the bot
auto Config = {
    client: 
        token: process.env.TOKEN
        prefix: 'PREFIX'
        autoUpdate: true
        ignoreBots: true
        ignoreSelf: true
        events : [ Events.MessageCreate, Events.Ready ]
        intents: [ Intents.Guilds, Intents.GuildMessages ]
    loader: 
        useBundler: true
        useTranspiler: true
    voice:
        devOptions: 
            debug: false
        requestOptions:
            offsetTimeout: 0
            soundcloudLikeTrackLimit: 200
            spotifyPlaylistLimit: 100
            youtubePlaylistLimit: 100
        searchOptions:
            soundcloudId: process.env.SCID
            youtubeClient: 'WEB'
            youtubegl: 'US'
}   

export default Config
`,
    "customFunctions/customFunction.template.aoi": `
## Custom functions
auto { CustomFunction } = [include: 'aoi.js' ] as const 

## js type
auto func = new CustomFunction(
    name: 'helloworld' ## name ( must be lowercase)
    type : 'js'
    code : {
        afn ( data ) -> {
            data
        }
    }
)

[ export: func ]
    `,
    "commands/command.template.aoi": `
## Commands

[ export: default ] {
    name: 'ping'
    code: {
        $ping 
    }
}
    
    `,
    "voice/voice.template.aoi": `
## Voice events

[export: trackStart ] {
    name: 'trackStart'
    channel: $channelId
    code: {
        Playing $songInfo[title] by $songInfo[author]
    }
}
`,
};

export default files;