const querystring = require('querystring');
const sha1 = require('sha1');
const axios = require('axios')

const SERVER_URL = "https://lucas.elos.dev/transfer/joinGuest";
const API_SECRET = process.argv[2];

const generateChecksum = (params) => {
  const qs = querystring.stringify({ ...params, secret: API_SECRET });
  return sha1(qs);
}

const params = {
  "internalMeetingID": process.argv[3],
  "userName": process.argv[4] || "User EDUPLAY",
  "userID" : process.argv[5] || "USERID_EDUPLAY",
}

params.checksum = generateChecksum(params);

const getJoinGuestPath = SERVER_URL + '/?' +  querystring.stringify(params);

axios.get(getJoinGuestPath)
.then(res => {
  console.log(res.data);
})
.catch(e => {
  console.error(e);
});


