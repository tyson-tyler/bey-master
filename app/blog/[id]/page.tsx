// app/blog/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/shared/navbar";

const BlogPost = () => {
  const [insight, setInsight] = useState<any>(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const res = await fetch(`/api/insights/${id}`);
        const data = await res.json();
        setInsight(data);
      };

      fetchData();
    }
  }, [id]);

  if (!insight) return <p>Loading...</p>;

  return (
    <>
      <div className="bg-gray-950">
        <Navbar />
      </div>
      <div className="p-10 bg-gray-950 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-4">
            {insight.title}
          </h1>
          <Image
            src={insight.imgUrl}
            width={1160}
            height={1160}
            alt={insight.title}
            className="w-full h-auto rounded-lg mb-4"
          />
          <p className="text-lg text-secondary-white">{insight.subtitle}</p>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
