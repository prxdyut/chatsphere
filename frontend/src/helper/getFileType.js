
export default function getFileType(filename) {
    const parts = filename.split('.');
    return parts[parts.length - 1];
  }