import React, { useState } from "react";

import { FormProvider } from "../../context/FormContext";
import sampleInput from "../../config/sampleInput.json";

import FormRenderer from "./FormRenderer";

const FormSection = () => {
  const [formConfig, setFormConfig] = useState(null);
  const [showFileInput, setShowFileInput] = useState(true);

  const handleFileInput = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const fileText = await file.text();
        const parsedConfig = JSON.parse(fileText);
        if (!parsedConfig.title || !Array.isArray(parsedConfig.fields)) {
          // using alert as error handler here for now, TODO: change this to a proper message
          alert('Invalid JSON format: Missing "title" or "fields" array.');
        }
        setFormConfig(parsedConfig);
        setShowFileInput(false);
      } catch (error) {
        // using alert as error handler here for now, TODO: change this to a proper message
        alert('Invalid JSON file. Please upload a valid file with a "title" and "fields" array.');
      }
    }
  };

  const handleDownloadSampleJson = () => {
    const jsonBlob = new Blob([JSON.stringify(sampleInput, null, 2)], { type: "application/json" });
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(jsonBlob);
    downloadLink.download = "sampleFormConfig.json";
    downloadLink.click();
  };

  return (
    <div className="flex flex-col justify-center items-center">

      {formConfig && (
        <FormProvider>
          <h2 className="text-xl font-semibold mb-4">
            {formConfig.title}
          </h2>
          <FormRenderer config={formConfig} />
        </FormProvider>
      )}
      
      {/* conditional rendering of upload file button */}
      {showFileInput ? (
        <div className="mb-4 px-4 py-2 flex items-center justify-between max-w-3xl">
          <div className="flex-1 text-left">
            <label
              className="block mb-2 text-sm font-medium"
              htmlFor="file_input"
            >
              Upload Form Configuration File
            </label>
            <input
              type="file"
              id="file_input"
              accept=".json"
              onChange={handleFileInput}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-white file:text-sky-700 hover:file:bg-sky-100"
              />
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400" id="file_input_help">
              JSON format only.
            </p>
          </div>

          <button
            onClick={handleDownloadSampleJson}
            className="ml-4 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
          >
            Download Sample JSON
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowFileInput(true)}
          className="mb-4 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
        >
          Upload Another File
        </button>
      )}
    </div>
  );
};

export default FormSection;