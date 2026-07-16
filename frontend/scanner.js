function onScanSuccess(decodedText) {

    let action = "";
    let value = decodedText;

    if (decodedText.startsWith("http://") || decodedText.startsWith("https://")) {

        action = `
            <a href="${decodedText}" target="_blank" class="action-btn">
                🌐 Open Website
            </a>
        `;

    }

    else if (decodedText.startsWith("mailto:")) {

        const email = decodedText.replace("mailto:", "");

        action = `
            <a href="mailto:${email}" class="action-btn">
                📧 Send Email
            </a>
        `;

        value = email;

    }

    else if (decodedText.startsWith("tel:")) {

        const phone = decodedText.replace("tel:", "");

        action = `
            <a href="tel:${phone}" class="action-btn">
                📞 Call Number
            </a>
        `;

        value = phone;

    }

    else if (decodedText.startsWith("sms:")) {

        const sms = decodedText.replace("sms:", "");

        action = `
            <a href="sms:${sms}" class="action-btn">
                💬 Send SMS
            </a>
        `;

        value = sms;

    }

    else if (decodedText.startsWith("WIFI:")) {

        action = `
            <button class="action-btn">
                📶 Wi-Fi QR Detected
            </button>
        `;

    }

    else {

        action = `
            <button onclick="copyText()" class="action-btn">
                📋 Copy Text
            </button>
        `;

    }

    document.getElementById("scanResult").innerHTML = `

        <div class="scan-card">

            <h2>✅ Scan Successful</h2>

            <p id="qrText">${value}</p>

            ${action}

        </div>

    `;

    scanner.clear();

}

function copyText(){

    const text = document.getElementById("qrText").innerText;

    navigator.clipboard.writeText(text);

    alert("Copied Successfully!");

}

const scanner = new Html5QrcodeScanner(
    "reader",
    {
        fps:10,
        qrbox:250
    }
);

scanner.render(onScanSuccess);