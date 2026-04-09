import { useMemo, useState } from "react";
import { Info } from "lucide-react";
import { useLocalStorage } from "../utils/useLocalStorage";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";

function formatNIS(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(2)}K`;
  return value.toFixed(2);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function NumberInput({
  label,
  value,
  onChange,
  min,
  max,
  suffix,
  error,
}: {
  label: React.ReactNode;
  value: string;
  onChange: (raw: string) => void;
  min: number;
  max: number;
  suffix?: string;
  error?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          alignItems: "center",
          gap: "0.5rem",
          direction: "rtl",
        }}
      >
        <label
          style={{ fontWeight: 600, fontSize: "0.85rem", whiteSpace: "nowrap" }}
        >
          {label}
          {suffix && ` (${suffix})`}
        </label>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          max={max}
          style={{
            width: "auto",
            minWidth: "4rem",
            padding: "0.35rem 0.5rem",
            borderRadius: "0.375rem",
            border: error ? "1px solid #f87171" : "1px solid #4b5563",
            backgroundColor: "rgb(31, 41, 55)",
            color: "#e5e7eb",
            fontSize: "0.85rem",
            direction: "ltr",
            textAlign: "right",
          }}
        />
      </div>
      {error && (
        <span style={{ fontSize: "0.75rem", color: "#f87171" }}>{error}</span>
      )}
    </div>
  );
}

function useNumericInput(
  key: string,
  initial: number,
  min: number,
  max: number,
) {
  const [raw, setRaw] = useLocalStorage(key, String(initial));
  const parsed = parseFloat(raw);
  const isValid = !isNaN(parsed) && parsed >= min && parsed <= max;
  const value = isValid ? parsed : clamp(initial, min, max);
  const error =
    raw !== "" && !isValid ? `${min} עד ${max} חייב להיות בין` : undefined;
  return { raw, setRaw, value, error } as const;
}

function InfoTooltip({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <span style={{ position: "relative", display: "inline-flex" }}>
      <Info
        size={16}
        style={{ color: "#9ca3af", cursor: "pointer" }}
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      />
      {open && (
        <div
          style={{
            position: "absolute",
            top: "1.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            width: "18rem",
            padding: "0.75rem",
            backgroundColor: "#1f2937",
            border: "1px solid #4b5563",
            borderRadius: "0.5rem",
            color: "#d1d5db",
            fontSize: "0.75rem",
            lineHeight: 1.5,
            direction: "rtl",
            zIndex: 50,
            whiteSpace: "pre-wrap",
            boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
          }}
        >
          {text}
        </div>
      )}
    </span>
  );
}

const sectionStyle = (borderColor: string) => ({
  display: "flex" as const,
  flexDirection: "column" as const,
  gap: "0.5rem",
  padding: "0.75rem",
  borderRadius: "0.5rem",
  backgroundColor: "rgb(55, 65, 81)",
  border: `2px solid ${borderColor}`,
});

export default function LinearChart() {
  const initial = useNumericInput("kgl-initial", 100_000, 0, Infinity);
  const monthly = useNumericInput("kgl-monthly", 1_000, 0, Infinity);
  const returnRate = useNumericInput("kgl-return", 5, 0, 100);
  const startAge = useNumericInput("kgl-startAge", 20, 0, 59);
  const monthlyWithdrawal = useNumericInput(
    "kgl-withdrawal-monthly",
    10_000,
    0,
    Infinity,
  );
  const divider = useNumericInput("kgl-divider", 200, 1, Infinity);
  const commission = useNumericInput("kgl-commission", 0.6, 0, 100);
  const taxRate = 25;
  const retirementAge = 60;
  const endAge = 90;

  const data = useMemo(() => {
    const r = returnRate.value / 100;
    const c = commission.value / 100;
    const tax = taxRate / 100;
    const grossMonthlySelf = monthlyWithdrawal.value / (1 - tax);
    const points = [];
    let selfBalance = initial.value;
    let kglBalance = initial.value;
    let kglMonthlyNet = 0;
    for (let age = startAge.value; age <= endAge; age++) {
      const isRetired = age >= retirementAge;
      if (isRetired && age === retirementAge) {
        kglMonthlyNet = kglBalance / divider.value;
      }
      points.push({
        age,
        selfManaged: Math.round(Math.max(selfBalance, 0)),
        kgl:
          age <= retirementAge
            ? Math.round(Math.max(kglBalance, 0))
            : undefined,
      });
      if (isRetired) {
        for (let m = 0; m < 12; m++) {
          selfBalance =
            Math.max(selfBalance - grossMonthlySelf, 0) * (1 + r / 12);
        }
        for (let m = 0; m < 12; m++) {
          kglBalance = Math.max(kglBalance - kglMonthlyNet, 0) * (1 + r / 12);
        }
        kglBalance -= kglBalance * c;
      } else {
        for (let m = 0; m < 12; m++) {
          selfBalance = selfBalance * (1 + r / 12) + monthly.value;
          kglBalance = kglBalance * (1 + r / 12) + monthly.value;
        }
        kglBalance -= kglBalance * c;
      }
    }
    return points;
  }, [
    initial.value,
    monthly.value,
    monthlyWithdrawal.value,
    divider.value,
    commission.value,
    startAge.value,
    returnRate.value,
  ]);

  const retirementElapsed = retirementAge - startAge.value;
  const retirementPoint = data.find((d) => d.age === retirementAge);
  const selfRetirementValue = retirementPoint?.selfManaged ?? 0;
  const kglRetirementValue = retirementPoint?.kgl ?? 0;
  const selfNetMonthly = monthlyWithdrawal.value;
  const selfGrossMonthly = selfNetMonthly / (1 - taxRate / 100);
  const kglMonthlyNet = kglRetirementValue / divider.value;

  return (
    <div
      style={{
        direction: "rtl",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1rem",
        backgroundColor: "rgb(31, 41, 55)",
        borderRadius: "0.75rem",
      }}
    >
      {/* All sections in one row on wide screens */}
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {/* השקעות */}
        <div style={{ ...sectionStyle("#a78bfa"), flex: 2, minWidth: "16rem" }}>
          <div
            style={{ fontWeight: 700, color: "#a78bfa", fontSize: "1.1rem" }}
          >
            השקעות
          </div>
          <NumberInput
            label="סכום התחלתי"
            value={initial.raw}
            onChange={initial.setRaw}
            min={1}
            max={999_999_999}
            suffix="₪"
            error={initial.error}
          />
          <NumberInput
            label="הפקדה חודשית"
            value={monthly.raw}
            onChange={monthly.setRaw}
            min={0}
            max={999_999}
            suffix="₪"
            error={monthly.error}
          />
          <NumberInput
            label="תשואה שנתית"
            value={returnRate.raw}
            onChange={returnRate.setRaw}
            min={0}
            max={100}
            suffix="%"
            error={returnRate.error}
          />
          <NumberInput
            label="גיל התחלה"
            value={startAge.raw}
            onChange={startAge.setRaw}
            min={0}
            max={59}
            error={startAge.error}
          />
        </div>

        {/* תנאי קופת גמל להשקעה */}
        <div style={{ ...sectionStyle("#4ade80"), flex: 1, minWidth: "18rem" }}>
          <div style={{ fontWeight: 700, color: "#4ade80" }}>
            תנאי קופת גמל להשקעה
          </div>
          <NumberInput
            label={
              <>
                מחלק{" "}
                <InfoTooltip
                  text={`מקדם המרה לקצבה הוא מספר שבעזרתו "מתרגמים" סכומים שנצברו בחיסכון פנסיוני לקצבה חודשית לשארית החיים.\n\nלדוגמה:\nמבוטח שצבר בחיסכון הפנסיוני שלו 1,000,000 ₪, והובטח לו מקדם קצבה של 200, יקבל בשארית חייו קצבה חודשית של 5,000 ₪, לפי החישוב: 5,000 = 200 / 1,000,000.\n\nמקדם ההמרה נקבע על פי תוחלת חיים ולוחות תמותה של האוכלוסייה, והוא עשוי להשתנות לאורך תקופת החיסכון הפנסיוני.\n\nככל שמקדם ההמרה נמוך יותר, גובה קצבת הפנסיה החודשית שצפויה למבוטח תהיה גדולה יותר.\n\nמקדמי ההמרה של חברות ביטוח שונות, קרנות פנסיה שונות וקופות גמל שונות אינם אחידים. יתכנו מקדמי המרה שונים בין חברות ביטוח אחת לשניה, ובין קופת גמל שונות וכן בין קרן פנסיה אחת לאחרת.`}
                />
              </>
            }
            value={divider.raw}
            onChange={divider.setRaw}
            min={1}
            max={999}
            error={divider.error}
          />
          <NumberInput
            label="דמי ניהול"
            value={commission.raw}
            onChange={commission.setRaw}
            min={0}
            max={1}
            suffix="% שנתי"
            error={commission.error}
          />
          <div style={{ fontSize: "0.8rem", color: "#9ca3af" }}>
            חודשי = סה״כ בפרישה / {divider.value} (ללא מס)
          </div>
          <div
            style={{
              fontSize: "0.95rem",
              color: "#4ade80",
              fontWeight: 700,
              paddingTop: "0.25rem",
              borderTop: "1px solid #4b5563",
            }}
          >
            קצבה חודשית: {formatNIS(kglMonthlyNet)} ₪
          </div>
        </div>

        {/* תנאי חיסכון עצמאי */}
        <div style={{ ...sectionStyle("#38bdf8"), flex: 1, minWidth: "18rem" }}>
          <div style={{ fontWeight: 700, color: "#38bdf8" }}>
            תנאי חיסכון עצמאי
          </div>
          <NumberInput
            label="משיכה חודשית נטו"
            value={monthlyWithdrawal.raw}
            onChange={monthlyWithdrawal.setRaw}
            min={0}
            max={999_999}
            suffix="₪"
            error={monthlyWithdrawal.error}
          />
          <div style={{ fontSize: "0.8rem", color: "#9ca3af" }}>
            מס רווחי הון: {taxRate}%
          </div>
        </div>
      </div>

      {/* Chart - keep LTR for axis readability */}
      <div style={{ direction: "ltr" }}>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="age"
              stroke="#9ca3af"
              label={{
                value: "גיל",
                position: "insideBottom",
                offset: -5,
                fill: "#9ca3af",
              }}
            />
            <YAxis stroke="#9ca3af" tickFormatter={formatNIS} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "1px solid #4b5563",
                borderRadius: "0.5rem",
                direction: "rtl",
              }}
              labelFormatter={(v) => `גיל ${v}`}
              formatter={(value) => [`${formatNIS(Number(value))} ₪`, ""]}
            />
            <Line
              type="monotone"
              dataKey="selfManaged"
              stroke="#38bdf8"
              dot={false}
              name="חיסכון עצמאי"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="kgl"
              stroke="#4ade80"
              dot={false}
              name="קופת גמל"
              strokeWidth={2}
            />

            <ReferenceLine
              x={retirementAge}
              stroke="#a78bfa"
              strokeDasharray="5 5"
              strokeWidth={2}
              label={{
                value: `פרישה (${retirementAge})`,
                position: "top",
                fill: "#a78bfa",
                fontSize: 12,
              }}
            />
            <ReferenceDot
              x={retirementAge}
              y={selfRetirementValue}
              r={6}
              fill="#38bdf8"
              stroke="#fff"
              strokeWidth={2}
            />
            <ReferenceDot
              x={retirementAge}
              y={kglRetirementValue}
              r={6}
              fill="#4ade80"
              stroke="#fff"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Summary */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr 1fr",
          gap: "0.25rem 1rem",
          fontSize: "0.85rem",
          color: "#d1d5db",
          direction: "rtl",
          backgroundColor: "rgb(55, 65, 81)",
          padding: "0.75rem",
          borderRadius: "0.5rem",
        }}
      >
        <div style={{ fontWeight: 600 }}>
          פרישה בגיל {retirementAge} ({retirementElapsed} שנים)
        </div>
        <div style={{ color: "#38bdf8" }}>
          חיסכון עצמאי = {formatNIS(selfRetirementValue)} ₪
        </div>
        <div style={{ color: "#4ade80" }}>
          קופת גמל = {formatNIS(kglRetirementValue)} ₪
        </div>

        <div style={{ fontWeight: 600 }}>קצבה חודשית</div>
        <div style={{ color: "#38bdf8" }}>
          {formatNIS(selfNetMonthly)} ₪ נטו ({formatNIS(selfGrossMonthly)} ₪
          ברוטו, {taxRate}% מס)
        </div>
        <div style={{ color: "#4ade80" }}>
          {formatNIS(kglMonthlyNet)} ₪ נטו (ללא מס, /{divider.value})
        </div>
      </div>
    </div>
  );
}
