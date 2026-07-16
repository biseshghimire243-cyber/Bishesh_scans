const selected = localStorage.getItem("selectedQR");

if(selected){

    document.getElementById("text").value = selected;

    localStorage.removeItem("selectedQR");
}
const button = document.getElementById("generateBtn");

button.addEventListener("click", generateQR);

async function generateQR(){

    const type = document.getElementById("qrType").value;

    let text = document.getElementById("text").value.trim();

    if(text===""){
        alert("Please enter a value.");
        return;
    }

    switch(type){

        case "email":
            text = "mailto:" + text;
            break;

        case "phone":
            text = "tel:" + text;
            break;

        case "sms":
            text = "sms:" + text;
            break;

        case "url":

            if(!text.startsWith("http://") && !text.startsWith("https://")){
                text = "https://" + text;
            }

            break;
    }

    const response = await fetch("/generate",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            text
        })

    });

    const data = await response.json();

    if(data.success){

        document.getElementById("result").innerHTML=`

            <img src="${data.qr}">

            <br><br>

            <a href="${data.qr}" download="QRCode.png" class="download-btn">

                Download QR

            </a>

        `;

        let history = JSON.parse(localStorage.getItem("qrHistory")) || [];

        history.unshift({

            text,

            date:new Date().toLocaleString()

        });

        history = history.slice(0,20);

        localStorage.setItem("qrHistory",JSON.stringify(history));

    }

}
let history = JSON.parse(localStorage.getItem("qrHistory")) || [];

history.unshift({

    text:text,

    date:new Date().toLocaleString()

});

history = history.slice(0,20);

localStorage.setItem("qrHistory",JSON.stringify(history));