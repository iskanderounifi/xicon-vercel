import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nos Offres | XI Communication & Finance',
  description: 'Découvrez notre gamme complète de services en développement web, design UI/UX, marketing digital et consulting IT.',
};

export default function NosOffresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      {children}
    </div>
  );
}
