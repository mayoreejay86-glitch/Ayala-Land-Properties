"use client";

import { useMemo, useState } from "react";
import type { Property } from "@/lib/types";

const php = (n: number) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(n);

export function PaymentCalculator({ property }: { property: Property }) {
  const defaultPlan = property.paymentPlans[0];
  const [planIdx, setPlanIdx] = useState(0);
  const [downPct, setDownPct] = useState(defaultPlan?.downPct ?? 10);

  const plan = property.paymentPlans[planIdx] ?? defaultPlan;

  const numbers = useMemo(() => {
    const price = property.priceInPhp;
    const down = (price * downPct) / 100;
    const monthsDp = plan?.monthsToTurnover ?? 36;
    const monthlyDp = down / monthsDp;
    const balanceAtTurnover = price - down;
    return { price, down, monthsDp, monthlyDp, balanceAtTurnover };
  }, [property.priceInPhp, downPct, plan]);

  return (
    <div className="border border-gold/40 bg-cream p-6 md:p-8">
      <p className="eyebrow mb-5">Payment Plan · Interactive</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <label className="block">
          <span className="text-[0.7rem] tracking-[0.2em] uppercase text-gray-dark">
            Plan
          </span>
          <select
            value={planIdx}
            onChange={(e) => {
              const i = Number(e.target.value);
              setPlanIdx(i);
              setDownPct(property.paymentPlans[i]?.downPct ?? 10);
            }}
            className="mt-2 w-full bg-transparent border-b border-gold/60 py-2 font-serif text-lg focus:outline-none focus:border-gold"
          >
            {property.paymentPlans.map((p, i) => (
              <option key={p.name} value={i}>
                {p.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-[0.7rem] tracking-[0.2em] uppercase text-gray-dark">
            Down payment · {downPct}%
          </span>
          <input
            type="range"
            min={5}
            max={50}
            step={1}
            value={downPct}
            onChange={(e) => setDownPct(Number(e.target.value))}
            className="mt-3 w-full accent-[color:var(--color-gold)]"
          />
        </label>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-gold/30 pt-6">
        <Stat label="Price" value={php(numbers.price)} />
        <Stat label="Down Payment" value={php(numbers.down)} />
        <Stat
          label={`Monthly (${numbers.monthsDp}m)`}
          value={php(numbers.monthlyDp)}
        />
        <Stat label="Balance at Turnover" value={php(numbers.balanceAtTurnover)} />
      </div>

      <p className="mt-6 text-[0.7rem] tracking-[0.15em] uppercase text-gray-mid">
        Indicative only. Final terms confirmed by developer sales.
      </p>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[0.6rem] tracking-[0.2em] uppercase text-gray-dark">
        {label}
      </p>
      <p className="font-serif text-lg md:text-xl text-charcoal mt-1 leading-tight">
        {value}
      </p>
    </div>
  );
}
