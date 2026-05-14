import { z } from "zod";
import { leadStatuses } from "@/types/leads";

const emptyStringToUndefined = (value: unknown) => {
  if (typeof value === "string" && value.trim() === "") {
    return undefined;
  }

  return value;
};

const optionalText = z.preprocess(
  emptyStringToUndefined,
  z.string().trim().optional(),
);

const optionalUrl = z.preprocess(
  emptyStringToUndefined,
  z.url("Please enter a valid website URL.").optional(),
);

export const leadCreateSchema = z
  .object({
    name: z.string().trim().min(2, "Please enter your name."),
    email: z.email("Please enter a valid email address.").trim(),
    business: optionalText,
    businessType: optionalText,
    business_type: optionalText,
    website: optionalUrl,
    website_url: optionalUrl,
    service: optionalText,
    needed_service: optionalText,
    budget: optionalText,
    budget_range: optionalText,
    timeline: z.string().trim().min(2, "Please choose a timeline."),
    message: z.preprocess(
      emptyStringToUndefined,
      z
        .string()
        .trim()
        .max(2000, "Message must be 2,000 characters or less.")
        .optional(),
    ),
    source: optionalText,
  })
  .superRefine((value, ctx) => {
    requireOne(
      ctx,
      [value.business_type, value.businessType, value.business],
      "business_type",
      "Please choose a business type.",
    );
    requireOne(
      ctx,
      [value.needed_service, value.service],
      "needed_service",
      "Please choose a service.",
    );
    requireOne(
      ctx,
      [value.budget_range, value.budget],
      "budget_range",
      "Please choose a budget range.",
    );
  })
  .transform((value) => ({
    name: value.name,
    email: value.email,
    business_type: firstValue(
      value.business_type,
      value.businessType,
      value.business,
    ) ?? "",
    website_url: firstValue(value.website_url, value.website) ?? null,
    needed_service: firstValue(value.needed_service, value.service) ?? "",
    budget_range: firstValue(value.budget_range, value.budget) ?? "",
    timeline: value.timeline,
    message: value.message ?? null,
    source: value.source ?? "quote_form",
  }));

export const leadStatusUpdateSchema = z.object({
  status: z.enum(leadStatuses),
});

export type LeadCreateInput = z.infer<typeof leadCreateSchema>;
export type LeadStatusUpdateInput = z.infer<typeof leadStatusUpdateSchema>;

function firstValue(...values: Array<string | undefined>) {
  return values.find((value): value is string => Boolean(value));
}

function requireOne(
  ctx: z.RefinementCtx,
  values: Array<string | undefined>,
  path: string,
  message: string,
) {
  if (firstValue(...values)) {
    return;
  }

  ctx.addIssue({
    code: "custom",
    path: [path],
    message,
  });
}
