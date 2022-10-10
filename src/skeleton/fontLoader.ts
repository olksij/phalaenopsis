// list of fonts to download
let fonts = {
  display: new URL('/assets/fonts/displayBold.ttf', import.meta.url),
  text: new URL('/assets/fonts/textMedium.ttf', import.meta.url)
};

// and resolved ones
let fontResult: Record<string, ArrayBuffer> = {};

export default function fontLoader() {
  for (let font in fonts) {
    // create a request
    var request = new XMLHttpRequest();
    request.open('get', fonts[font], true);
    request.responseType = 'arraybuffer';
    // when font is loaded, pass it to document and service worker
    request.onload = function () {
      let res = this.response;
      document.fonts.add(new FontFace(font, res));
      fontResult[font] = res;
      // if all fonts are there, postMessage
      if (fontResult.display && fontResult.text)
      window['worker'].postMessage({ deliver: 'fonts', data: fontResult }, fontResult);
    }
    request.send();
  }
}