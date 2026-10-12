import { z } from "zod";

export const validationMessages = {
    required: "الحقل ده مطلوب",
    email: "البريد الإلكتروني غير صحيح",
    passwordMin: (min: number) => `كلمة المرور لازم تكون ${min} حروف على الأقل`,
    passwordUppercase: "كلمة المرور لازم تحتوي على حرف كبير",
    passwordNumber: "كلمة المرور لازم تحتوي على رقم",
    passwordsMismatch: "كلمتين المرور مش متطابقين",
    nameMin: "الاسم لازم يكون حرفين على الأقل",
    nameMax: (max: number) => `الاسم لازم ميزيدش عن ${max} حرف`,
    phone: "رقم الموبايل غير صحيح",
};

const m = validationMessages;
export const requiredRule = z.string().trim().min(1, m.required);
export const emailRule = requiredRule.pipe(z.email(m.email));
export const passwordRule = z
    .string()
    .min(1, m.required)
    .min(8, m.passwordMin(8))
    .regex(/[A-Z]/, m.passwordUppercase)
    .regex(/[0-9]/, m.passwordNumber);
export const nameRule = requiredRule.pipe(z.string().min(2, m.nameMin).max(50, m.nameMax(50)));
export const phoneRule = requiredRule.pipe(z.string().regex(/^01[0125][0-9]{8}$/, m.phone));

export function validateField(schema: z.ZodType<string>, value: string): string | null {
    const result = schema.safeParse(value);
    return result.success ? null : result.error.issues[0].message;
}
