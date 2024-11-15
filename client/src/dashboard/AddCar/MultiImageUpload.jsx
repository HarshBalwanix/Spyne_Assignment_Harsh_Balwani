import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CarContext } from "../../ContextAPI/CarContext";

export default function MultiImageUpload({
  name,
  label,
  register,
  setValue,
  errors,
  viewData = null,
  editData = null,
}) {
  const { editCar, car,setCar } = useContext(CarContext);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewSources, setPreviewSources] = useState(
    viewData ? viewData : editData ? editData : []
  );

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    if (selectedFiles.length + files.length > 10) {
      toast.error("You can upload up to 10 images only!");
      return;
    }

    const newPreviews = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        newPreviews.push(reader.result);
        if (newPreviews.length === files.length) {
          setPreviewSources([...previewSources, ...newPreviews]);
        }
      };
    });

    setSelectedFiles([...selectedFiles, ...files]);
  };

  const removeImage = (index) => {
    const updatedPreviews = [...previewSources];
    const updatedFiles = [...selectedFiles];

    console.log(updatedFiles);
    updatedPreviews.splice(index, 1);
    updatedFiles.splice(index, 1);
    console.log("updatedFiles::",updatedFiles);
    console.log("updatedPreviews::",updatedPreviews);

    setPreviewSources(updatedPreviews);
    setSelectedFiles(updatedFiles);
  };

  useEffect(() => {
    if(editCar){
      console.log(editCar,car);
      setValue(name, car?.images);
    }
  }, []);

  useEffect(() => {
    if(!editCar){
      register(name, { required: true });
    }
  }, [register, name]);

  useEffect(() => {
    setValue(name, selectedFiles);
  }, [selectedFiles, setValue, name]);

  return (
    <div className="flex flex-col space-y-4">
      <label className="text-sm font-semibold text-indigo-800" htmlFor={name}>
        {label} {!viewData && <sup className="text-pink-600">*</sup>}
      </label>

      <input
        type="file"
        id={name}
        name={name}
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />
      <label
        htmlFor={name}
        className="block cursor-pointer rounded-md bg-indigo-400 p-4 text-center text-md text-indigo-900"
      >
        Click to browse files
        <p className="mt-1 text-sm text-indigo-800">You can upload up to 10 images</p>
      </label>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {previewSources.map((src, index) => (
          <div key={index} className="relative">
            <img
              src={src}
              alt={`Preview ${index + 1}`}
              className="rounded-lg w-full h-32 object-cover"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 rounded-full bg-red-500 text-white w-6 h-6 flex items-center justify-center"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      {errors[name] && (
        <span className="text-sm text-red-500">
          {label} is required
        </span>
      )}
    </div>
  );
}
