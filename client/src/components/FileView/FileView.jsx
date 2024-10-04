import  { useState } from "react";
import { Document, Page } from "react-pdf";

const fileUrl = "http://res.cloudinary.com/dntks5vgg/raw/upload/v1726211638/template_files/fzti719qadni4fi6jsmz.docx";

const FileViewer = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);

  return (
    <div className="grid h-screen grid-cols-12">
      {/* Left side: File preview */}
      <div className="h-full col-span-8">
        <Document file={fileUrl} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
          <Page pageNumber={pageNumber} />
        </Document>
      </div>

      {/* Right side: Edit button */}
      <div className="flex items-center justify-center h-full col-span-4 p-4 bg-gray-100">
        <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600">
          Edit File
        </button>
      </div>

      {/* Bottom: Pagination system */}
      <div className="flex justify-center p-4">
        <button
          onClick={() => setPageNumber(pageNumber - 1)}
          disabled={pageNumber === 1}
        >
          Previous
        </button>
        <span className="px-2">{pageNumber} / {numPages}</span>
        <button
          onClick={() => setPageNumber(pageNumber + 1)}
          disabled={pageNumber === numPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FileViewer;