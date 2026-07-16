function onScanSuccess(decodedText) {

    document.getElementById("scanResult").innerHTML = `

        <h3>✅ Scan Successful</h3>

        <p>${decodedText}</p>

        <br>

        <a href="${decodedText}" target="_blank">

            Open Link

        </a>

    `;

}

const scanner = new Html5QrcodeScanner(

    "reader",

    {

        fps:10,

        qrbox:250

    }

);

scanner.render(onScanSuccess);