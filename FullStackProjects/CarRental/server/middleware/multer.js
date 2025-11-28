// multer middleware for handling file uploads
import multer from 'multer';

// setting up multer storage
const upload = multer({storage: multer.diskStorage({})})


// exporting the upload middleware
export default upload;