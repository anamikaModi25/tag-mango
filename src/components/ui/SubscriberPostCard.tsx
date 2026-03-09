import React from "react";
import { useChallengeColors } from "./challengeTheme";
import ConfettiHeader from "./ConfettiHeader";
import PostCard from "./PostCard";

export interface SubscriberPostCardProps {
  authorName: string;
  timeAgo: string;
  headerLabel?: string;
  content?: string;
  likeCount?: string;
  commentCount?: string;
  url?: string;
  children?: React.ReactNode;
  mediaSrc?: string;
  mediaAlt?: string;
  mediaHeight?: { base: string; md: string } | string;
}

export default function SubscriberPostCard({
  authorName,
  timeAgo,
  headerLabel = "Your Submission",
  content,
  likeCount = "0",
  commentCount = "0",
  url,
  children,
  mediaSrc,
  mediaAlt = "Subscriber post media",
  mediaHeight,
}: SubscriberPostCardProps) {
  const { border } = useChallengeColors();

  return (
    <PostCard
      authorName={authorName}
      timeAgo={timeAgo}
      likeCount={likeCount}
      commentCount={commentCount}
      url={url}
      mediaSrc={mediaSrc}
      mediaAlt={mediaAlt}
      mediaHeight={mediaHeight}
      topBanner={
        <ConfettiHeader
          label={headerLabel}
          borderColor={border}
        />
      }
    >
      {children ?? content}
    </PostCard>
  );
}
