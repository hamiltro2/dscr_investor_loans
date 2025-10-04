import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface BlogImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
  priority?: boolean;
  className?: string;
}

// Intelligent mapping of images to their corresponding blog articles
const imageToArticleMap: Record<string, string> = {
  'Airbnb_DSCR_Loans.png': '/blog/airbnb-dscr-loans-california',
  'DSCR_Loan_Calculator.png': '/blog/dscr-loan-calculator-california',
  'DSCR_Loans_620_Credit_Score.png': '/blog/dscr-loan-620-credit-score',
  'DSCR_loan_Requirements.png': '/blog/dscr-loan-requirements-california-2024',
  'DSCR_vs_HardMoney_loans.png': '/blog/dscr-vs-hard-money-loans',
  'Fix_and_flip_DSCR_loans_California.png': '/blog/fix-and-flip-dscr-loans-california',
  'How_to_qualify for DSCR loans.png': '/blog/how-to-qualify-for-dscr-loan',
  'No_Tax_Return_Investment_Property_loans.png': '/blog/no-tax-return-investment-property-loans',
  'Self-employed-DSCR_loans.png': '/blog/dscr-loans-self-employed-california',
  'DSCR-Loans-599.png': '/blog/dscr-loan-rates-california-2024',
};

export function BlogImage({ 
  src, 
  alt, 
  width = 1200, 
  height = 630, 
  caption,
  priority = false,
  className = ''
}: BlogImageProps) {
  // Extract filename from src path
  const filename = src.split('/').pop() || '';
  const articleLink = imageToArticleMap[filename];

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
        
        {/* Clickable "Read The Article" section at bottom - only if we have a matching article */}
        {articleLink && (
          <Link 
            href={articleLink}
            className="absolute bottom-0 left-0 right-0 h-16 flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer"
            aria-label="Read the full article"
          >
            <span className="sr-only">Read The Article</span>
          </Link>
        )}
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
