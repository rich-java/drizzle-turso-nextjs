import Link from "next/link";
import { ImageTable } from "./products/image-table";
import Pagination from "@/components/pagination";
import { getProducts } from "@/db/queries";
import { Consts } from "./consts/consts";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q: string; page: string; pageSize: string }>
}) {
  const search = (await searchParams).q ?? "";
  const page = (await searchParams).page ?? 1;
  const pageSize = (await searchParams).pageSize ?? Consts.DEFAULT_PAGE_SIZE;

  const { products, hasNextPage, totalRowsCount } = await getProducts(search, Number(page), Number(pageSize));

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-6">
      <ImageTable data={products} />
      <Pagination hasNextPage={hasNextPage} pageSize={pageSize} currentPage={page} totalRowsCount={totalRowsCount} />
    </main>
  );
}
