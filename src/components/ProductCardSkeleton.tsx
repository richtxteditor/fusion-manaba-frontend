const SkeletonCard = () => (
  <div className="rounded-xl border bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
    <div className="animate-pulse">
      <div className="h-8 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>
      <div className="mt-4 h-4 w-1/4 rounded bg-gray-200 dark:bg-gray-700"></div>
      <div className="mt-4 h-16 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
      <div className="mt-6 flex justify-end">
        <div className="h-10 w-1/3 rounded bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </div>
  </div>
);

const ProductCardSkeleton = () => {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </>
  );
};

export default ProductCardSkeleton;
