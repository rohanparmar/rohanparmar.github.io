import type { MetadataRoute } from "next";
import { siteMeta } from "@/constants/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteMeta.title,
    short_name: siteMeta.name,
    description: siteMeta.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f6f4ee",
    theme_color: "#245f45",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
