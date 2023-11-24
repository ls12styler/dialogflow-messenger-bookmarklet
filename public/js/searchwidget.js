javascript:(() => {
  const layout = '<div id="container" class="w-full min-h-screen text-black">'+
    '<div class="relative flex min-h-screen max-h-content flex-col justify-center bg-gray-50 py-6 sm:py-12">'+
      '<div class="relative bg-white px-6 pb-8 pt-10 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">'+
        '<div class="mx-auto max-w-md">'+
          '<h1 class="text-2xl font-bold">Vertex Search Widget Injection</h1>'+
          '<div class="divide-y divide-gray-300/50">'+
            '<div class="space-y-2 py-4 text-base leading-7">'+
              '<p>Enter your Search Widget configuration below:</p>'+
              '<div class="flex items-center justify-center align-middle">'+
                '<label class="w-1/3 pr-2 text-right text-gray-600 font-bold">Config ID:</label>'+
                '<input id="cid" class="w-2/3 rounded border p-2 text-gray-600" placeholder="som3-uu1d" />'+
              '</div>'+
              '<div class="flex items-center justify-center align-middle">'+
                '<label class="w-1/3 pr-2 text-right text-gray-600 font-bold">Location:</label>'+
                '<input id="loc" class="w-2/3 rounded border p-2 text-gray-600" value="eu" />'+
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

  const loadingCss = 'svg {'+
    'animation: 2s linear infinite svg-animation;'+
    'max-width: 100px;'+
    'margin: auto;'+
  '}'+
  '@keyframes svg-animation {'+
    '0% {'+
      'transform: rotateZ(0deg);'+
    '}'+
    '100% {'+
      'transform: rotateZ(360deg)'+
    '}'+
  '}'+
  'circle {'+
    'animation: 1.4s ease-in-out infinite both circle-animation;'+
    'display: block;'+
    'fill: transparent;'+
    'stroke: #2f3d4c;'+
    'stroke-linecap: round;'+
    'stroke-dasharray: 283;'+
    'stroke-dashoffset: 280;'+
    'stroke-width: 10px;'+
    'transform-origin: 50% 50%;'+
  '}'+
  '@keyframes circle-animation {'+
    '0%,'+
    '25% {'+
      'stroke-dashoffset: 280;'+
      'transform: rotate(0);'+
    '}'+
    '50%,'+
    '75% {'+
      'stroke-dashoffset: 75;'+
      'transform: rotate(45deg);'+
    '}'+
    '100% {'+
      'stroke-dashoffset: 280;'+
      'transform: rotate(360deg);'+
    '}'+
  '}';

  const injectBot = (configId, location) => {
    console.log({configId, location});
    const widget = document.createElement("gen-search-widget");
    widget.setAttribute("configId", configId);
    if (location) {
      widget.setAttribute("location", location);
    }
    widget.setAttribute("triggerId", "searchWidgetTrigger");

    const button = document.createElement("button");
    button.innerHTML = "Search";
    button.id = "searchWidgetTrigger";
    button.style = "padding: 10px; position: absolute; top: 5px; right: 5px;font-weight:bold;text-transform: uppercase;font-size:20px;";
    [
      //style,
      widget,
      button
    ].map(e => document.body.appendChild(e));
  };

  const scriptEl = document.createElement("script");
  scriptEl.setAttribute("onerror", 'alert("Bookmarklet not compatible with this website")');
  scriptEl.setAttribute("onload", (() => {
    /* Create overlay iframe and append to page */
    const ifr = document.createElement("iframe");
    ifr.style = "position: fixed; top: 0; left: 0; z-index: 100000; width: 100%; height: 100%; background-color: #FFFFFF; overflow: scroll;";
    ifr.id = "searchconfigwindow";
    document.body.appendChild(ifr);

    /* Create DOM from ${layout} */
    const doc = new DOMParser().parseFromString(layout, "text/html");

    /* Get form element references */
    const btn = doc.getElementById("go");
    const pId = doc.getElementById("cid");
    const loc = doc.getElementById("loc");
    const aId = doc.getElementById("tid");
    btn.onclick = () => {
      injectBot(
        pId.value.trim(),
        loc.value.trim()
      );
      /* Remove the overlay */
      document.getElementById(ifr.id).remove();
    };

    const loading = '<div id="loadingIcon" style="width: 100%; height:100%; text-align: center;"><svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="45"/></svg></div>';
    const loadingDom = new DOMParser().parseFromString(loading, "text/html");
    /* Append the new DOM content to the iframe */
    const loadingStyle = ifr.contentDocument.createElement("style");
    loadingStyle.innerText = loadingCss;
    ifr.contentDocument.head.appendChild(loadingStyle);
    ifr.contentDocument.body.appendChild(loadingDom.body.firstChild);

    /* Load Tailwind CSS */
    const tw = ifr.contentDocument.createElement("script");
    tw.setAttribute("onload", (() => {
      setTimeout(() => {
        ifr.contentDocument.body.appendChild(doc.body.firstChild);
        ifr.contentDocument.getElementById("loadingIcon").remove();
      }, 500);
    })());

    tw.setAttribute("src", "https://cdn.tailwindcss.com");
    /* Append the script element to the head of the iframe */
    ifr.contentDocument.head.appendChild(tw);
  })());
  scriptEl.setAttribute("src", "https://cloud.google.com/ai/gen-app-builder/client?hl=en_GB");
  document.body.append(scriptEl);
})();