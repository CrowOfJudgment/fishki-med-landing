import type { DemoStepKey } from "./app-demo";

export default function DemoStepControls({
  steps,
  currentStep,
  onStepChange,
  label,
  flowLabels,
}: {
  steps: Array<{ key: DemoStepKey; nav: string; flow?: "create" | "study" }>;
  currentStep: number;
  onStepChange: (index: number) => void;
  label: string;
  flowLabels: { create: string; study: string };
}) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#0F766E]">
        {label}
      </p>
      <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-1">
        {steps.map((step, index) => {
          const active = currentStep === index;
          const complete = currentStep > index;
          const showFlowLabel =
            index === 0 || steps[index - 1]?.flow !== step.flow;

          return (
            <div key={step.key} className={showFlowLabel && index > 0 ? "mt-3" : ""}>
              {showFlowLabel && step.flow && (
                <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#274D53]/60">
                  {flowLabels[step.flow]}
                </p>
              )}
              <button
                type="button"
                onClick={() => onStepChange(index)}
                aria-current={active ? "step" : undefined}
                className={`flex w-full min-w-0 items-center gap-3 rounded-[1.1rem] p-3 text-left shadow-sm transition active:scale-[0.99] sm:p-4 ${
                  active
                    ? "bg-[#0F766E] text-white"
                    : "bg-[#F4F7F5] text-[#002838]"
                }`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    active
                      ? "bg-white/15"
                      : complete
                        ? "bg-[#B9DDD5] text-[#0F766E]"
                        : "bg-[#E7F1EE] text-[#0F766E]"
                  }`}
                >
                  {complete ? "✓" : index + 1}
                </span>
                <span className="truncate text-xs font-semibold sm:text-sm">
                  {step.nav}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
