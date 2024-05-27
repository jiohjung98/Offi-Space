export default function Loader({ className = '' }) {
  return (
    <div className={`flex gap-4 justify-center py-4 ${className}`}>
      <div className="w-2 h-2 animate-ping rounded-full bg-space-purple" />
      <div className="w-2 h-2 animate-ping rounded-full bg-space-purple" />
      <div className="w-2 h-2 animate-ping rounded-full bg-space-purple" />
    </div>
  );
}
