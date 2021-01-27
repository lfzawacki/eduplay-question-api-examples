const querystring = require('querystring');
const sha1 = require('sha1');
const axios = require('axios')

const SERVER_URL = "https://lucas.elos.dev/transfer/questions";
const API_SECRET = process.argv[2];

const generateChecksum = (params) => {
  const qs = querystring.stringify({ ...params, secret: API_SECRET });
  return sha1(qs);
}

console.log(process.argv);

const params = {
  "internalMeetingID": process.argv[3],
  "userID" : process.argv[4] || "USERID_EDUPLAY",
  "fullName": "User Eduplay",
  "message": process.argv[5] || "Boa Tarde",
}

params.checksum = generateChecksum(params);

console.log(params);

axios.post(SERVER_URL, params)
.then(res => {
  console.log(res.data);
})
.catch(e => {
  console.error(e);
});


