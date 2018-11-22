# assistant-action-cloud-doctor
## Google Assistant Action interacting with public clouds

Some of this code and the entries inside of [Dialogflow](https://dialogflow.com/)  and [Actions on Google](https://developers.google.com/actions/) are derived from the excercizes on the source code for
[Actions on Google codelabs](https://codelabs.developers.google.com/?cat=Assistant).
This includes the `level1-complete`, `level2-complete`, and `level3-complete`
directories in the 3 "Build Actions for the Google Assistant" [codelabs](https://codelabs.developers.google.com/codelabs/actions-1/).  

This is a node.js implementation of a firebase instance.  The voice dialogue is designed in the Dialogflow interface and the Actions are configured in the Actions on Google Console.  (the instructions for this are based loosly on the codelabs examples.)

## Setup Instructions

### Custom Instructions
Details to be updated later.

### Setup based on codelabs
For detailed instructions on using this code, refer to the
[Actions on Google codelabs](https://codelabs.developers.google.com/?cat=Assistant),
Level 1, 2 and 3. Below are steps to deploy the code for any directory
(i.e. `level1-complete`, `level2-complete`, or `level3-complete`).

### Steps 9from Codelabs but will be updated for specifics used in this codebase: TBD)

1. Use the [Actions on Google Console](https://console.actions.google.com) to add a new project with a name of your choosing and click *Create Project*.
1. Click *Skip*, located on the top right to skip over category selection menu.
1. On the left navigation menu under *BUILD*, click on *Actions*. Click on *Add Your First Action* and choose your app's language(s).
1. Select *Custom intent*, click *BUILD*. This will open a Dialogflow console. Click *CREATE*.
1. Click on the gear icon to see the project settings.
1. Select *Export and Import*.
1. Select *Restore from zip*. Follow the directions to restore from the `codelab-level-<one/two>.zip` file in this repo.
1. Deploy the fulfillment webhook provided in the `functions` folder using [Google Cloud Functions for Firebase](https://firebase.google.com/docs/functions/):
    1. Follow the instructions to [set up and initialize Firebase SDK for Cloud Functions](https://firebase.google.com/docs/functions/get-started#set_up_and_initialize_functions_sdk). Make sure to select the project that you have previously generated in the Actions on Google Console and to reply `N` when asked to overwrite existing files by the Firebase CLI.
    1. Run `firebase deploy --only functions` and take note of the endpoint where the fulfillment webhook has been published. It should look like `Function URL : https://${REGION}-${PROJECT}.cloudfunctions.net/dialogflowFirebaseFulfillment`.  If the Function URL doesn't show, you can always check at the [Firebase console](https://console.firebase.google.com/).
1. Go back to the Dialogflow console and select *Fulfillment* from the left navigation menu. Enable *Webhook*, set the value of *URL* to the `Function URL` from the previous step, then click *Save*.
1. Select *Integrations* from the left navigation menu and open the *Integration Settings* menu for Actions on Google.
1. Enable *Auto-preview changes* and Click *Test*. This will open the Actions on Google simulator.
1. Type `Talk to my test app` in the simulator, or say `OK Google, talk to my test app` to any Actions on Google enabled device signed into your developer account.

For more detailed information on deployment, see the [documentation](https://developers.google.com/actions/dialogflow/deploy-fulfillment).


## References and How to report bugs
* Actions on Google documentation: [https://developers.google.com/actions/](https://developers.google.com/actions/).
* If you find any issues, please open a bug here on GitHub.
* Questions are answered in the wiki here on GitHub.

## License
See [LICENSE](LICENSE).

## Terms
For the samples referenced see the original terms at: Your use of this sample is subject to, and by using or downloading the sample files you agree to comply with, the [Google APIs Terms of Service](https://developers.google.com/terms/).

## Google+
Actions on Google Developers Community on Google+ [https://g.co/actionsdev](https://g.co/actionsdev).
