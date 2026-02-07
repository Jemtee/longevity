# Component Generator Skill

Generate React components following Wellspring conventions and best practices.

## Capabilities:
- Create TypeScript React components
- Include proper prop types
- Add Shadcn/ui styling
- Implement responsive design
- Include accessibility features
- Follow Wellspring brand guidelines

## Component Types:
1. **UI Components** - Basic building blocks (buttons, inputs, cards)
2. **Dashboard Components** - Biomarker cards, charts, stats
3. **Content Components** - Article cards, premium gates
4. **Marketing Components** - Hero, features, pricing
5. **Layout Components** - Headers, footers, sidebars

## Standards:
- Use TypeScript with strict types
- Implement React.forwardRef when needed
- Include displayName for debugging
- Use Tailwind CSS with cn() utility
- Follow accessibility guidelines (ARIA labels, keyboard navigation)
- Include JSDoc comments for props
- Export component and types separately

## File Structure:
```typescript
import * as React from "react"
import { cn } from "@/lib/utils"

interface ComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  // Props here
}

const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("base-classes", className)}
        {...props}
      />
    )
  }
)

Component.displayName = "Component"

export { Component }
export type { ComponentProps }
```

## Brand Styling:
- Primary color: #0ba5e9 (calming blue)
- Soft corners: rounded-xl (0.75rem)
- Ample whitespace
- Clear typography (Inter for body, Cal Sans for headings)
- Encouraging tone in copy
