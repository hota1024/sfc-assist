import { styled } from '@/stitches.config'

const Backdrop = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'fixed',
  zIndex: 998,
  inset: 0,
  background: 'rgba(0, 0, 0, 0.6)',
  transition: 'all 160ms ease-in-out',
  variants: {
    visible: {
      true: {
        opacity: 1,
      },
      false: {
        pointerEvents: 'none',
        opacity: 0,
      },
    },
  },
})

const DialogRoot = styled('div', {
  position: 'fixed',
  zIndex: 999,
  maxWidth: '700px',
  width: 'calc(100% - 64px)',
  background: '$backgroundColor',
  borderRadius: '$2',
  transition: 'all 160ms ease-in-out',
  variants: {
    open: {
      true: {
        transform: 'scale(1)',
      },
      false: {
        transform: 'scale(0.9)',
      },
    },
  },
})

export const DialogHeader = styled('div', {
  padding: '$4',
})

export const DialogTitle = styled('h2', {})

export const DialogContent = styled('div', {
  padding: '$4',
})

/**
 * Dialog props.
 */
export type DialogProps = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

/**
 * Dialog component.
 */
export const Dialog: React.VFC<DialogProps> = (props) => {
  const { open, onClose, children } = props

  return (
    <>
      <Backdrop visible={open} onClick={() => onClose()}>
        <DialogRoot open={open} onClick={(e) => e.stopPropagation()}>
          {children}
        </DialogRoot>
      </Backdrop>
    </>
  )
}
