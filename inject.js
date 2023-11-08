javascript:(() => {
  const projectId = prompt("Google Cloud Project ID:");
  const agentId = prompt("Dialogflow Agent ID:");
  const languageCode = prompt("Language:", "en");
  const chatTitle = prompt("Chat Title:", "My Dialogflow Agent");

  const scriptEl = document.createElement("script");
  scriptEl.setAttribute("src", "https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js");
  document.body.append(scriptEl);

  const messenger = document.createElement("df-messenger");
  messenger.setAttribute("project-id", projectId);
  messenger.setAttribute("agent-id", agentId);
  messenger.setAttribute("language-code", languageCode);
  const bubble = document.createElement("df-messenger-chat-bubble");
  bubble.setAttribute("chat-title", chatTitle);
  messenger.appendChild(bubble);

  const style = document.createElement("style");
  style.innerHTML = "df-messenger { z-index: 999; position: fixed; bottom: 16px; right: 16px; }</style>";

  const els = [
    style,
    messenger,
    scriptEl
  ].map(e => document.body.appendChild(e));
})();