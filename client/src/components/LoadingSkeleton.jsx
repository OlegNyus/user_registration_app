export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-test="loading-skeleton">
      {/* Skeleton Card 1 */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="h-5 skeleton rounded w-32 mb-2"></div>
            <div className="h-4 skeleton rounded w-48"></div>
          </div>
          <div className="w-10 h-10 skeleton rounded-full"></div>
        </div>
        <div className="h-3 skeleton rounded w-24 mb-4"></div>
        <div className="flex gap-2">
          <div className="flex-1 h-9 skeleton rounded-lg"></div>
          <div className="flex-1 h-9 skeleton rounded-lg"></div>
        </div>
      </div>

      {/* Skeleton Card 2 */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="h-5 skeleton rounded w-32 mb-2"></div>
            <div className="h-4 skeleton rounded w-48"></div>
          </div>
          <div className="w-10 h-10 skeleton rounded-full"></div>
        </div>
        <div className="h-3 skeleton rounded w-24 mb-4"></div>
        <div className="flex gap-2">
          <div className="flex-1 h-9 skeleton rounded-lg"></div>
          <div className="flex-1 h-9 skeleton rounded-lg"></div>
        </div>
      </div>

      {/* Skeleton Card 3 */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="h-5 skeleton rounded w-32 mb-2"></div>
            <div className="h-4 skeleton rounded w-48"></div>
          </div>
          <div className="w-10 h-10 skeleton rounded-full"></div>
        </div>
        <div className="h-3 skeleton rounded w-24 mb-4"></div>
        <div className="flex gap-2">
          <div className="flex-1 h-9 skeleton rounded-lg"></div>
          <div className="flex-1 h-9 skeleton rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
