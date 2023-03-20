import { ReactNode } from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { styled } from '@/stitches.config'

/**
 * Select props.
 */
export type SelectProps = {
  slots: {
    trigger: ReactNode
  }
}

/**
 * Select component.
 */
export const Select: React.VFC<SelectProps> = (props) => {
  return (
    <SelectPrimitive.Root>
      <SelectPrimitive.Trigger asChild>
        {/* {props.slots.trigger} */}
        <SelTrigger>
          <span>test</span>
        </SelTrigger>
      </SelectPrimitive.Trigger>
      {/* <SelectTrigger>
        <SelectPrimitive.Value placeholder="test" />
      </SelectTrigger> */}
      {/* <SelectPrimitive.Portal> */}
      <SelectContent asChild>
        <div
          style={{
            position: 'relative',
            width: 200,
            height: 48,
            background: 'white',
          }}
        ></div>
        {/* <SelectViewport>testtt</SelectViewport> */}
      </SelectContent>
      {/* </SelectPrimitive.Portal> */}
    </SelectPrimitive.Root>
  )
}

const SelTrigger = styled('button', {
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  boxSizing: 'border-box',
  background: '#2a2a2a',
  padding: 16,
  fontSize: 16,
  fontFamily: 'sans-serif',
  border: '1px solid #1b1b1b',
  borderRadius: 4,
  outline: 'none',
  color: '#fff',
  variants: {
    error: {
      true: {
        borderColor: '#df6c75',
      },
    },
  },
})

const SelectTrigger = styled(SelectPrimitive.SelectTrigger, {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '0 15px',
  fontSize: 13,
  lineHeight: 1,
  height: 35,
  gap: 5,
  backgroundColor: 'white',
  // color: violet.violet11,
  // boxShadow: `0 2px 10px ${blackA.blackA7}`,
  // '&:hover': { backgroundColor: mauve.mauve3 },
  // '&:focus': { boxShadow: `0 0 0 2px black` },
  // '&[data-placeholder]': { color: violet.violet9 },
})

const SelectContent = styled(SelectPrimitive.Content, {
  // zIndex: 999999,
  overflow: 'hidden',
  backgroundColor: 'white',
  borderRadius: 6,
  boxShadow:
    '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
})

const SelectViewport = styled(SelectPrimitive.Viewport, {
  padding: 5,
})
