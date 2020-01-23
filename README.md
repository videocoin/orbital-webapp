# orbital-webapp

Orbital is an app that lets you create livecasts on the VideoCoin Network. It showcases how easy it is for developers to start using the VideoCoin network for a video streaming app/project.

Read more about the VideoCoin network API here: https://docs.videocoin.network/

  
## Setup
The app uses Firebase as its backend and requires a Firebase project set up with a Firebase config object exported from src/firebaseConfig.js.

### Get Firebase config 
1. Open the Firebase console: https://console.firebase.google.com/
2. Add a new Firebase project
3. Add web app to the project. There is a button in the top section of the overview page that you land on after creating the project.
4. After registering your app name, you will be shown a code snippet used for adding the Firebase SDK to your project. This web app already builds with the SDK.
You only need to copy the contents of the firebaseConfig and paste them inside the object exported from src/firebaseConfig.js.

### Configure Firebase Authentication via Google

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
6. Add a second parameter called STREAM_PROFILE_ID and set its value to 45d5ef05-efef-4606-6fa3-48f42d3f0b94 
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

## Reporting issues
Report issues to our GitHub issue tracker. Please read our [reporting issue guidelines](.github/reporting_issues.md) before opening a new issue
