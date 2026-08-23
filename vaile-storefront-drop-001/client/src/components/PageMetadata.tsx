/**
 * Vaile metadata utility: each editorial route declares its own concise title
 * and description without changing the storefront's static visual system.
 */
import { useEffect } from "react";

type PageMetadataProps = {
  title: string;
  description: string;
};

export default function PageMetadata({ title, description }: PageMetadataProps) {
  useEffect(() => {
    document.title = title;
    let descriptionTag = document.querySelector('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.setAttribute("name", "description");
      document.head.appendChild(descriptionTag);
    }
    descriptionTag.setAttribute("content", description);
  }, [title, description]);

  return null;
}
