const selected = localStorage.getItem("selectedQR");

if(selected){

    document.getElementById("text").value = selected;

    localStorage.removeItem("selectedQR");
}
const button = document.getElementById("generateBtn");

button.addEventListener("click", generateQR);

async function generateQR() {

    const text = document.getElementById("text").value.trim();

    if (text === "") {
        alert("Please enter text or URL.");
        return;
    }

    const response = await fetch("/generate", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            text: text
        })

    });

    const data = await response.json();

    if (data.success) {

        document.getElementById("result").innerHTML = `
            <img src="${data.qr}" alt="QR Code">

            <br><br>

            <a href="${data.qr}" download="QRCode.png" class="download-btn">
                Download QR
            </a>
        `;
    }
}
let history = JSON.parse(localStorage.getItem("qrHistory")) || [];

history.unshift({

    text:text,

    date:new Date().toLocaleString()

});

history = history.slice(0,20);

localStorage.setItem("qrHistory",JSON.stringify(history));