import React, { useEffect, useRef } from "react";

type TrashDropzoneProps = {
  onDropIndex: (index: number) => void;
};

const TrashDropzone = ({ onDropIndex }: TrashDropzoneProps) => {
  const trashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trash = trashRef.current;

    const handleDragStart = () => {
      trash?.classList.remove("translate-x-full");
    };

    const handleDragEnd = () => {
      trash?.classList.add("translate-x-full");
      trash?.classList.remove("scale-110", "scale-100");
    };

    const handleEnter = () => {
      trash?.classList.add("scale-120");
      trash?.classList.remove("scale-100");
    };

    const handleLeave = () => {
      trash?.classList.remove("scale-120");
      trash?.classList.add("scale-100");
    };

    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("dragend", handleDragEnd);

    trash?.addEventListener("dragenter", handleEnter);
    trash?.addEventListener("dragleave", handleLeave);

    return () => {
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("dragend", handleDragEnd);
      trash?.removeEventListener("dragenter", handleEnter);
      trash?.removeEventListener("dragleave", handleLeave);
    };
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    const fromIndex = parseInt(e.dataTransfer.getData("sound-index"), 10);
    if (!isNaN(fromIndex)) {
      onDropIndex(fromIndex);
    }
    const trash = trashRef.current;
    if (trash) {
      trash.classList.add("translate-x-full");
      trash.classList.remove("scale-120", "scale-100");
    }
  };

  // Handle touch-based long press as pseudo-drag (optional)

  return (
    <div
      id="trash"
      ref={trashRef}
      className="flex items-center justify-center transform translate-x-full opacity-50 bg-red-400 h-dvh w-2/12 fixed right-0 top-0 transition-all duration-100 ease-in z-2"
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      }}
      onDrop={handleDrop}
    >
      <h3 className="text-white text-3xl font-bold pointer-events-none">
        DELETE
      </h3>
    </div>
  );
};

export default TrashDropzone;
