import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Set storage destination for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadFolder = './uploads';
        // Ensure the folder exists
        if (!fs.existsSync(uploadFolder)) {
            fs.mkdirSync(uploadFolder, { recursive: true });
        }
        cb(null, uploadFolder);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // e.g., 1234567890-123.png
    }
});

// Configure multer
export const upload = multer({ storage })



const templateStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads'); // Set a specific directory for template files
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Name the file with the current timestamp and the original file extension
    }
  });
  
  //! Define the file filter for template uploads (restricting to certain file types like images and documents)
  const templateFileFilter = (req, file, cb) => {
    const allowedTypes = [
      'image/jpeg',            // JPEG images
      'image/png',             // PNG images
      'image/gif',
      'image/avif'   ,          // GIF images
      'image/webp',            // WebP images
      'image/svg+xml',         // SVG images
      'application/pdf',       // PDF documents
      'application/msword',    // Word documents
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
      'application/vnd.ms-excel', // Excel files
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' // XLSX
    ];
  
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type for template upload'), false);
    }
  };
  
  //! Set up Multer with storage and file filter configuration
  const templateUpload = multer({
    storage: templateStorage,
    fileFilter: templateFileFilter,
    limits: {
      fileSize: 1024 * 1024 * 50, 
    }
  });
  
  export { templateUpload };
  
