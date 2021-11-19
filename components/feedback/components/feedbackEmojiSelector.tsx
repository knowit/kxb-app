import { Flex } from "@/components/ui";
import Image from "next/image";
import * as React from "react";
import { styled } from "stitches.config";

const EmojiButton = styled("button", {
  all: "unset",
  outline: "none",
  margin: 0,
  padding: 0,
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  width: "34px",
  height: "34px",
  backgroundColor: "$grayDark",
  border: "1px solid $gray",
  borderRadius: "$round",
  cursor: "pointer",
  transition: "all .2s cubic-bezier(.5,-1,.5,2)",
  "&:hover": {
    transform: "scale(1.12)"
  },
  "&:focus": {
    transform: "scale(1.12)"
  },
  variants: {
    selected: {
      true: {
        transform: "scale(1.12)",
        border: "1px solid $green"
      }
    }
  }
});

type FeedbackEmojiSelectorProps = {
  onSelected: (emojiValue: number) => void;
};

const twemojis = {
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
};

const FeedbackEmojiSelector = ({ onSelected = () => {} }: FeedbackEmojiSelectorProps) => {
  const [selectedEmoji, setSelectedEmoji] = React.useState<number>(0);

  const handleEmojiSelect = (emojiValue: number) => {
    setSelectedEmoji(emojiValue);
    onSelected(emojiValue);
  };

  return (
    <Flex
      gap="3"
      css={{
        lineHeight: 1.5,
        height: "34px"
      }}
    >
      {Object.entries(twemojis).map(([emoji, { src, alt, value }]) => (
        <EmojiButton
          type="button"
          key={`emoji-button-twemoji-${emoji}`}
          selected={selectedEmoji === value}
          onClick={() => handleEmojiSelect(value)}
        >
          <Image src={src} alt={alt} width={24} height={24} decoding="async" />
        </EmojiButton>
      ))}
    </Flex>
  );
};

export default FeedbackEmojiSelector;
