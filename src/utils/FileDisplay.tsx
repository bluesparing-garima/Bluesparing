import React from "react";

interface FileDisplayProps {
  url: string; // Assuming you pass the URL of the file directly
}

const FileDisplay: React.FC<FileDisplayProps> = ({ url }) => {
  const fileType = getFileType(url);

  return (
    <div>
      {fileType === "image" && (
        <img
          src={url}
          alt="Uploaded content"
          style={{ maxWidth: "100%", height: "100px" }}
        />
      )}
      {fileType === "pdf" && (
        <embed src={url} type="application/pdf" width="100%" height="200px" />
      )}
      {fileType === "unsupported" && <p>Unsupported file type</p>}
    </div>
  );
};

const getFileType = (url: string): "image" | "pdf" | "unsupported" => {
  const mimeType = getMimeType(url);

  if (mimeType?.startsWith("image")) {
    return "image";
  } else if (mimeType === "application/pdf") {
    return "pdf";
  } else {
    return "unsupported";
  }
};

const getMimeType = (url: string): string | null => {
  const match = url.match(/\.([^.]+)$/);
  const extension = match ? match[1].toLowerCase() : null;

  switch (extension) {
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return `image/${extension}`;
    case "pdf":
      return "application/pdf";
    default:
      return null;
  }
};

export default FileDisplay;
