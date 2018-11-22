// Copyright 2018, Tokeshi.com
// Licensed under the MIT (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//  https://opensource.org/licenses/MIT
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// Import the Dialogflow module and response creation dependencies
// from the Actions on Google client library.
const {
  dialogflow,
  BasicCard,
  Permission,
  Suggestions,
  Carousel,
  Image,
} = require('actions-on-google');

// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');

// Instantiate the Dialogflow client.
const app = dialogflow({debug: true});

// Define a mapping of cloud-name strings to basic card objects.
const colorMap = {
  'Citrix Systems, Inc.': {
    title: 'Citrix Cloud',
    text: 'Works with Citrix Cloud (TM) Copyright 2018 Citrix Systems, Inc.  All rights reserved.',
    image: {
      url: 'https://www.citrix.com/content/dam/citrix61/en_us/images/logos/citrix/citrix_logo_bk.png',
      accessibilityText: 'Citrix Cloud',
    },
    display: 'WHITE',
  },
  'AWS': {
    title: 'Amazon Web Services',
    text: 'Works with Amazon Web Services (TM) Copyright 2018 Amazon, Inc.  All rights reserved. Amazon and the Amazon logo are trademarks of Amazon.com, Inc. or its affiliates',
    image: {
      url: 'https://d0.awsstatic.com/logos/powered-by-aws.png',
      accessibilityText: 'Amazon Web Services',
    },
    display: 'WHITE',
  },
  'Azure': {
    title: 'Microsoft Azure',
    text: 'Works with Microsoft Azure (TM) Copyright 2018 Microsoft, Inc.  All rights reserved.',
    image: {
      url: 'https://partner.microsoft.com/-/media/mssc/mpn/partner/marketing/azure-500x375.ashx?h=375&la=en&w=500&hash=1BC9A8FC2DBFA5FA01C5CC3185BDBCAB97EA00BB',
      accessibilityText: 'Microsoft Azure',
    },
    display: 'WHITE',
  },
  'Google Cloud Platform': {
    title: 'Google Cloud Platform',
    text: 'Works with Google Cloud Platform (TM) Copyright 2018 Google, Inc.  All rights reserved.',
    image: {
      url: 'https://cloud.google.com/_static/886de6be47/images/cloud/cloud-logo.svg',
      accessibilityText: 'Google Cloud Platform',
    },
    display: 'WHITE',
  },
};

// In the case the user is interacting with the Action on a screened device
// The Cloud Name Carousel will display a carousel of color cards
const cloudnameCarousel = () => {
  const carousel = new Carousel({
    items: {
      'indigo taco': {
        title: 'Indigo Taco',
        synonyms: ['indigo', 'taco'],
        image: new Image({
          url: 'https://storage.googleapis.com/material-design/publish/material_v_12/assets/0BxFyKV4eeNjDN1JRbF9ZMHZsa1k/style-color-uiapplication-palette1.png',
          alt: 'Indigo Taco Color',
        }),
      },
      'pink unicorn': {
        title: 'Pink Unicorn',
        synonyms: ['pink', 'unicorn'],
        image: new Image({
          url: 'https://storage.googleapis.com/material-design/publish/material_v_12/assets/0BxFyKV4eeNjDbFVfTXpoaEE5Vzg/style-color-uiapplication-palette2.png',
          alt: 'Pink Unicorn Color',
        }),
      },
      'blue grey coffee': {
        title: 'Blue Grey Coffee',
        synonyms: ['blue', 'grey', 'coffee'],
        image: new Image({
          url: 'https://storage.googleapis.com/material-design/publish/material_v_12/assets/0BxFyKV4eeNjDZUdpeURtaTUwLUk/style-color-colorsystem-gray-secondary-161116.png',
          alt: 'Blue Grey Coffee Color',
        }),
      },
  }});
  return carousel;
};

// Handle the Dialogflow intent named 'Default Welcome Intent'.
app.intent('Default Welcome Intent', (conv) => {
  const name = conv.user.storage.userName;
  if (!name) {
    // Asks the user's permission to know their name, for personalization.
    conv.ask(new Permission({
      context: 'Hi there, to get to know you better',
      permissions: 'NAME',
    }));
  } else {
    conv.ask(`Hi again, ${name}. What's your favorite color?`);
  }
});

// Handle the Dialogflow intent named 'actions_intent_PERMISSION'. If user
// agreed to PERMISSION prompt, then boolean value 'permissionGranted' is true.
app.intent('actions_intent_PERMISSION', (conv, params, permissionGranted) => {
  if (!permissionGranted) {
    // If the user denied our request, go ahead with the conversation.
    conv.ask(`OK, no worries. What's your favorite cloud?`);
    conv.ask(new Suggestions('Citrix', 'AWS', 'Azure', 'GCP'));
  } else {
    // If the user accepted our request, store their name in
    // the 'conv.user.storage' object for future conversations.
    conv.user.storage.userName = conv.user.name.display;
    conv.ask(`Thanks, ${conv.user.storage.userName}. ` +
      `What's your favorite cloud?`);
    conv.ask(new Suggestions('Citrix', 'AWS', 'Azure', 'GCP'));
  }
});

// Handle the Dialogflow intent named 'favorite color'.
// The intent collects a parameter named 'cloud'.
app.intent('favorite cloud', (conv, {cloud}) => {
  const luckyNumber = color.length;
  const audioSound = 'https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg';
  if (conv.user.storage.userName) {
    // If we collected user name previously, address them by name and use SSML
    // to embed an audio snippet in the response.
    conv.ask(`<speak>${conv.user.storage.userName}, your lucky number is ` +
      `${luckyNumber}.<audio src="${audioSound}"></audio> ` +
      `Would you like to hear some clouds?</speak>`);
    conv.ask(new Suggestions('Yes', 'No'));
  } else {
    conv.ask(`<speak>Your lucky number is ${luckyNumber}.` +
      `<audio src="${audioSound}"></audio> ` +
      `Would you like to hear some clouds?</speak>`);
    conv.ask(new Suggestions('Yes', 'No'));
  }
});

// Handle the Dialogflow intent named 'favorite cloud'.
// The intent collects a parameter named 'cloud'.
app.intent('favorite cloud', (conv, {cloud}) => {
  cloud = conv.arguments.get('OPTION') || cloud;
  // Present user with the corresponding basic card and end the conversation.
  if (!conv.screen) {
    conv.ask(colorMap[cloud].text);
  } else {
    conv.ask(`Here you go.`, new BasicCard(colorMap[cloud]));
  }
  conv.ask('Do you want to hear about another cloud?');
  conv.ask(new Suggestions('Yes', 'No'));
});

// Handle the Dialogflow NO_INPUT intent.
// Triggered when the user doesn't provide input to the Action
app.intent('actions_intent_NO_INPUT', (conv) => {
  // Use the number of reprompts to vary response
  const repromptCount = parseInt(conv.arguments.get('REPROMPT_COUNT'));
  if (repromptCount === 0) {
    conv.ask('Which color would you like to hear about?');
  } else if (repromptCount === 1) {
    conv.ask(`Please say the name of a cloud.`);
  } else if (conv.arguments.get('IS_FINAL_REPROMPT')) {
    conv.close(`Sorry we're having trouble. Let's ` +
      `try this again later. Goodbye.`);
  }
});

// Handle the Dialogflow follow-up intents
app.intent(['favorite cloud - yes', 'favorite cloud - yes'], (conv) => {
  conv.ask('Which cloud, Citrix, AWS, Azure, or Google Cloud Platform?');
  // If the user is using a screened device, display the carousel
  if (conv.screen) return conv.ask(cloudCarousel());
});

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
