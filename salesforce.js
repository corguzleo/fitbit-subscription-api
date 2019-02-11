"use strict";

let nforce = require('nforce'),

    SF_CLIENT_ID = process.env.SF_CLIENT_ID,
    SF_CLIENT_SECRET = process.env.SF_CLIENT_SECRET,
    SF_USER_NAME = process.env.SF_USER_NAME,
    SF_PASSWORD = process.env.SF_PASSWORD;

let org = nforce.createConnection({
    clientId: SF_CLIENT_ID,
    clientSecret: SF_CLIENT_SECRET,
    redirectUri: 'http://localhost:3000/oauth/_callback',
    mode: 'single',
    autoRefresh: true
});

let login = () => {
    org.authenticate({username: SF_USER_NAME, password: SF_PASSWORD}, err => {
        if (err) {
            console.error("Authentication error");
            console.error(err);
        } else {
            console.log("Authentication successful");
        }
    });
};

let createHeartRateRecord = (params) => {
    console.log('Entered Salesforce function with ' + params.length + ' params');
    let account = '0011U00000AbwZIQAZ';
    let heartRates = [];
    let errors = 0;
    return new Promise((resolve, reject) => {
        params.forEach(rec => {
            console.log('Record: ' + JSON.stringify(rec));
            let hr = nforce.createSObject('Heart_Rate__c');
            hr.set('Patient__c', account);
            hr.set('Heart_Rate_Zone__c', rec.hearRateZone);
            hr.set('Calories_Out__c', rec.caloriesOut);
            hr.set('Min__c', rec.min);
            hr.set('Max__c', rec.max);
            hr.set('Minutes__c', rec.minutes);
            console.log('To be inserted: ' + JSON.stringify(hr));
            org.insert({sobject: hr}, err=>{
                if(err){
                    console.log('Error: ' + err);
                    errors++;
                }
                else{
                    console.log('Inserción exitosa');
                }
            })
        });
        
        if(errors > 0){
            reject(err);
        }
        else{
            resolve({});
        }
    });
}

login();

exports.org = org;
exports.createHeartRateRecord = createHeartRateRecord;