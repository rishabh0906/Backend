const nodemailer=require("nodemailer");
const {AdminPassword,AdminId,SecondPersonId}=require("./config");

  async function sendMail(user){

    
   const transport=await nodemailer.createTransport({
        
        host:"smtp.gmail.com",
        port:587,
        secure:false,
        auth:{
            user:AdminId,
            pass:AdminPassword
        }
    });

    let mail={
        from:`Test App <${AdminId}>`,
        to:SecondPersonId,
        Subject:"Welcome Note",
        text:`We are glad!!${user.name}  Hope you bought pizza`,
        html:`<h1> Hola!! </h1>`
    }

    try{

        let res=await transport.sendMail(mail);
        console.log("response:"+res);

    }
    catch(err){
        console.log(err);
    }

    
}

module.exports = sendMail
