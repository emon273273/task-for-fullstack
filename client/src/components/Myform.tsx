import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FormsData, formSchema } from "../schema/formSchema";
import { PlusIcon, XIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

const Myform = () => {
  const [showNotes, setShowNotes] = useState(false);
  const [showPrivateNotes, setShowPrivateNotes] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormsData>({
    resolver: zodResolver(formSchema),
  });

  const images = watch("images") || [];

  const onSubmit = (data: FormsData) => {
    console.log("onsubmit called");
    const formData = new FormData();

    if (data.notes) {
      formData.append("notes", data.notes);
    }

    if (data.privateNotes) {
      formData.append("privateNotes", data.privateNotes);
    }

    if (data.images) {
      data.images.forEach((file, index) => {
        formData.append(`images[${index}]`, file);
      });
    }

    console.log(formData);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const fileNames = filesArray.map((file) => file.name);
      setValue("images", fileNames); // Set the images array in form state
      setImagePreviews(filesArray.map((file) => URL.createObjectURL(file)));
    }
  };

  const handleImageRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setValue("images", newImages);
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="file"
              multiple
              {...register("images")}
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <PlusIcon size={16} />
              <span>Add Images</span>
            </div>
          </label>
          <div
            className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            onClick={() => setShowNotes((prev) => !prev)}
          >
            <PlusIcon size={16} />
            <span>Add Notes</span>
          </div>
          <div
            className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            onClick={() => setShowPrivateNotes((prev) => !prev)}
          >
            <PlusIcon size={16} />
            <span>Private Notes</span>
          </div>
        </div>
        {showNotes && (
          <div className="border border-gray-300 p-4 rounded">
            <textarea
              {...register("notes")}
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Add notes"
            />
          </div>
        )}
        {showPrivateNotes && (
          <div className="border border-gray-300 p-4 rounded">
            <textarea
              {...register("privateNotes")}
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Add private notes"
            />
          </div>
        )}
        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            {imagePreviews.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Image ${index}`}
                  className="w-full h-auto rounded"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-white rounded-full p-1 hover:bg-gray-200"
                  onClick={() => handleImageRemove(index)}
                >
                  <XIcon size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
        {Object.values(errors).map((error, index) => (
          <div key={index} className="text-red-500">
            {error.message}
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Myform;
