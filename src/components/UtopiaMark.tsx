type UtopiaMarkProps = {
  size?: number
  className?: string
}

export function UtopiaMark({ size = 38, className }: UtopiaMarkProps) {
  return (
    <div
      className={className ? `utopia-mark utopia-mark--image ${className}` : 'utopia-mark utopia-mark--image'}
      style={{
        width: size,
        height: size,
      }}
      aria-hidden="true"
    >
      <img
        src="/utopia-mark.png"
        alt=""
        draggable={false}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </div>
  )
}
