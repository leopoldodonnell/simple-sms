
// Boston is - 5 hourse from GMT
const tzoffset = 5 * 60 * 60 * 1000

const moment = require('moment')

const client = require('twilio')(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const express = require('express')
const app = express()

function sendSMS(phone, msg) {
  client.messages.create({
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phone,
    body: msg
  }).then((message) => console.log(message.sid));
}

// Returns a random time (in milliseconds since the epoch) between start and end
// startTime (String) hours and minutes formatted as hh:mm and allowing for am|pm
// endTime (String) hours and minutes formatted as hh:mm and allowing for am|pm
function calculateRandomTimeBetween(startTime, endTime) {

  // Get the start and end time in milliseconds adjusted to the current timezone
  var start = Date.parse(moment(startTime, ['h:m a', 'H:m']).format()) + tzoffset
  var end   = Date.parse(moment(endTime, ['h:m a', 'H:m']).format()) + tzoffset

  // Calculate a random end time between start and end
  var randomEnd = start + Math.floor(Math.random() * (end - start))

  // If the time has passed, add a day
  if (randomEnd < Date.now()) {
    randomEnd += 24 * 60 * 60 * 1000
  }

  // Calculate how many seconds from now to send the SMS
  return randomEnd
}

// Send an sms message 'msg' to phone number 'phone'
app.get('/sms', (req, res) => {
  // TODO: Validate phone number and query
  sendSMS(req.query.phone, req.query.msg)
  res.send('Sent msg: ' + req.query.msg + ' To phone number: ' + req.query.phone)
})

// Send an sms message 'msg' to phone number 'phone' some time between 'start' and 'end'
app.get('/sms-around', (req, res) => {
  // TODO: Validate phone number, query, start and end

  var nextMessageTime = calculateRandomTimeBetween(req.query.start, req.query.end)

  setTimeout(() => {
    sendSMS(req.query.phone, req.query.msg)
    console.log("Sent msg " + req.query.msg + " To phone number: " + req.query.phone + " at: " + new Date())
  }, nextMessageTime - Date.now())
  res.send('Will send msg: ' + req.query.msg + ' To phone number: ' + req.query.phone + " will be sent at: " + new Date(nextMessageTime))
})

app.listen(3000, () => console.log('SMS exmaple app is lisenting on port 3000!\nExample: /sms?phone=5555551212&msg="Hello World"'));
