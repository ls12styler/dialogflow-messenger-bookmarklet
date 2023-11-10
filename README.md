# Dialogflow Chatbot Bookmarklet

This repository provides some JavaScript that can be used to create a Bookmarklet to inject a Dialogflow Chatbot into the current webpage, if security policies allow.

The injection is done purely by manipulating the HTML in the browser. No remote services are affected by using this bookmarklet.

# Setup

1. Open and copy the contents of [inject.js](./inject.js)
1. In the browser, right click on the bookmark bar
1. Select the "Add page" option
1. Give the bookmark a name (e.g "Inject Chatbot")
1. In the URL, paste the contents of the inject.js file
1. Done!

# Usage

1. Open the website you want to inject the Chatbot into
1. Click the bookmarklet, you will be prompted for some details
1. Fill in the required details, which can be found by performing the following:
    * Visiting the [Dialogflow CX portal](https://dialogflow.cloud.google.com/cx/projects) and selecting your project and agent
    * In the "Manage" section, select "Integrations"
    * Under "Text Based", find "Dialogflow Messenger" and click "Connect"
    * Extract the values of the "project-id", "agent-id", "language-code" and "chat-title" attributes in the code example
    * Paste each value into each respective input
1. Add any styling you'd like the bot to have (you can see what styles can be applied [here](https://cloud.google.com/dialogflow/cx/docs/concept/integration/dialogflow-messenger#css-customize-general))
1. When finished with the configuration, click "Go!"
1. The Chatbot should appear in the bottom right

# Help! It's not working!

This is most likely because the website doesn't allow external content to be loaded, meaning this menthod will not work. The bookmarklet should present you with a warning if this is the case. You can verify by checking the JavaScript console for an error. (ctrl/cmd + I, then select "Console"). Unfortunately, you will need to use another method.

# Remove Chatbot

Simply reload the page.