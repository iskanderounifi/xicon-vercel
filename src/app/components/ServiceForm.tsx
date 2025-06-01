 'use client';

import { Service } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';

interface ServiceFormProps {
  service?: Service; // Pour le mode édition
  onSubmitSuccess?: () => void;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ service, onSubmitSuccess }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nom: service?.nom || '',
    image_service: service?.image_service || '',
    icon_service: service?.icon_service || '',
    short_description: service?.short_description || '',
    long_description: service?.long_description || '',
    image_cover: service?.image_cover || '',
    prix_mois: service?.prix_mois?.toString() || '',
  });

  const [imageServiceFile, setImageServiceFile] = useState<File | null>(null);
  const [iconServiceFile, setIconServiceFile] = useState<File | null>(null);
  const [imageCoverFile, setImageCoverFile] = useState<File | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (service) {
      setFormData({
        nom: service.nom,
        image_service: service.image_service,
        icon_service: service.icon_service || '',
        short_description: service.short_description || '',
        long_description: service.long_description || '',
        image_cover: service.image_cover || '',
        prix_mois: service.prix_mois?.toString() || '',
      });
    }
  }, [service]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, fileSetter: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (e.target.files && e.target.files[0]) {
      fileSetter(e.target.files[0]);
    } else {
      fileSetter(null);
    }
  };
  
  const uploadFile = async (file: File | null): Promise<string | undefined> => {
    if (!file) return undefined;
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);
    try {
      const res = await fetch('/admin/api/upload', { method: 'POST', body: uploadFormData });
      const data = await res.json();
      if (data.success) return data.filePath;
      throw new Error(data.error || 'File upload failed');
    } catch (err) {
      console.error('Upload error:', err);
      setError((err as Error).message);
      return undefined;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    let imageServicePath = formData.image_service;
    let iconServicePath = formData.icon_service;
    let imageCoverPath = formData.image_cover;

    if (imageServiceFile) {
      const path = await uploadFile(imageServiceFile);
      if (path) imageServicePath = path; else { setIsSubmitting(false); return; }
    }
    if (iconServiceFile) {
      const path = await uploadFile(iconServiceFile);
      if (path) iconServicePath = path; else { setIsSubmitting(false); return; }
    }
    if (imageCoverFile) {
      const path = await uploadFile(imageCoverFile);
      if (path) imageCoverPath = path; else { setIsSubmitting(false); return; }
    }
    
    const dataToSubmit = {
      ...formData,
      image_service: imageServicePath,
      icon_service: iconServicePath || null, // Ensure null if empty
      image_cover: imageCoverPath || null,   // Ensure null if empty
      prix_mois: formData.prix_mois ? parseFloat(formData.prix_mois) : null,
    };

    try {
      const response = await fetch(
        service ? `/admin/api/services/${service.id}` : '/admin/api/services',
        {
          method: service ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSubmit),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed to ${service ? 'update' : 'create'} service`);
      }
      if (onSubmitSuccess) {
        onSubmitSuccess();
      } else {
        router.push('/admin/services');
        router.refresh(); // Important to reflect changes
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
        <label htmlFor="nom" className={labelClass}>Nom du Service <span className="text-red-500">*</span></label>
        <input type="text" name="nom" id="nom" value={formData.nom} onChange={handleChange} required className={inputClass} />
      </div>

      <div>
        <label htmlFor="image_service" className={labelClass}>Image du Service (URL ou upload) <span className="text-red-500">*</span></label>
        <input type="file" name="image_service_file" id="image_service_file" onChange={(e) => handleFileChange(e, setImageServiceFile)} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
        {formData.image_service && !imageServiceFile && <img src={formData.image_service} alt="Preview" className="mt-2 h-20 object-contain" />}
        {imageServiceFile && <p className="text-sm text-gray-500 mt-1">Nouveau fichier sélectionné : {imageServiceFile.name}</p>}
      </div>
      
      <div>
        <label htmlFor="icon_service" className={labelClass}>Icône du Service (URL ou upload)</label>
        <input type="file" name="icon_service_file" id="icon_service_file" onChange={(e) => handleFileChange(e, setIconServiceFile)} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
        {formData.icon_service && !iconServiceFile && <img src={formData.icon_service} alt="Icon Preview" className="mt-2 h-16 object-contain" />}
        {iconServiceFile && <p className="text-sm text-gray-500 mt-1">Nouveau fichier sélectionné : {iconServiceFile.name}</p>}
      </div>

      <div>
        <label htmlFor="short_description" className={labelClass}>Description Courte</label>
        <textarea name="short_description" id="short_description" value={formData.short_description} onChange={handleChange} rows={3} className={inputClass}></textarea>
      </div>

      <div>
        <label htmlFor="long_description" className={labelClass}>Description Longue</label>
        <textarea name="long_description" id="long_description" value={formData.long_description} onChange={handleChange} rows={6} className={inputClass}></textarea>
      </div>

      <div>
        <label htmlFor="image_cover" className={labelClass}>Image de Couverture (URL ou upload)</label>
        <input type="file" name="image_cover_file" id="image_cover_file" onChange={(e) => handleFileChange(e, setImageCoverFile)} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
        {formData.image_cover && !imageCoverFile && <img src={formData.image_cover} alt="Cover Preview" className="mt-2 h-32 object-cover" />}
        {imageCoverFile && <p className="text-sm text-gray-500 mt-1">Nouveau fichier sélectionné : {imageCoverFile.name}</p>}
      </div>

      <div>
        <label htmlFor="prix_mois" className={labelClass}>Prix / Mois</label>
        <input type="number" name="prix_mois" id="prix_mois" value={formData.prix_mois} onChange={handleChange} step="0.01" className={inputClass} />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
      >
        {isSubmitting ? 'Enregistrement...' : (service ? 'Mettre à Jour' : 'Créer Service')}
      </button>
    </form>
  );
};

export default ServiceForm;