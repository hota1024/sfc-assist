import { styled } from '@/stitches.config'
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'

export const ToggleGroup = styled(ToggleGroupPrimitive.Root, {
  display: 'inline-flex',
  borderRadius: 4,
})

export const ToggleGroupItem = styled(ToggleGroupPrimitive.Item, {
  all: 'unset',
  backgroundColor: '$blueAlpha',
  // height: 40,
  // width: 35,
  padding: '$3',
  display: 'flex',
  fontSize: 15,
  lineHeight: 1,
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 1,
  transition: 'all 120ms ease-in-out',
  cursor: 'pointer',
  '&:first-child': {
    marginLeft: 0,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  '&:last-child': { borderTopRightRadius: 4, borderBottomRightRadius: 4 },
  '&:hover': { backgroundColor: '$blueDark' },
  '&[data-state=on]': {
    background: '$blue',
  },
  '&:focus': { position: 'relative', boxShadow: `0 0 0 2px black` },
})
