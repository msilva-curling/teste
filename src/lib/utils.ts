/* General utility functions (exposes cn) */
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { type z, ZodError } from 'zod'
import {
  type FieldValues,
  type Resolver,
  type FieldErrors,
} from 'react-hook-form'

/**
 * Merges multiple class names into a single string
 * @param inputs - Array of class names
 * @returns Merged class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const toNestErrors = <TFieldValues extends FieldValues>(
  zodError: ZodError,
): FieldErrors<TFieldValues> => {
  const fieldErrors: FieldErrors<TFieldValues> = {}
  for (const issue of zodError.issues) {
    const path = issue.path
    let current: any = fieldErrors
    for (let i = 0; i < path.length; i++) {
      const part = path[i]
      if (i === path.length - 1) {
        current[part] = { message: issue.message, type: issue.code }
      } else {
        current[part] = current[part] || {}
        current = current[part]
      }
    }
  }
  return fieldErrors
}

/**
 * Custom Zod resolver for react-hook-form, compatible with Zod v3.
 * @param schema - The Zod schema to validate against.
 * @returns A resolver function for react-hook-form.
 */
export const customZodResolver: <T extends z.ZodType<any, any, any>>(
  schema: T,
) => Resolver<z.infer<T>> = (schema) => async (values) => {
  const result = await schema.safeParseAsync(values)
  if (result.success) {
    return { values: result.data, errors: {} }
  }
  return { values: {}, errors: toNestErrors(result.error) }
}

// Add any other utility functions here
