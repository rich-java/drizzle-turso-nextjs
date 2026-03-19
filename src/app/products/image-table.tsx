"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SelectProduct } from "@/db/schema";
import { ImageWithFallback } from "@/components/ui/image-fallback";

interface ImageTableProps<TData> {
  data: SelectProduct[];
}

export function ImageTable<TData>({ data }: ImageTableProps<TData>) {

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {data?.map((item, index) => (
        <div key={index}>
          <ImageWithFallback className="h-auto max-w-full rounded-base" src={item.images}
            width={0} height={0} sizes="100vw" style={{ width: "100%", height: "auto" }} alt=""
          />
        </div>
      ))}
    </div>
  );
}
