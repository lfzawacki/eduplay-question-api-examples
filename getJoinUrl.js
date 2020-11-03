const querystring = require('querystring');
const sha1 = require('sha1');
const axios = require('axios')

const SERVER_URL = "https://paulo.dev.mconf.com/transfer/joinGuest";
const API_SECRET = process.argv[2];

const generateChecksum = (params) => {
  const qs = querystring.stringify({ ...params, secret: API_SECRET });
  return sha1(qs);
}

const params = {
  "internalMeetingID": process.argv[3],
  "meetingID": process.argv[4],
  "userName": process.argv[5] || "User EDUPLAY",
  "userID" : process.argv[6] || "USERID_EDUPLAY",
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

