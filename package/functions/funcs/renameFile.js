module.exports = async d => {

    const fs = require('fs')

    let code = d.command.code 

    const inside = d.unpack() 

    const err = d.inside(inside) 

    if(err) throw new Error(err)

 //Yes its Me Ayaka#5057 with dumb codes

    let [oldfile,newfile] = inside.splits



   if(fs.existsSync(oldfile) && !fs.existsSync(newfile)){

    fs.renameSync(oldfile,newfile) 

       } else {
if(!fs.existsSync(oldfile)) throw new Error(`Couldn't Found the ${oldfile} file`) 
if(fs.existsSync(newfile)) throw new Error(`File with name \`${newfile}\` already exist`)


           }



    return{

    code: code.replaceLast(`$renameFile${inside}`,"")

  }
} 

// Credits Ayaka (Github:  USERSATOSHI / Discord: Ayaka#5057)