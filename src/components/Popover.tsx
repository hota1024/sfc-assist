import { keyframes, styled } from '@/stitches.config'
import * as PopoverPrimitive from '@radix-ui/react-popover'

const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
})

const slideRightAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
})

const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
})

const slideLeftAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
})

/**
 * Popover props.
 */
export type PopoverProps = {
  slots: {
    trigger: React.ReactNode
    content: React.ReactNode
  }
}

/**
 * Popover component.
 */
export const Popover: React.VFC<PopoverProps> = (props) => {
  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger asChild>
        {props.slots.trigger}
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverContent>{props.slots.content}</PopoverContent>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
}

const PopoverContent = styled(PopoverPrimitive.Content, {
  borderRadius: 4,
  padding: 16,
  zIndex: 999999,
  backgroundColor: '$gray2',
  boxShadow: '0 0 16px rgba(0, 0, 0, 0.1)',
  animationDuration: '400ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  willChange: 'transform, opacity',
  '&[data-state="open"]': {
    '&[data-side="top"]': { animationName: slideDownAndFade },
    '&[data-side="right"]': { animationName: slideLeftAndFade },
    '&[data-side="bottom"]': { animationName: slideUpAndFade },
    '&[data-side="left"]': { animationName: slideRightAndFade },
  },
})
