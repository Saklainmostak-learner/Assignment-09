const ConfirmDialog = ({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  busy = false,
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-100 grid place-items-center bg-ink/65 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
    >
      <div className="w-full max-w-md rounded-3xl bg-surface p-6 shadow-2xl sm:p-8">
        <p className="text-xs font-bold tracking-[0.18em] text-red-600 uppercase">
          Please confirm
        </p>
        <h2 id="confirm-title" className="mt-3 text-2xl font-black text-ink">
          {title}
        </h2>
        <p className="mt-3 leading-7 text-muted">{message}</p>
        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="rounded-xl border border-ink/15 px-5 py-3 font-bold text-ink transition hover:bg-background disabled:opacity-50"
          >
            Keep it
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            className="rounded-xl bg-red-600 px-5 py-3 font-bold text-white transition hover:bg-red-700 disabled:opacity-50"
          >
            {busy ? "Working..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
