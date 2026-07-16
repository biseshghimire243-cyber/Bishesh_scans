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