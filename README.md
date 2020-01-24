# orbital-webapp

Orbital is an app that lets you create livecasts on the VideoCoin Network. It showcases how easy it is for developers to start using the VideoCoin network for a video streaming app/project.

Read more about the VideoCoin network API here: https://docs.videocoin.network/

##Install dependencies
`yarn install`

##Start application on port 3000
`yarn start`
  
## Setup
The app uses Firebase as its backend and requires a Firebase project set up with a Firebase config object exported from src/firebaseConfig.js.

### Get Firebase config 
1. Open the Firebase console: https://console.firebase.google.com/
2. Add a new Firebase project
3. Add web app to the project. There is a button in the top section of the overview page that you land on after creating the project.
4. After registering your app name, you will be shown a code snippet used for adding the Firebase SDK to your project. This web app already builds with the SDK.
You only need to copy the contents of the firebaseConfig and paste them inside the object exported from src/firebaseConfig.js.

### Configure Firebase Authentication

This demo app only allows sign in via Google, but many methods are available through Firebase if you want to enable them.

1. Navigate to your Firebase project.
2. Navigate to Develop > Authentication.
3. Under the sign-in method tab, you'll see a providers list. Choose Google, then hit 'Enable', add a project support email and hit 'Save'.

### Create VideoCoin API key and configure Firebase RemoteConfig
1. To stream using the VideoCoin network, create a publisher account here: https://studio.videocoin.network/
2. Once the VideoCoin publisher account is created, navigate to the 'Account' page and create a new API token. This will be used in step 4
3. Verify the publisher account associated with the API token has at minimum 20 VID and no more than 50 VID. Accounts funded with less than 20 VID or more than 50 VID will receive an error when attempting to create a stream
4. Navigate to your Firebase project
5. Open the 'Grow' section and open the 'Remote Config' page. Add a new parameter with the key `API_KEY` and set its value to the VideoCoin API token obtained in step 2 
6. Add a second parameter called `STREAM_PROFILE_ID` and set its value to 45d5ef05-efef-4606-6fa3-48f42d3f0b94 
7. Publish changes.

Note that in src/firebase.js there is a remoteConfig settings object that defines a minimum fetch interval. Firebase caches remote config responses, so If you attempt to start a stream before setting
remote config values, even once you set your new config values you'll get the old ones until the cache expires. You can either wait it out or set the minimum fetch interval to something lower and then set it back.

### Configure Firebase Cloud Firestore
1. Navigate to your Firebase project
2. Open the 'Database' page and click 'Create database'
3. Follow the instructions given by Firebase to complete the database creation
4. Open the newly created database and under the 'Data' tab:
    1. click 'Start Collection'. 
    2. Name this collection 'videos'.
    3. For 'Document ID', select 'Auto ID'. 
    4. Hit 'Save'
5. Repeat step 4, but this time call the collection 'users'. 

You will see both this collections references in src/firebase.js

Your app is now ready to be built and tested!

## Firebase usage
Refer to the Firebase docs for additional information on Firebase: https://firebase.google.com/

The following components of Firebase are used.
* Firebase Remoteconfig (https://firebase.google.com/products/remote-config/): to retrieve api_key to stream to the VideoCoin network
* Firebase Cloud Firestore (https://firebase.google.com/products/firestore/): to store data of livestreams being created
* Firebase Cloud Storage (https://firebase.google.com/products/storage/): to store the thumbnails for the videos

##Starting a Stream with the VideoCoin Network API. 

General documentation for the VideoCoin API can be found at https://docs.videocoin.network/.

Look at api.js to see basic usage of all of the VideoCoin Network API endpoints needed to create and run a stream. You can see this in action
in CreateLiveCast.js. The steps are as follows:

1) Create a stream
`$ curl -X POST -H 'Authorization: Bearer <TOKEN>' -H 'Content-Type: application/json' -d '{"name": "live", "profile_id": "45d5ef05-efef-4606-6fa3-48f42d3f0b94"}' https://studio.snb.videocoin.network/api/v1/streams`
Returns the stream object. You need the stream id from this object.
Note: profile id is included above in Firebase remote config.

2) Run the stream
`$ curl -X POST -H 'Authorization: Bearer <TOKEN>' https://studio.snb.videocoin.network/api/v1/streams/<stream_id>/run`

3) Set an interval that queries stream info until the status field on the stream object is 'STREAM_STATUS_PREPARED'
`$ curl -X GET -H 'Authorization: Bearer <TOKEN>' https://studio.snb.videocoin.network/api/v1/streams/{stream_id}`

4) Create a web RTC peer connection with the Video Coin media server.
    1) Create a new RTCPeerConnection instance.
    `const pc = new RTCPeerConnection();`
    2) Use the browser mediaDevices API to get media tracks.
    `const mediaStream = navigator.mediaDevices.getUserMedia()`
    3) Add tracks to the peer connection.
    `mediaStream.getTracks().forEach(track => {
      pc.addTrack(track);
    });`
    4) Create an SDP offer, then pass that offer object to the peer connection's setLocalDescription method.
    `const offer = await pc.createOffer()`
    `pc.setLocalDescription(offer)`
    5) Send a POST to VideoCoin's webrtc endpoint with the stream id you received back in the very first step and the offer object's
    sdp value.
    $ curl -X POST -H 'Authorization: Bearer <TOKEN>' -H 'Content-Type: application/json' -d '{"stream_id": stream.id, "sdp": offer.sdp}' https://studio.dev.videocoin.network/api/v1/ms/streams/webrtc
    6) From the response to the POST in step 5, get the 'sdp' field value and pass an answer object to the setRemoteDescription method of the peer connection.
    `const answer = new RTCSessionDescription({
                         type: 'answer',
                         sdp: response.sdp
                     });
     pc.setRemoteDescription(answer)`
5) Set an interval that queries stream info until the status field on the stream object is 'STREAM_STATUS_READY'
`$ curl -X GET -H 'Authorization: Bearer <TOKEN>' https://studio.snb.videocoin.network/api/v1/streams/{stream_id}`

6) Once the stream is ready. Use the output_url field on the stream object to view the stream. This is a link to an HLS stream that can be
saved to Firebase.

##Stopping a Stream with the VideoCoin Network API. 
$ curl -X POST -H 'Authorization: Bearer <TOKEN>' https://studio.snb.videocoin.network/api/v1/streams/{stream_id}/stop

## Reporting issues
Report issues to our GitHub issue tracker. Please read our [reporting issue guidelines](.github/reporting_issues.md) before opening a new issue
