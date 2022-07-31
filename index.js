const { Client, Collection}  = require('discord.js')
const client = new Client({ intents: 32767 })
const { prefix } = require('./config.json')
const fs = require('fs')

client.commands = new Collection()
const commandsFile = fs.readdirSync('./src/commands/').filter(file => file.endsWith('.js'))
for(const file of commandsFile){
    const command = require(`./src/commands/${file}`)
    client.commands.set(command.name , command)
}

client.on('messageCreate' , message=>{
    if(!message.content.startsWith(prefix)) return
    const args = message.content.slice(prefix.length).trim().split(/ +/)
    const commandName = args.shift()
    const command = client.commands.get(commandName)
    if (!command) return
        command.execute (message,args)
})

client.once('ready',() => {
    let number = 0
    setInterval(() => {
        const list = ["마자아용~!" , "마자아용!"] // 봇 상태메세지 입니다.
        if(number == list.length) number = 0
        client.user.setActivity(list[number],{
            type:"PLAYING"
        })
        number++
    }, 10000)
    console.log(`${client.user.tag} 봇 이 준비되었습니다.`)
})


client.login("OTk1NzEzODEwMjIyNTY3NDY0.Gj6ILq.5tppEz7FigBA6mh6ZPma732zdVRcqBJkZ14Hgg")