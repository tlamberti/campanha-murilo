export function irParaNovaRota(history, rota = '') {
  history.push(`/${rota}`);
}

export function mascaraTelefone (tel) {
  return tel
    .replace(/\D/g, '') //Remove tudo o que não é dígito
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
    .replace(/(-\d{4})\d+?$/, '$1')
}

export function formatarDataParaIso(data) {
  if(!data) {
    return
  }
  return data.toISOString().slice(0,10)
}

export function scrollToX(element, to, duration) {
  var start = element.scrollLeft,
  change = to - start,
  currentTime = 0,
  increment = 20;
  
  var animateScroll = function(){        
    currentTime += increment;
    var val = Math.easeInOutQuad(currentTime, start, change, duration);
      element.scrollLeft = val;
      if(currentTime < duration) {
          setTimeout(animateScroll, increment);
        }
      };
  animateScroll();
}
//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = function (t, b, c, d) {
t /= d/2;
  if (t < 1) return c/2*t*t + b;
  t--;
  return -c/2 * (t*(t-2) - 1) + b;
};