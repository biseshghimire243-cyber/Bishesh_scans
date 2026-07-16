async function generateBusinessQR(){

const name=document.getElementById("name").value;

const company=document.getElementById("company").value;

const job=document.getElementById("job").value;

const phone=document.getElementById("phone").value;

const email=document.getElementById("email").value;

const website=document.getElementById("website").value;

const address=document.getElementById("address").value;

const vcard=`BEGIN:VCARD
VERSION:3.0
FN:${name}
ORG:${company}
TITLE:${job}
TEL:${phone}
EMAIL:${email}
URL:${website}
ADR:${address}
END:VCARD`;

const response=await fetch("http://localhost:3000/generate",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

text:vcard

})

});

const data=await response.json();

document.getElementById("result").innerHTML=`

<img src="${data.qr}" width="250">

<br><br>

<a href="${data.qr}" download="BusinessQR.png">

<button>

Download QR

</button>

</a>

`;

}