type JsonLdProps = {
  data: Record<string, unknown>;
};

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
      // id="schema-jsonld"
      // type="application/ld+json"
      // // strategy="beforeInteractive"
      // suppressHydrationWarning
      // dangerouslySetInnerHTML={{
      //   __html: JSON.stringify(data),
      // }}
    />
  );
}
