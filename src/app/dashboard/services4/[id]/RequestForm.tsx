"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

type RequestFormProps = {
  service: {
    id: string;
    name: string;
    packages: {
      id: string;
      name: string;
      price: number;
    }[];
  };
};

type FormData = {
  packageId: string;
  message: string;
};

export default function RequestForm({ service }: RequestFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);

      // Submit service request
      const serviceResponse = await fetch("/api/services/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceId: service.id,
          message: data.message,
        }),
      });

      if (!serviceResponse.ok) {
        throw new Error("Failed to submit service request");
      }

      // Submit package request if a package is selected
      if (data.packageId) {
        const packageResponse = await fetch("/api/packages/request", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            packageId: data.packageId,
            message: data.message,
          }),
        });

        if (!packageResponse.ok) {
          throw new Error("Failed to submit package request");
        }
      }

      toast.success("Request submitted successfully!");
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="packageId"
          className="block text-sm font-medium text-gray-700"
        >
          Select Package (Optional)
        </label>
        <select
          {...register("packageId")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">No package</option>
          {service.packages.map((pkg) => (
            <option key={pkg.id} value={pkg.id}>
              {pkg.name} - ${pkg.price}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700"
        >
          Message
        </label>
        <textarea
          {...register("message", {
            required: "Please provide some details about your request",
          })}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Tell us about your requirements and any specific needs..."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {isLoading ? "Submitting..." : "Submit Request"}
      </button>
    </form>
  );
} 