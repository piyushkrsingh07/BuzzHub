const { Client } = require("@upstash/qstash");

const qstashClient=new Client({
    token:process.env.QSTASH_TOKEN
})

export const triggerQStash=async(payload)=>{
    try{
console.log(payload,'see sent payload')
        const response=await qstashClient.publishJSON({
            url:`https://0e9eb2f29b7b.ngrok-free.app/api/sendMail?to=${payload.to}`,
            body:{
               user:payload.name,
               uniqueMail:Date.now()
            },
         
            retries:3
        })
console.log(response,'response at qstash')
        return response
    }catch(error){
      console.error("Error trigering Qstash",error)
    }
}