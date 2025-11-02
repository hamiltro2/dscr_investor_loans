'use client';

interface PhoneButtonProps {
  phone: string;
  className?: string;
  children: React.ReactNode;
}

export default function PhoneButton({ phone, className, children }: PhoneButtonProps) {
  const handleClick = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-1002915679/nvg3CMaA2J4bEN-Ond4D'
      });
    }
  };

  return (
    <a
      href={`tel:${phone}`}
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
