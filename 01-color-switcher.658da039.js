!function(){var t={body:document.querySelector("body"),buttonStart:document.querySelector("button[data-start]"),buttonStop:document.querySelector("button[data-stop]")};console.log(t.buttonStop);var o=null;t.buttonStart.addEventListener("click",(function(){o=setInterval((function(){t.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16)),t.buttonStart.disabled=!0,t.buttonStop.disabled=!1}),1e3)})),t.buttonStop.addEventListener("click",(function(){clearInterval(o),t.buttonStart.disabled=!1,t.buttonStop.disabled=!0}))}();
//# sourceMappingURL=01-color-switcher.658da039.js.map
