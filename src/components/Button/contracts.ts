export interface ButtonProps {
  children: React.ReactNode
  type: 'primary' | 'secondary'
  onClick: () => void
  disabled?: boolean
}
