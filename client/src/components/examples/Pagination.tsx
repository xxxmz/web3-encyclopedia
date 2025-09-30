import Pagination from "../Pagination";
import { useState } from "react";

export default function PaginationExample() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="p-4">
      <Pagination 
        currentPage={currentPage} 
        totalPages={4} 
        onPageChange={setCurrentPage} 
      />
      <p className="text-center mt-4 text-muted-foreground">当前页: {currentPage}</p>
    </div>
  );
}
