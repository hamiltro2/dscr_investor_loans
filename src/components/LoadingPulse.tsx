export default function LoadingPulse() {
  return (
    <div className="flex items-center gap-4 bg-gray-700/50 rounded-lg p-4">
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-150"></div>
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-300"></div>
      </div>
      <span className="text-gray-400 animate-pulse">AI is analyzing your question...</span>
    </div>
  );
}
