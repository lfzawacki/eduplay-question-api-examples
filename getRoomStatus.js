const querystring = require('querystring');
const sha1 = require('sha1');
const axios = require('axios')

const SERVER_URL = "https://lucas.elos.dev/transfer/roomStatus";
const API_SECRET = process.argv[2];

const generateChecksum = (params) => {
  const qs = querystring.stringify({ ...params, secret: API_SECRET });
  return sha1(qs);
}

const params = {
  "internalMeetingID": process.argv[3],
}

params.checksum = generateChecksum(params);

const statusPath = SERVER_URL + '/?' +  querystring.stringify(params);

axios.get(statusPath)
.then(res => {
  console.log(res.data);
})
.catch(e => {
  console.error(e);
});


