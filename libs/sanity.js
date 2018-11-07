const magicNumbers = {
    "image/gif": {
      len: 6,
      header: [
        [0x47, 0x49, 0x46, 0x38, 0x37, 0x61],
        [0x47, 0x49, 0x46, 0x38, 0x39, 0x61]
      ],
      mime: "image/gif"
    },
    "image/jpeg": {
      len: 2,
      header: [0xff, 0xd8],
      footer: [0xff, 0xd9],
      mime: "image/jpeg"
    },
    "image/png": {
      len: 8,
      header: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
      mime: "image/png"
    }
  };
  
  
  function sanityFile(m, b) {
      const hBuffer =
        typeof magicNumbers[m].header[0][1] != "undefined"
          ? Buffer.from(magicNumbers[m].header[0])
          : Buffer.from(magicNumbers[m].header);
      const hBuffer2 =
        typeof magicNumbers[m].header[0][1] == "undefined"
          ? 0
          : Buffer.from(magicNumbers[m].header[1]);
      const fBuffer = !magicNumbers[m].footer
        ? 0
        : Buffer.from(magicNumbers[m].footer);
      const len = magicNumbers[m].len;
    
      if (hBuffer2 != 0) {
        if (hBuffer.compare(b, 0, len) != 0 && hBuffer2.compare(b, 0, len) != 0) {
          return false;
        }
      } else {
        if (hBuffer.compare(b, 0, len) != 0) {
          return false;
        }
      }
      return true;
  }
  
  module.exports.sanityFile = (mime, buffer) => {
      return sanityFile(mime, buffer);
  }