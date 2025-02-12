import { useFullscreen } from "@mantine/hooks";
import { createContext, useCallback, useContext, useState } from "react";
import type { LiveDemoFiles, LiveDemoPropsFromPlugin } from "shared/types";
import type { LiveDemoStringifiedProps } from "web/types";
import { parseProps } from "./parseProps";

type LiveDemoContextValue = {
  files: LiveDemoFiles;
  setFiles: React.Dispatch<React.SetStateAction<LiveDemoFiles>>;

  activeFile: string;
  setActiveFile: React.Dispatch<React.SetStateAction<string>>;

  updateFiles: (update: LiveDemoFiles) => void;

  isDark: boolean;
  fullscreen: ReturnType<typeof useFullscreen>;
  options: LiveDemoPropsFromPlugin["options"];
  entryFileName: LiveDemoPropsFromPlugin["entryFileName"];
};

const LiveDemoContext = createContext<LiveDemoContextValue | undefined>(
  undefined,
);

type LiveDemoProviderProps = {
  isDark: boolean;
  children: React.ReactNode;
  pluginProps: LiveDemoStringifiedProps;
};

function LiveDemoProvider(props: LiveDemoProviderProps) {
  const fullscreen = useFullscreen();
  const pluginProps = parseProps(props.pluginProps);

  const [files, setFiles] = useState(pluginProps.files);
  const [activeFile, setActiveFile] = useState(pluginProps.entryFileName);

  const updateFiles = useCallback((update: LiveDemoFiles) => {
    setFiles((prevFiles) => ({ ...prevFiles, ...update }));
  }, []);

  return (
    <LiveDemoContext.Provider
      value={{
        files,
        setFiles,
        updateFiles,

        activeFile,
        setActiveFile,

        fullscreen,
        isDark: props.isDark,

        options: pluginProps.options,
        entryFileName: pluginProps.entryFileName,
      }}
    >
      {props.children}
    </LiveDemoContext.Provider>
  );
}

const useLiveDemoContext = () => {
  const context = useContext(LiveDemoContext);

  if (context === undefined) {
    throw new Error(
      "useLiveDemoContext must be used within a LiveDemoProvider",
    );
  }

  return context;
};

export { LiveDemoProvider, useLiveDemoContext };
