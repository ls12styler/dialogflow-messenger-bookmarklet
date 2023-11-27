# Vertex AI Widgets

This repository aims to provide a suite of javascript bookmarklets that can be used to deploy a Vertex AI widget into the current webpage, if security policies allow.

The injection is done purely by manipulating the HTML in the browser. No remote services are affected by using this bookmarklet.


## Available Bookmarklets


- [Dialogflow Messenger](./public/js/dialogflowmessenger.js)
- [Vertex Search](./public/js/searchwidget.js)

## Running locally

Running locally requires a NodeJS environment with `npm` installed

1. Clone this repository
1. `cd` into the directory
1. Run `npm run start`
    * You can change the port by prefixing the command with `PORT=8080` (using whatever your desired port is)

## Installation for use on other websites

1. Open and copy the contents of respective widget you'd like to try from above
1. In the browser, right click on the bookmark bar
1. Select the "Add page" option
1. Give the bookmark a name (e.g "Inject Widget")
1. In the URL, paste the contents of the widget file
1. Done!

## Usage

1. Open the website you want to inject the widget into
1. Click the bookmarklet, you will be prompted for some details
1. Fill in the required details
    - For Dialogflow, add any styling you'd like the bot to have (you can see what styles can be applied [here](https://cloud.google.com/dialogflow/cx/docs/concept/integration/dialogflow-messenger#css-customize-general))
1. When finished with the configuration, click "Go!"
1. The Chatbot should appear in the bottom right

## Dialogflow Chatbot Widget

You can find the specific configuration details for the widget by performing the below:

    * Visiting the [Dialogflow CX portal](https://dialogflow.cloud.google.com/cx/projects) and selecting your project and agent
    * In the "Manage" section, select "Integrations"
    * Under "Text Based", find "Dialogflow Messenger" and click "Connect"
    * You will need to enable the unauthenticated API
    * Extract the values of the "project-id", "agent-id", "language-code" and "chat-title" attributes in the code example
    * Paste each value into each respective input on the widget configuration fields

## Vertex Search Widget

You can find the specific configuration details for this widget by performing the below:

    * Visiting the [Search & Conversation console](https://console.cloud.google.com/gen-app-builder/engines) and selecting your Search application
    * In the menu, select "Integration"
    * Add in the domain of the website you want to deploy the widget too, or if you're using this locally enter `localhost` and click save
    * Extract the values of the "configId" and "location" attributes in the code example
    * Paste each value into each respective input on the widget configuration fields

## Help! It's not working!

This is most likely because the website doesn't allow external content to be loaded, meaning this menthod will not work. The bookmarklet should present you with a warning if this is the case. You can verify by checking the JavaScript console for an error. (ctrl/cmd + I, then select "Console"). Unfortunately, you will need to use another method.

## Remove Widget

Simply reload the page.
