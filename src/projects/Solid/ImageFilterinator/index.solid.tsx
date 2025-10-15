/** @jsxImportSource solid-js */
import { Settings } from "./components/Settings.solid";
import { ImageFilterinatorProvider } from "./ImageFilterinatorContext.solid";
import { EditZone } from "./components/EditZone.solid";

export const ImageFilterinator = () => {

  return (
    <div class="w-full h-full p-1 grid grid-cols-[1fr_250px] gap-4">
      <ImageFilterinatorProvider>
      <EditZone />
        <div class="h-[90%] w-full  border-border border-solid border">
          <Settings />
        </div>
      </ImageFilterinatorProvider>
    </div>
  );
};

