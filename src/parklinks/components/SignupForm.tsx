import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ShieldCheck } from 'lucide-react';
import { INTEREST_OPTIONS, PROPERTY_TYPE_OPTIONS } from '../data';
import { SectionHeader } from '../shared/SectionHeader';
import { Reveal } from '../shared/Reveal';
import { Cta } from '../shared/Cta';

type FormState = {
  name: string;
  email: string;
  interest: string;
  propertyType: string;
};

const initial: FormState = {
  name: '',
  email: '',
  interest: '',
  propertyType: '',
};

export function SignupForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  function validate(next: FormState): Partial<Record<keyof FormState, string>> {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!next.name.trim()) e.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next.email)) e.email = 'Please enter a valid email.';
    if (!next.interest) e.interest = 'Please select an interest.';
    if (!next.propertyType) e.propertyType = 'Please select a property type.';
    return e;
  }

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length) return;

    setSubmitting(true);
    // TODO: wire to Mailchimp / HubSpot / internal CRM here.
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    setSuccess(true);
  }

  function reset() {
    setForm(initial);
    setErrors({});
    setSuccess(false);
  }

  return (
    <section id="signup" className="relative py-28 md:py-36 bg-forest-deep pl-grain overflow-hidden">
      {/* Subtle background ornament */}
      <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full opacity-[0.08] pointer-events-none"
           style={{ background: 'radial-gradient(circle, #C9A66B 0%, transparent 70%)' }} />

      <div className="max-w-[1100px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-14 lg:gap-20 items-start">
          <SectionHeader
            eyebrow="Stay Informed"
            title="Be first to receive <em>Parklinks</em> updates."
            body="Quarterly briefings on new tower launches, unit releases, payment schemes, and estate milestones — delivered with the discretion you expect."
          />

          <Reveal delay={0.1}>
            <div className="pl-glass-dark p-7 md:p-10">
              <AnimatePresence mode="wait">
                {!success ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-7"
                    noValidate
                  >
                    <Field
                      id="name"
                      label="Full Name"
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(v) => setForm({ ...form, name: v })}
                      error={errors.name}
                    />
                    <Field
                      id="email"
                      label="Email Address"
                      type="email"
                      placeholder="name@example.com"
                      value={form.email}
                      onChange={(v) => setForm({ ...form, email: v })}
                      error={errors.email}
                    />

                    <div className="grid sm:grid-cols-2 gap-7">
                      <SelectField
                        id="interest"
                        label="Investment Interest"
                        value={form.interest}
                        onChange={(v) => setForm({ ...form, interest: v })}
                        options={INTEREST_OPTIONS as readonly string[]}
                        error={errors.interest}
                      />
                      <SelectField
                        id="propertyType"
                        label="Preferred Property"
                        value={form.propertyType}
                        onChange={(v) => setForm({ ...form, propertyType: v })}
                        options={PROPERTY_TYPE_OPTIONS as readonly string[]}
                        error={errors.propertyType}
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 pt-3">
                      <p className="flex items-start gap-2 text-[0.7rem] tracking-wide text-ivory/45 leading-[1.6] max-w-sm">
                        <ShieldCheck size={14} className="mt-0.5 flex-shrink-0 text-gold-warm/70" strokeWidth={1.4} />
                        Your information is held in confidence under the Philippine Data Privacy Act. Used only for Parklinks correspondence.
                      </p>
                      <Cta type="submit" disabled={submitting}>
                        {submitting ? 'Submitting…' : 'Request a Presentation'}
                      </Cta>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="py-8 text-center"
                  >
                    <div className="w-14 h-14 mx-auto mb-6 rounded-full border border-gold-warm/50 flex items-center justify-center">
                      <Check size={22} strokeWidth={1.6} className="text-gold-warm" />
                    </div>
                    <h3 className="font-serif text-2xl text-ivory mb-3">
                      Thank you, {form.name.split(' ')[0]}.
                    </h3>
                    <p className="text-ivory/70 max-w-md mx-auto font-light leading-[1.8] text-[0.95rem]">
                      Your dedicated Parklinks specialist will reach out within 24 hours with a tailored presentation and the latest available inventory.
                    </p>
                    <button
                      type="button"
                      onClick={reset}
                      className="mt-7 text-[0.7rem] tracking-[0.25em] uppercase text-gold-warm hover:text-gold-soft transition-colors"
                    >
                      Submit another inquiry
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field(props: {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label htmlFor={props.id} className="pl-label">{props.label}</label>
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        className="pl-input"
        aria-invalid={!!props.error}
        aria-describedby={props.error ? `${props.id}-error` : undefined}
      />
      {props.error && (
        <p id={`${props.id}-error`} className="mt-2 text-[0.72rem] text-rose-300">
          {props.error}
        </p>
      )}
    </div>
  );
}

function SelectField(props: {
  id: string;
  label: string;
  value: string;
  options: readonly string[];
  error?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label htmlFor={props.id} className="pl-label">{props.label}</label>
      <select
        id={props.id}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        className="pl-input appearance-none cursor-pointer"
        aria-invalid={!!props.error}
        aria-describedby={props.error ? `${props.id}-error` : undefined}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path fill='none' stroke='%23C9A66B' stroke-width='1.5' d='M1 1l5 5 5-5'/></svg>\")",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 0.25rem center',
          paddingRight: '1.5rem',
        }}
      >
        <option value="" disabled className="bg-forest-deep">Select an option</option>
        {props.options.map((opt) => (
          <option key={opt} value={opt} className="bg-forest-deep">
            {opt}
          </option>
        ))}
      </select>
      {props.error && (
        <p id={`${props.id}-error`} className="mt-2 text-[0.72rem] text-rose-300">
          {props.error}
        </p>
      )}
    </div>
  );
}
