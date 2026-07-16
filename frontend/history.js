const historyBody = document.getElementById("historyBody");

let history = JSON.parse(localStorage.getItem("qrHistory")) || [];

displayHistory();

function displayHistory(){

    historyBody.innerHTML = "";

    if(history.length===0){

        historyBody.innerHTML=`
        <tr>
            <td colspan="3" style="text-align:center;">
                No QR History Found
            </td>
        </tr>
        `;

        return;
    }

    history.forEach((item,index)=>{

        historyBody.innerHTML+=`
        <tr>

            <td>${item.text}</td>

            <td>${item.date}</td>

            <td>

                <button onclick="generateAgain('${item.text}')">

                    Generate

                </button>

            </td>

        </tr>
        `;

    });

}

function generateAgain(text){

    localStorage.setItem("selectedQR",text);

    window.location.href="index.html";

}

document.getElementById("clearHistory").onclick=()=>{

    if(confirm("Clear all history?")){

        localStorage.removeItem("qrHistory");

        location.reload();

    }

}