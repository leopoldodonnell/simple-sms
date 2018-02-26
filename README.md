# simple-sms

[![Known Vulnerabilities](https://snyk.io/test/github/leopoldodonnell/simple-sms/badge.svg)](https://snyk.io/test/github/leopoldodonnell/simple-sms)

A very simple example of using the Twilio SMS API

This node project uses very rudimentary `express` and `Twilio` to build an example website that will send an SMS to
a given phone number.

There are two routes:

*GET `/sms`* - send an sms to a phone number

*Params:*
* msg - the message to send
* phone - the phone number to send the message to

*Example:* curl '/sms?phone="555-555-1212"&msg="Here is a message"'

*GET `/sms-about`* - send an sms to a phone number at a random time between two hours of the day

*Params:*
* msg - the message to send
* phone - the phone number to send the message to
* start - the start hour when the message could be sent. Formatted either in 24hr or am/pm format. Eg: 13:00 or 1:00 pm
* end - the end hour is the latest the message could be sent Formatted either in 24hr or am/pm format Eg: 13:00 or 1:00 pm

*Example:* curl '/sms?phone="555-555-1212"&msg="Here is a message"&start="11:00 am"&end="2:30pm"'

## Getting Started

### Get your Twilio Credentials

You'll need Twilio Credentials to run this application. Got to [Twilo](https://www.twilio.com/) and sign up for your free
API key. Fill in the forms and you'll receive a small credit that should be enough for plenty of development.

Once you are logged in, create a new SMS project and request a phone number that you'll use to send SMS messages from.

The [project settings page](https://www.twilio.com/console/project/settings) will have *Live Credentials* and
*TEST Credentials*. When you use the *Test Credentials* you don't get dinged for charges but it will not send
to a real phone, so you'll need to use your *LIVE Credentials*.

These credentials, *ACCOUNT SID* and *AUTH TOKEN* in addition to the phone number will be needed to run this
example application.

### Install and Run

First clone this repository.

If you are using docker for development, fire up a Node container to run the example in...

```bash
$ docker run --rm --name simple-sms -ti -v $PWD:/app -w /app -p 3000:3000 node:slim /bin/bash
root@1941537de931:/app#
```

Then in either case (node on your machine or using docker)

On Linux

```bash
$ cd simple-sms
$ npm install
$ export TWILIO_ACCOUNT_SID=THE_ACCOUNT_SID
$ export TWILIO_AUTH_TOKEN=THE_AUTH_TOKEN
$ export TWILIO_PHONE_NUMBER=THE_SMS_NUMBER
$ node sms.js
```

Then enter the following into your local browser:

`http://localhost:3000/sms?phone=555-55501212&msg=The first SMS message`

Where `555-555-1212` is the phone you are sending the SMS to. You should see a return code that starts with `SM` followed
by numbers in the terminal and you should see a message in your browser that looks like:

```
Sent msg: 'The first SMS message' To phone number: '555-555-1212'
```

After a brief delay you should see an SMS on the device with the number you provided.

Next try the `/sms-around` route

`http://localhost:3000/sms-around?phone='555-555-1212'&msg='A Delayed Message'&start='02:21 pm'&end='02:30 pm'`

You should see something like the following in your browser

```
Will send msg: A Delayed Message To phone number: 555-555-1212 A Delayed Message will be sent at: Fri Feb 16 2018 19:26:57 GMT+0000 (UTC)
```

And something like the following in your terminal

```
Sent msg A Delayed Message To phone number: 555-555-1212 A Delayed Message at: Fri Feb 16 2018 19:26:58 GMT+0000 (UTC)
SM094cd740ea2543148e085ae52208a62d
```

**NOTE:** The times you see are in UTC. I'm in EST, so I've setup an offest of 5 hours in the source code. Update `sms.js` to
reflect your own timezone.
