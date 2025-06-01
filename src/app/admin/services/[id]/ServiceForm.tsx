"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

type Package = {
  id: string;
  name: string;
  description: string;
  price: number;
};

type Service = {
  id: string;
  name: string;
  shortDesc: string;
  icon: string;
  detailedDesc: string;
  price: number;
  coverImage: string;
  packages: Package[];
};

type ServiceFormProps = {
  service: Service;
};

type FormData = {
  name: string;
  shortDesc: string;
  icon: string;
  detailedDesc: string;
  price: number;
  coverImage: string;
  packages: {
    id?: string;
    name: string;
    description: string;
    price: number;
  }[];
};

export default function ServiceForm({ service }: ServiceFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      name: service.name,
      shortDesc: service.shortDesc,
      icon: service.icon,
      detailedDesc: service.detailedDesc,
      price: service.price,
      coverImage: service.coverImage,
      packages: service.packages,
    },
  });

  const packages = watch("packages");

  const addPackage = () => {
    setValue("packages", [
      ...packages,
      { name: "", description: "", price: 0 },
    ]);
  };

  const removePackage = (index: number) => {
    setValue(
      "packages",
      packages.filter((_, i) => i !== index)
    );
  };

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);

      const response = await fetch(`/api/services/${service.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update service");
      }

      toast.success("Service updated successfully!");
      router.push("/dashboard/admin");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Service Name
          </label>
          <input
            {...register("name", { required: "Name is required" })}
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="icon"
            className="block text-sm font-medium text-gray-700"
          >
            Icon (Emoji or Icon Class)
          </label>
          <input
            {...register("icon", { required: "Icon is required" })}
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.icon && (
            <p className="mt-1 text-sm text-red-600">{errors.icon.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="shortDesc"
            className="block text-sm font-medium text-gray-700"
          >
            Short Description
          </label>
          <input
            {...register("shortDesc", {
              required: "Short description is required",
            })}
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.shortDesc && (
            <p className="mt-1 text-sm text-red-600">
              {errors.shortDesc.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Base Price
          </label>
          <input
            {...register("price", {
              required: "Price is required",
              min: { value: 0, message: "Price must be positive" },
            })}
            type="number"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
          )}
        </div>

        <div className="col-span-2">
          <label
            htmlFor="coverImage"
            className="block text-sm font-medium text-gray-700"
          >
            Cover Image URL
          </label>
          <input
            {...register("coverImage", { required: "Cover image is required" })}
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.coverImage && (
            <p className="mt-1 text-sm text-red-600">
              {errors.coverImage.message}
            </p>
          )}
        </div>

        <div className="col-span-2">
          <label
            htmlFor="detailedDesc"
            className="block text-sm font-medium text-gray-700"
          >
            Detailed Description
          </label>
          <textarea
            {...register("detailedDesc", {
              required: "Detailed description is required",
            })}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.detailedDesc && (
            <p className="mt-1 text-sm text-red-600">
              {errors.detailedDesc.message}
            </p>
          )}
        </div>
      </div>

      {/* Packages Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Packages</h3>
          <button
            type="button"
            onClick={addPackage}
            className="text-blue-600 hover:text-blue-800"
          >
            + Add Package
          </button>
        </div>

        {packages.map((_, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-gray-900">Package {index + 1}</h4>
              <button
                type="button"
                onClick={() => removePackage(index)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Package Name
                </label>
                <input
                  {...register(`packages.${index}.name` as const, {
                    required: "Package name is required",
                  })}
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  {...register(`packages.${index}.price` as const, {
                    required: "Package price is required",
                    min: { value: 0, message: "Price must be positive" },
                  })}
                  type="number"
                  step="0.01"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  {...register(`packages.${index}.description` as const, {
                    required: "Package description is required",
                  })}
                  rows={2}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
} 