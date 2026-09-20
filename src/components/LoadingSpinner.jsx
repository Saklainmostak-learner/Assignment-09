import { FaFutbol } from "react-icons/fa6";

const LoadingSpinner = ({
  message = "Your playing space...",
  fullScreen = true,
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className={
        fullScreen
          ? "grid min-h-[70vh] place-items-center bg-background px-4"
          : "grid place-items-center py-16"
      }
    >
      <div className="text-center">
        <div className="relative mx-auto size-20">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-primary/15 border-t-primary"></div>
          <div className="absolute inset-0 grid place-items-center">
            <FaFutbol className="size-9 text-ink" />
          </div>
        </div>
        <p className="mt-5 text-sm font-bold text-muted">{message}</p>
        <span className="sr-only">Loading</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
