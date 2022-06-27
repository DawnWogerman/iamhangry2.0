'use strict';

const yelp = require('yelp-fusion');

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = 'K5sDrDbpHotJIdxyNgOgVZx0xn9aQxhj3ihXnVfB98DzTqXESXuCcnmGVjT11NpiQsMRVwqvRPqfcfKtf3iWZEHhuAtWBhAj3dkwWVYobTelqSgWXb3c4fMyLvGnYnYx';

const searchRequest = {
  term:'restaurant',
  location: 'Denver', // needs to be dynamic value from Handlebars/HTML input
//   sort_by:"rating",
  limit: 2
};

const client = yelp.client(apiKey);

let recommendations;
client.search(searchRequest).then(response => {
    var drinks=2
    if (drinks<=2){ 
        for (var i=0; i<response.jsonBody.businesses.length; i++){
            console.log(response.jsonBody.businesses[i].price)
            if (response.jsonBody.businesses[i].price==="$$$")
            {
                const prettyJson = JSON.stringify(response.jsonBody.businesses[i], null, 4);
                console.log(prettyJson);
            }
        }
    }
        if (drinks=3){ 
            for (var i=0; i<response.jsonBody.businesses.length; i++){
                console.log(response.jsonBody.businesses[i].price)
                if (response.jsonBody.businesses[i].price==="$$")
                {
                    const prettyJson = JSON.stringify(response.jsonBody.businesses[i], null, 4);
                    console.log(prettyJson);
                }
            }
         if (drinks=3){ 
            for (var i=0; i<response.jsonBody.businesses.length; i++){
                console.log(response.jsonBody.businesses[i].price)
                if (response.jsonBody.businesses[i].price==="$")
                {
                    const prettyJson = JSON.stringify(response.jsonBody.businesses[i], null, 4);
                    console.log(prettyJson);
                }
            }    
        }
       
    }  
//   const firstResult = response.jsonBody.businesses[0];
//   const prettyJson = JSON.stringify(response.jsonBody.rating, null, 4);
//   console.log(prettyJson);
}).catch(e => {
  console.log(e);
});