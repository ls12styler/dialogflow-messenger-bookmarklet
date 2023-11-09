javascript:(() => {
  const layout = '<div id="container" class="w-full min-h-screen text-black">'+
    '<div class="relative flex min-h-screen max-h-screen flex-col justify-center bg-gray-50 py-6 sm:py-12">'+
      '<div class="relative bg-white px-6 pb-8 pt-10 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">'+
        '<div class="mx-auto max-w-md">'+
          '<h1 class="text-2xl font-bold">Dialogflow CX Chatbot Injection</h1>'+
          '<div class="divide-y divide-gray-300/50">'+
            '<div class="space-y-2 py-4 text-base leading-7">'+
              '<p>Enter your Dialogflow Agent configuration below:</p>'+
              '<div class="flex items-center justify-center align-middle">'+
                '<label class="w-1/3 pr-2 text-right text-gray-600 font-bold">GCP Project ID:</label>'+
                '<input id="pid" class="w-2/3 rounded border p-2 text-gray-600" placeholder="my-genai-project" />'+
              '</div>'+
              '<div class="flex items-center justify-center align-middle">'+
                '<label class="w-1/3 pr-2 text-right text-gray-600 font-bold">Agent ID:</label>'+
                '<input id="aid" class="w-2/3 rounded border p-2 text-gray-600" placeholder="s0m3-uuid" />'+
              '</div>'+
              '<div class="flex items-center justify-center align-middle">'+
                '<label class="w-1/3 pr-2 text-right text-gray-600 font-bold">Language Code:</label>'+
                '<input id="lang" class="w-2/3 rounded border p-2 text-gray-600" value="en" />'+
              '</div>'+
              '<div class="flex items-center justify-center align-middle">'+
                '<label class="w-1/3 pr-2 text-right text-gray-600 font-bold">Chatbot Title:</label>'+
                '<input id="title" class="w-2/3 rounded border p-2 text-gray-600" value="My Awesome Chatbot" />'+
              '</div>'+
              '<h2 class="text-xl font-semibold">Styling</h2>'+
              '<p>You can customise the chatbot styling using the area below. For documentation on available styling please see the <a href="https://cloud.google.com/dialogflow/cx/docs/concept/integration/dialogflow-messenger#css-customize-general" class="font-semibold text-sky-500 hover:text-sky-600">docs</a>.</p>'+
              '<div class="w-full rounded border p-2 font-mono text-sm text-gray-600">'+
                '<div>df-messenger {</div>'+
                '<div id="style" class="w-full resize-none px-4 py-1 focus:outline-none bg-slate-50" contenteditable="true"></div>'+
                '<div>}</div>'+
              '</div>'+
              '<button id="go" class="rounded-full border bg-sky-200 px-10 py-2 font-bold text-sky-500 hover:bg-sky-600 hover:text-sky-200">Go!</button>'+
              '<div class="pt-2 text-base font-semibold leading-7">'+
                '<p class="text-gray-900">'+
                  'Want to understand more? '+
                  '<a href="https://github.com/ls12styler/dialogflow-messenger-bookmarklet" class="text-sky-500 hover:text-sky-600">Read the docs &rarr;</a>'+
                '</p>'+
              '</div>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</div>'+
  '</div>';

  const injectBot = (projectId, agentId, languageCode, chatTitle, stylea) => {
    console.log({projectId, agentId, languageCode, chatTitle, stylea});
    const messenger = document.createElement("df-messenger");
    messenger.setAttribute("project-id", projectId);
    messenger.setAttribute("agent-id", agentId);
    messenger.setAttribute("language-code", languageCode);
    const bubble = document.createElement("df-messenger-chat-bubble");
    bubble.setAttribute("chat-title", chatTitle);
    messenger.appendChild(bubble);

    const style = document.createElement("style");
    style.innerHTML = `df-messenger { z-index: 999; position: fixed; bottom: 16px; right: 16px; ${stylea}}</style>`;

    [
      style,
      messenger
    ].map(e => document.body.appendChild(e));
  };

  const scriptEl = document.createElement("script");
  scriptEl.setAttribute("onerror", 'alert("Bookmarklet not compatible with this website")');
  scriptEl.setAttribute("onload", (() => {
    /* Create overlay iframe and append to page */
    const ifr = document.createElement("iframe");
    ifr.style = "position: fixed; top: 0; left: 0; z-index: 100000; width: 100%; height: 100%; background-color: #FFFFFF; overflow: scroll;";
    ifr.id = "dialogflowconfigwindow";
    document.body.appendChild(ifr);

    /* Create DOM from ${layout} */
    const doc = new DOMParser().parseFromString(layout, "text/html");

    /* Get form element references */
    const btn = doc.getElementById("go");
    const pId = doc.getElementById("pid");
    const aId = doc.getElementById("aid");
    const lang = doc.getElementById("lang");
    const title = doc.getElementById("title");
    const style = doc.getElementById("style");
    btn.onclick = () => {
      injectBot(
        pId.value.trim(),
        aId.value.trim(),
        lang.value.trim(),
        title.value.trim(),
        style.innerText.trim()
      );
      /* Remove the overlay */
      document.getElementById(ifr.id).remove();
    };
    /* Append the new DOM content to the iframe */
    ifr.contentDocument.body.appendChild(doc.body.firstChild);

    /* Load Tailwind CSS */
    const tw = ifr.contentDocument.createElement("script");
    tw.setAttribute("onload", (() => {
      /* Re-render?! */
      ifr.contentDocument.body.appendChild(ifr.contentDocument.createElement("p"));
    })());

    tw.setAttribute("src", "https://cdn.tailwindcss.com");
    /* Append the script element to the head of the iframe */
    ifr.contentDocument.head.appendChild(tw);
  })());
  scriptEl.setAttribute("src", "https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js");
  document.body.append(scriptEl);
})();