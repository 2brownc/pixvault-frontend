export function shareTwitter(url: string, text: string) {
  return `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
}

export function shareFacebook(url: string) {
  return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
}

export function sharePinterest(url: string, text: string) {
  return `https://pinterest.com/pin/create/button/?url=${url}&media=&description=${text}`;
}

export function shareTumblr(url: string, text: string) {
  return `http://www.tumblr.com/share?v=3&u=${url}&t=${text}`;
}
