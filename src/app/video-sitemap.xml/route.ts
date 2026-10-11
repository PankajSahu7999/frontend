// import { SITE } from "@/constants";
// import { NextResponse } from "next/server";

// // Replace this type and function with your real video data.
// type VideoRecord = {
//   pageSlug: string;
//   title: string;
//   description: string;
//   thumbnailUrl: string;
//   contentUrl: string;
//   updatedAt?: string;
// };

// async function getVideos(): Promise<VideoRecord[]> {
//   // Fetch real videos from your database or CMS.
//   // Return [] until the integration is implemented.
//   return [];
// }

// function escapeXml(value: string): string {
//   return value.replace(/[<>&'"]/g, (char) => {
//     const entities: Record<string, string> = {
//       "<": "&lt;",
//       ">": "&gt;",
//       "&": "&amp;",
//       "'": "&apos;",
//       '"': "&quot;",
//     };

//     return entities[char];
//   });
// }

// export async function GET() {
//   const videos = await getVideos();

//   const entries = videos
//     .filter(
//       (video) =>
//         video.pageSlug &&
//         video.title &&
//         video.description &&
//         video.thumbnailUrl &&
//         video.contentUrl
//     )
//     .map((video) => {
//       const pageUrl =
//         `${SITE.url}/news/${encodeURIComponent(video.pageSlug)}`;

//       return `
//         <url>
//           <loc>${escapeXml(pageUrl)}</loc>
//           <video:video>
//             <video:thumbnail_loc>${escapeXml(video.thumbnailUrl)}</video:thumbnail_loc>
//             <video:title>${escapeXml(video.title)}</video:title>
//             <video:description>${escapeXml(video.description.slice(0, 2048))}</video:description>
//             <video:content_loc>${escapeXml(video.contentUrl)}</video:content_loc>
//           </video:video>
//         </url>`;
//     })
//     .join("");

//   const xml = `<?xml version="1.0" encoding="UTF-8"?>
//     <urlset
//       xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
//       xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
//       ${entries}
//     </urlset>`;

//   return new NextResponse(xml, {
//     headers: {
//       "Content-Type": "application/xml; charset=utf-8",
//       "Cache-Control": "public, max-age=3600, s-maxage=3600",
//     },
//   });
// }


import { NextResponse } from "next/server";
import { SITE } from "@/constants";

// Replace with real records from your database.
type VideoItem = {
  pageUrl: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  contentUrl: string;
};

async function getVideos(): Promise<VideoItem[]> {
  // Connect this to your real video database or CMS.
  return [];
}

function escapeXml(value: string): string {
  return value.replace(/[<>&'"]/g, (char) => {
    const entities: Record<string, string> = {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      "'": "&apos;",
      '"': "&quot;",
    };

    return entities[char];
  });
}

function absoluteUrl(value: string): string {
  return new URL(value, SITE.url).toString();
}

export async function GET() {
  const videos = await getVideos();

  const urls = videos
    .filter(
      (video) =>
        video.pageUrl &&
        video.title &&
        video.description &&
        video.thumbnailUrl &&
        video.contentUrl
    )
    .map((video) => {
      const pageUrl = absoluteUrl(video.pageUrl);
      const thumbnailUrl = absoluteUrl(video.thumbnailUrl);
      const contentUrl = absoluteUrl(video.contentUrl);

      return `
        <url>
          <loc>${escapeXml(pageUrl)}</loc>
          <video:video>
            <video:thumbnail_loc>${escapeXml(thumbnailUrl)}</video:thumbnail_loc>
            <video:title>${escapeXml(video.title)}</video:title>
            <video:description>${escapeXml(video.description.slice(0, 2048))}</video:description>
            <video:content_loc>${escapeXml(contentUrl)}</video:content_loc>
          </video:video>
        </url>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
      ${urls}
    </urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}