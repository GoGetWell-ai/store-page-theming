import React from 'react'
import { useThemeStore } from '@/store/themeStore'
import { FormItem, FormContainer, Input, Button } from '@/components/ui'

interface SpecialtyFormProps {
    fields: Array<{
        name: string
        label: string
        type: string
        placeholder?: string
        required?: boolean
    }>
    onSubmit: (data: Record<string, string>) => void
    submitText?: string
}

const SpecialtyForm: React.FC<SpecialtyFormProps> = ({
    fields,
    onSubmit,
    submitText,
}) => {
    const { specialtyConfig, colors, typography } = useThemeStore()
    const [formData, setFormData] = React.useState<Record<string, string>>({})

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
    }

    const handleChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <FormContainer onSubmit={handleSubmit}>
            <div
                className={`space-y-4 ${
                    specialtyConfig.forms.layout === 'horizontal'
                        ? 'grid grid-cols-2 gap-4'
                        : ''
                }`}
            >
                {fields.map((field) => (
                    <FormItem
                        key={field.name}
                        label={field.label}
                        className={specialtyConfig.forms.style}
                    >
                        <Input
                            type={field.type}
                            name={field.name}
                            placeholder={field.placeholder}
                            required={field.required}
                            value={formData[field.name] || ''}
                            onChange={(e) =>
                                handleChange(field.name, e.target.value)
                            }
                            style={{
                                fontFamily: typography.fontFamily,
                                fontSize: typography.body1.fontSize,
                                color: colors.text.primary,
                                backgroundColor: colors.background.paper,
                                borderColor: colors.primary.main,
                            }}
                        />
                    </FormItem>
                ))}
            </div>
            <div className="mt-6">
                <Button
                    type="submit"
                    variant="solid"
                    className={`w-full ${
                        specialtyConfig.forms.style === 'organ-transplant'
                            ? 'bg-primary text-white hover:bg-primary-dark'
                            : specialtyConfig.forms.style === 'cosmetic-surgery'
                            ? 'bg-secondary text-white hover:bg-secondary-dark'
                            : 'bg-primary text-white hover:bg-primary-dark'
                    }`}
                >
                    {submitText || 'Submit'}
                </Button>
            </div>
        </FormContainer>
    )
}

export default SpecialtyForm 