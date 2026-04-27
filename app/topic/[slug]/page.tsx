import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlugs, getTopicBySlug } from "@/data/topics";
import { TopicViewClient } from "@/components/TopicViewClient";
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) {
    return { title: "Memory topic" };
  }
  return {
    title: `${topic.label} — Eddie Mei`,
    description:
      topic.description?.trim() || "A memory: videos for Eddie Mei.",
  };
}

export default async function TopicPage({ params }: Props) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) notFound();
  return (
    <main
      className="flex w-full flex-1 flex-col items-stretch"
      data-topic={topic.slug}
    >
      <TopicViewClient topic={topic} />
    </main>
  );
}
