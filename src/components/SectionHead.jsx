export default function SectionHead({
  label,
  title,
  text,
  lead,
  className = "",
}) {
  return (
    <div
      className={`flex flex-col justify-between gap-space-md md:flex-row md:items-end ${className}`}
    >
      <div>
        <span className="mb-space-xs block font-meta-tag text-meta-tag uppercase tracking-widest text-[#7955A3]">
          {label}
        </span>

        <h2 className="font-headline-xl text-headline-xl tracking-tight text-[#302832]">
          {title}
        </h2>

        {lead && (
          <p className="mt-space-xs max-w-xl font-body-editorial-lead text-body-editorial-lead text-[#513653]">
            {lead}
          </p>
        )}
      </div>

      {text && (
        <p className="max-w-md font-body-muted text-body-muted text-[#513653]">
          {text}
        </p>
      )}
    </div>
  );
}
