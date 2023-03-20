import { styled } from '@/stitches.config'

const AppBarRoot = styled('div', {
  zIndex: 4,
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  top: 0,
  left: 0,
  right: 0,
  height: '64px',
  backdropFilter: 'blur(32px)',
  padding: '0 $6',
})

export const AppBarContent = styled('div', {
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '$4',
})

export const AppBarActions = styled('div', {
  display: 'flex',
  gap: '$4',
})

export const AppBarTitle = styled('h1', {
  fontSize: '1rem',
  fontWeight: 'bold',
})

export const AppBarSubTitle = styled('h2', {
  color: 'rgba(255, 255, 255, 0.4)',
  fontSize: '0.8rem',
  fontWeight: 'bold',
})

/**
 * AppBar props.
 */
export type AppBarProps = {
  children?: React.ReactNode
}

/**
 * AppBar component.
 */
export const AppBar: React.VFC<AppBarProps> = (props) => {
  return (
    <>
      <AppBarRoot>{props.children}</AppBarRoot>
    </>
  )
}
