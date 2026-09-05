// src/lib/seo/schemas/howToSchema.ts

export interface HowToStepInput {
  name: string; // short step title, e.g. "Check the RTP before you play"
  text: string; // 1-3 sentence explanation of the step
  url?: string; // optional anchor link to that section on the page, e.g. `${pageUrl}#step-2`
  image?: string; // optional image for that step
}

export interface HowToSchemaProps {
  pageUrl: string;
  name: string; // e.g. "How to Win at Online Casinos"
  description: string;
  steps: HowToStepInput[];
  totalTime?: string; // ISO 8601 duration, e.g. "PT10M" — only if genuinely accurate
}

export function howToSchema({
  pageUrl,
  name,
  description,
  steps,
  totalTime,
}: HowToSchemaProps) {
  if (!steps?.length) return null;

  return {
    "@type": "HowTo",
    "@id": `${pageUrl}#howto`,

    name,
    description,

    ...(totalTime && { totalTime }),

    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.url && { url: step.url }),
      ...(step.image && {
        image: {
          "@type": "ImageObject",
          url: step.image,
        },
      }),
    })),
  };
}
