import { StreamClient } from "@stream-io/node-sdk";

const keys = require("./keys");
const { stream } = keys;

const client = new StreamClient(stream.apiKey, stream.secretKey);

import { v4 as uuidv4 } from 'uuid';



const callType = 'livestream';
const call = client.video.call(callType, uuidv4());

module.exports = { client, call }