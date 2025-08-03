/** @jsxImportSource solid-js */

import { createSignal, onCleanup } from "solid-js";

type FileDropzoneProps = {
  onFileDrop: (file: File) => void;
  accept?: string;
  class?: string;
};

export default function FileDropzone(props: FileDropzoneProps) {
  const [isDragging, setIsDragging] = createSignal(false);
  let dropRef: HTMLDivElement | undefined;

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      props.onFileDrop(files[0]); // only handling the first file
    }
  };

  const handleFileInput = (e: Event) => {
    const target = e.currentTarget as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      props.onFileDrop(files[0]);
    }
  };

  // Attach event listeners manually
  onCleanup(() => {
    dropRef?.removeEventListener("dragover", handleDragOver);
    dropRef?.removeEventListener("dragleave", handleDragLeave);
    dropRef?.removeEventListener("drop", handleDrop);
  });

  return (
    <div
      ref={dropRef}
      class={`border-2 border-dashed p-6 rounded-lg text-center transition-colors cursor-pointer ${
        isDragging() ? "bg-blue-muted border-accent" : "border-muted"
      } ${props.class || ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => dropRef?.querySelector("input")?.click()}
    >
      <p class="text-sm text-gray-600">Drag & drop an image here, or click to select</p>
      <input
        type="file"
        accept={props.accept || "image/*"}
        class="hidden"
        onInput={handleFileInput}
      />
    </div>
  );
}
