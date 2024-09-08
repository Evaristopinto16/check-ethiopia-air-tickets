
 
const fs = require("fs");
const rp = require("request-promise");

var timeoutId = setTimeout( function(){
    alert( '2 hours passed' );
  }, 2*60*60*1000 );
  async function sleep(seg){
    return new Promise((resolve, rejects)=>{

        setTimeout(function(){
            resolve();
  
        }, 2*60 *seg * 1000)
    })
  
   }
(async()=>{

while(true){
    let converJson = {
        "operationName": "bookingAirSearch",
        "variables": {
            "airSearchInput": {
                "cabinClass": "First",
                "awardBooking": false,
                "promoCodes": [],
                "searchType": "BRANDED",
                "itineraryParts": [
                    {
                        "from": {
                            "useNearbyLocations": false,
                            "code": "LAD"
                        },
                        "to": {
                            "useNearbyLocations": false,
                            "code": "DME"
                        },
                        "when": {
                            "date": "2024-10-23"
                        }
                    }
                ],
                passengers: {
                    "ADT": 1
                }
            }
        },
        "extensions": {},
        "query": "query bookingAirSearch($airSearchInput: CustomAirSearchInput) {\n  bookingAirSearch(airSearchInput: $airSearchInput) {\n    originalResponse\n    __typename\n  }\n}"
    }
   converJson =  JSON.stringify(converJson)
 
const result = await rp("https://dxbooking.ethiopianairlines.com/api/graphql", {
    method:"POST",
    headers: {
        "accept": "*/*",
        "accept-language": "pt-BR,pt;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
         "content-type": "application/json",
        "dc-url": "",
        "execution": "3bc70045-ae10-4340-9eae-5bb1cb3fa07b",
        "sec-ch-ua": "\"Chromium\";v=\"128\", \"Not;A=Brand\";v=\"24\", \"Microsoft Edge\";v=\"128\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "ssgtoken": "undefined",
        "ssotoken": "undefined",
        "x-sabre-storefront": "ETDX",
         "Referer": "https://dxbooking.ethiopianairlines.com/dx/ETDX/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
    body: converJson
})


let array = []
let AraayAoa = []

array.push(result)

let find = JSON.parse(array)
let compareValue = find.data.bookingAirSearch.originalResponse.brandedResults.itineraryPartBrands[0][0].brandOffers[0].total.alternatives[0][0].amount
console.log(compareValue)
find = find.data.bookingAirSearch.originalResponse.unbundledAlternateDateOffers


let  departureDates = [] 
await find[0].forEach(x=> departureDates.push(x.departureDates) )
await find[0].forEach(x=> AraayAoa.push(x.total) )
let kwanza = []
for (let index = 0; index < AraayAoa.length; index++) {
    
    if(AraayAoa[index] != undefined){

         
        kwanza.push(AraayAoa[index].alternatives[0])

    }else{

    }
   
    
}

let resultData = [];

for (const key in kwanza) {
    resultData.push(`${kwanza[key][0].amount} kz \n`)
     
    
}

let text =  '';

if(compareValue > 792749){
    text = "Preço subiu em comparacao ao valor anterior "
}else if(compareValue < 792749){
    text = "Preço Baixou em comparacao ao valor anterior "
}else{
    text = "ethiopianairlines \n Nenhuma alteracao => O Preco continua o mesmo"
}

await rp.get(`https://api.telegram.org/bot6905230003:AAGrI-NkUBEABPJL8477Ao2PikPkJ1Q8CGA/sendMessage?chat_id=-4115387140&text=\n ${text} \n Precos atualizado para esse mes \n ${resultData} \n proximos precos daqui ha 2horas\n `)
await  sleep(10)
 


 
 
 
 

}




})()