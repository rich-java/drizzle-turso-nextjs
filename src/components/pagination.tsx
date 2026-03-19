"use client";

import { useRouter } from "next/navigation";
import { ListFilter } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

export default function Pagination({
  hasNextPage,
  pageSize,
  currentPage,
  totalRowsCount,
}: {
  hasNextPage: boolean
  pageSize: string
  currentPage: string
  totalRowsCount: number
}) {
  let lastPage = Math.ceil(totalRowsCount / Number(pageSize));
  const start = 1;
  const pageNos = Array.from({ length: lastPage - start + 1 }, (_, i) => start + i);

  const router = useRouter();

  function onNextPage() {
    if (!hasNextPage) return;
    const offset = Number(currentPage) + 1;
    if (offset > lastPage) {
      goToPage(lastPage);
      return;
    }
    goToPage(offset);
  }

  function onPreviousPage() {
    const offset = Number(currentPage);
    if (!offset) return;
    const newOffset = offset - 1;
    if (newOffset <= 1) {
      goToPage(1);
      return;
    }
    goToPage(newOffset);
  }

  function goToPage(page: number) {
    router.push(`/?pageSize=${pageSize}&page=${page}`);
  }

  return (
    <div className="flex items-center gap-1">
      <button className={BUTTON_CLASS_NAME} onClick={() => goToPage(1)} disabled={Number(currentPage) == 1}>
        First
      </button>
      <button className={BUTTON_CLASS_NAME} onClick={onPreviousPage} disabled={Number(currentPage) <= 1}>
        <svg width="1.5em" height="1.5em" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" className="mr-1.5 h-4 w-4 stroke-2">
          <path d="M15 6L9 12L15 18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      </button>
      {pageNos?.map((num, index) => (
        <button key={index} className={Number(currentPage) == num ? NUMBER_CLASS_NAME_SELECTED : NUMBER_CLASS_NAME} onClick={() => goToPage(num)}>{num}</button>
      ))}
      <button className={BUTTON_CLASS_NAME} onClick={onNextPage} disabled={Number(currentPage) >= lastPage}>
        <svg width="1.5em" height="1.5em" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor" className="ml-1.5 h-4 w-4 stroke-2">
          <path d="M9 6L15 12L9 18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      </button>
      <button className={BUTTON_CLASS_NAME} onClick={() => goToPage(lastPage)} disabled={Number(currentPage) == lastPage}>
        Last
      </button>
    </div>
  );
}

const BUTTON_CLASS_NAME = "inline-flex select-none items-center justify-center rounded-full border border-transparent bg-transparent px-3.5 py-2.5 text-center align-middle text-sm font-medium leading-none text-slate-800 transition-all duration-300 ease-in hover:border-slate-800/5 hover:bg-slate-800/5 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none";
const NUMBER_CLASS_NAME = "inline-grid min-h-[36px] min-w-[36px] select-none place-items-center rounded-full border border-transparent bg-transparent text-center align-middle text-sm font-medium leading-none text-slate-800 transition-all duration-300 ease-in hover:border-slate-800/5 hover:bg-slate-800/5 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none";
const NUMBER_CLASS_NAME_SELECTED = "inline-grid min-h-[36px] min-w-[36px] select-none place-items-center rounded-full border border-slate-800 bg-slate-800 text-center align-middle text-sm font-medium leading-none text-slate-50 transition-all duration-300 ease-in hover:border-slate-700 hover:bg-slate-700 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none";
