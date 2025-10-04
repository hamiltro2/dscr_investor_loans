import Image from 'next/image';

interface BlogImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
  priority?: boolean;
  className?: string;
}

export function BlogImage({ 
  src, 
  alt, 
  width = 1200, 
  height = 630, 
  caption,
  priority = false,
  className = ''
}: BlogImageProps) {
  return (
    <figure className={`my-8 ${className}`} itemScope itemType="https://schema.org/ImageObject">
      <div className="relative w-full rounded-xl overflow-hidden border border-primary-500/20">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className="w-full h-auto"
          itemProp="contentUrl"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-gray-400 text-center" itemProp="caption">
          {caption}
        </figcaption>
      )}
      <meta itemProp="description" content={alt} />
      <meta itemProp="name" content={alt} />
    </figure>
  );
}
