import { Loader2 } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="flex justify-center">
      <Loader2 className="h-6 w-6 animate-spin  text-blue-300" />
    </div>
  );
}
