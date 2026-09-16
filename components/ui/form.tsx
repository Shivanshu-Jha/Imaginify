import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import {
    Controller,
    ControllerProps,
    FieldPath,
    FieldValues,
    FormProvider,
    useFormContext
} from "react-hook-form"

import { cn } from "@/lib/utils"

const Form = FormProvider

function FormField<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(
    props: ControllerProps<TFieldValues, TName>
) {
    return <Controller {...props} />
}

function FormItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("space-y-2", className)} {...props} />
}

function FormLabel({ className, ...props }: React.HTMLAttributes<HTMLLabelElement>) {
    return <label className={cn("text-sm font-medium", className)} {...props} />
}

function FormControl({ ...props }) {
    return <Slot {...props} />
}

function FormMessage({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
    return <p className={cn("text-sm text-red-500", className)} {...props} />
}

function FormDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p className={cn("text-sm text-muted-foreground", className)} {...props} />
    )
}

export { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription }
