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

        document.getElementById("result").innerHTML = `

<div class="qr-card">

    <div class="success">
        ✅ QR Generated Successfully
    </div>

    <img src="${data.qr}" id="qrImage">

    <div class="details">

        <p><strong>Type :</strong> ${type.toUpperCase()}</p>

        <p><strong>Content :</strong> ${text}</p>

        <p><strong>Generated :</strong> ${new Date().toLocaleString()}</p>

    </div>

    <div class="qr-buttons">

        <a href="${data.qr}" download="QRCode.png">
            📥 Download
        </a>

        <button id="copyBtn">
            📋 Copy
        </button>

        <button id="shareBtn">
            📤 Share
        </button>

    </div>

</div>

`;

document.getElementById("copyBtn").onclick = () => {

    navigator.clipboard.writeText(text);

    alert("Copied Successfully!");

};

document.getElementById("shareBtn").onclick = async () => {

    if (navigator.share) {

        await navigator.share({

            title: "QR Code",

            text: text

        });

    } else {

        alert("Share is not supported on this browser.");

    }

};
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