//------------------------------------------------------------------------------
// Copyright IBM Corp. 2016
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//------------------------------------------------------------------------------

const express = require('express');
const bodyParser = require('body-parser');
const mqlight = require('mqlight');
const vcap = process.env.VCAP_SERVICES ? JSON.parse(process.env.VCAP_SERVICES) : require('./VCAP_SERVICES.json');

const app = express();
const clients = [];
const TOPIC = 'MESSAGE';
const credentials = vcap.mqlight[0].credentials;
const opts = {
  service: credentials.connectionLookupURI,
  user: credentials.username,
  password: credentials.password,
};

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.text());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Poll endpoint
app.get('/poll/*', (req, res) => {
  clients.push(res);
});

// Msg endpoint
app.post('/msg', (req, res) => {
  const message = req.body;
  while (clients.length > 0) {
    clients.pop().end(message);
  }
  res.end();
});

app.listen(app.get('port'), () => {
  console.log(`listening on ${app.get('port')}`);
});
