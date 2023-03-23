type Emoji = {
  src: string;
  alt: string;
  value: number;
};

type EmojiMap = Record<string, Emoji>;

type SiteConstantsProps = {
  EMOJIS: EmojiMap;
};

const SITE_CONSTANTS: SiteConstantsProps = {
  EMOJIS: {
    "1f60d": {
      src: "/twemoji/1f60d.svg",
      alt: "Emoji with heart eyes",
      value: 1
    },
    "1f600": {
      src: "/twemoji/1f600.svg",
      alt: "Emoji with happy expression",
      value: 2
    },
    "1f615": {
      src: "/twemoji/1f615.svg",
      alt: "Emoji with indifferent expression",
      value: 3
    },
    "1f662d": {
      src: "/twemoji/1f62d.svg",
      alt: "Emoji with sad expression",
      value: 4
    }
  }
};

export { SITE_CONSTANTS };
