type LoadingIndicatorProps = {
  text?: string;
};

export const LoadingIndicator = ({
  text = "Loading ...",
}: LoadingIndicatorProps) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex justify-center py-4"
    >
      {text}
    </div>
  );
};