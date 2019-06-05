const Discord = require('discord.js')
const client = new Discord.Client()
require('dotenv').config()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setActivity('you', {type: 'WATCHING'})
});

function checkContent(message){
  if (message.attachments.size > 0){
    return false
  }
  if (message.embeds.length > 0){
    const giphyRegex = RegExp('http(s)?://media.giphy.com/media/')
    const gygRegex = RegExp('http(s)?://(www.)?gifyourgame.com/')

    if (giphyRegex.test(message.content) || gygRegex.test(message.content))
      return false
  }

  return true
}

client.on('message', msg => {
  if (!msg.channel.permissionsFor(client.user).has(Discord.Permissions.FLAGS.MANAGE_MESSAGES))
    return false
  if (msg.pinned)
    return false // Don't delete pinned messages

  if (msg.content === 'purge') {
    const channel = msg.channel
    channel.fetchMessages({limit: 100}).then(
      messages => messages.forEach(message => checkContent(message) && message.delete() )
    )
  }
  else{
    // Commands are over, just check that the comment is a link or upload
    checkContent(msg) && msg.delete()
  }
});

client.login(process.env.TOKEN)