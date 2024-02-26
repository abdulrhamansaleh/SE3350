import emailjs from "@emailjs/browser"

export async function email_service(data) {
    var x = await emailjs.sendForm(
         "service_7tat96p", 
         "template_b47tesh",
         data,
         "TkQPg4iRQ6CGT-Md2").then((result) => {
             console.log(result.text);
             return true
         }, (error) => {
             console.log(error.text);
             return false
         }
     );
    return x
}

