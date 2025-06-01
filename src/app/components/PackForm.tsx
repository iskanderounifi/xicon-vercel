'use client';

import { Pack } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';

interface PackFormProps {
  pack?: Pack;
  serviceId: number;
  onSubmitSuccess?: () => void;
}

const PackForm: React.FC<PackFormProps> = ({ pack, serviceId, onSubmitSuccess }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nom_pack: pack?.nom_pack || '',
    description_pack: pack?.description_pack || '',
    prix_pack: pack?.prix_pack?.toString() || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (pack) {
      setFormData({
        nom_pack: pack.nom_pack,
        description_pack: pack.description_pack || '',
        prix_pack: pack.prix_pack?.toString() || '',
      });
    }
  }, [pack]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    const dataToSubmit = {
      ...formData,
      service_id: serviceId, // Toujours inclure serviceId pour la création
      prix_pack: formData.prix_pack ? parseFloat(formData.prix_pack) : null,
    };

    try {
      const response = await fetch(
        pack ? `/admin/api/packs/${pack.id}` : '/admin/api/packs',
        {
          method: pack ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSubmit),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to ${pack ? 'update' : 'create'} pack`);
      }
      if (onSubmitSuccess) {
        onSubmitSuccess();
      } else {
        router.push(`/admin/services/${serviceId}/packs`);
        router.refresh();
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const inputClass = "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";
  const labelClass = "block text-sm font-medium text-gray-700";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
      {error && <p className="text-red-500 bg-red-100 p-3 rounded">{error}</p>}
      
      <div>
        <label htmlFor="nom_pack" className={labelClass}>Nom du Pack <span className="text-red-500">*</span></label>
        <input type="text" name="nom_pack" id="nom_pack" value={formData.nom_pack} onChange={handleChange} required className={inputClass} />
      </div>

      <div>
        <label htmlFor="description_pack" className={labelClass}>Description du Pack</label>
        <textarea name="description_pack" id="description_pack" value={formData.description_pack} onChange={handleChange} rows={4} className={inputClass}></textarea>
      </div>

      <div>
        <label htmlFor="prix_pack" className={labelClass}>Prix du Pack</label>
        <input type="number" name="prix_pack" id="prix_pack" value={formData.prix_pack} onChange={handleChange} step="0.01" className={inputClass} />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
      >
        {isSubmitting ? 'Enregistrement...' : (pack ? 'Mettre à Jour Pack' : 'Créer Pack')}
      </button>
    </form>
  );
};

export default PackForm;