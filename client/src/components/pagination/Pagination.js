import React from "react";
import usePagination from "../../hooks/usePagination";
import PagiItems from "./PagiItems";
import { useSearchParams } from "react-router-dom";
const Pagination = ({ totalCount, productNumber }) => {
  const [params] = useSearchParams();
  const pagination = usePagination(totalCount, +params.get("page") || 1);

  const range = () => {
    const currentpage = +params.get("page");
    const pageSize = +process.env.REACT_APP_LIMIT || 10;
    const start = Math.min((currentpage - 1) * pageSize + 1,totalCount);
    const end = Math.min(currentpage * pageSize, totalCount);

    return `${start} - ${end}`;
  };
  return (
    <div className="flex w-full justify-between items-center">
      {!+params.get("page") ? (
        <span className="text-sm ">{`Hiển thị ${Math.min(totalCount,1)}- ${Math.min(
          +process.env.REACT_APP_LIMIT,
          totalCount
        )} cua ${totalCount}`}</span>
      ) : (
        ""
      )}
      {+params.get("page") ? (
        <span className="text-sm">{`Hiển thị ${range()} cua ${totalCount}`}</span>
      ) : (
        ""
      )}

      <div className="flex items-center">
        {pagination?.map((el) => (
          <PagiItems key={el}>{el}</PagiItems>
        ))}
      </div>
    </div>
  );
};

export default Pagination;

// first + last + current + sibling + 2*kDOTS
// min = 6 => sibling+ 5
// totalpagination: 66 , limitproduct : 10 => 7 (66/10) = 6.6(lấy cận trên ) => 7
// totalPaginationItem: sibling+5
// [1,2,3,4,5,6]
// [1,...,6,7,8,9,10]
// [1,2,3,4,5,...,10]
// [1,...,5,6,7,...,10]
