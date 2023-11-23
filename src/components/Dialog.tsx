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
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, 0.5)',
  backdropFilter: 'blur(32px)',
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
    fitContent: {
      true: {
        height: 'fit-content',
      },
    },
  },
  '@md': {
    background: '$backgroundColor',
    borderRadius: '$2',
    maxWidth: '700px',
    width: 'calc(100% - 32px)',
    height: 'calc(100% - 128px)',
  },
})

export const DialogHeader = styled('div', {
  padding: '$4',
})

export const DialogTitle = styled('h2', {})

export const DialogContent = styled('div', {
  padding: '$4',
  height: '100%',
})

/**
 * Dialog props.
 */
export type DialogProps = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  fitContent?: boolean
}

/**
 * Dialog component.
 */
export const Dialog: React.VFC<DialogProps> = (props) => {
  const { open, onClose, children, fitContent } = props

  return (
    <>
      <Backdrop visible={open} onClick={() => onClose()}>
        <DialogRoot
          open={open}
          onClick={(e) => e.stopPropagation()}
          fitContent={fitContent}
        >
          {children}
        </DialogRoot>
      </Backdrop>
    </>
  )
}
