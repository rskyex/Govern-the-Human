'use client'

import type { CSSProperties } from 'react'

/* ━━━ Glass Plane ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

interface GlassPlaneProps {
  w?: number
  h?: number
  rx?: number
  ry?: number
  opacity?: number
  borderOpacity?: number
  blur?: number
  radius?: number
  tint?: string
  className?: string
  animation?: string
  duration?: string
  style?: CSSProperties
}

export function GlassPlane({
  w = 400,
  h = 300,
  rx = 12,
  ry = -8,
  opacity = 0.18,
  borderOpacity = 0.1,
  blur = 16,
  radius = 24,
  tint = '235,239,248',
  className = '',
  animation = 'tilt-drift',
  duration = '28s',
  style = {},
}: GlassPlaneProps) {
  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
      style={{
        width: w,
        height: h,
        background: `rgba(${tint},${opacity})`,
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        border: `1px solid rgba(180,191,206,${borderOpacity})`,
        borderRadius: radius,
        boxShadow: `0 8px 40px rgba(91,164,201,0.03), inset 0 1px 0 rgba(255,255,255,${opacity * 1.5})`,
        ['--rx' as string]: `${rx}deg`,
        ['--ry' as string]: `${ry}deg`,
        animation: `${animation} ${duration} ease-in-out infinite`,
        ...style,
      }}
    />
  )
}

/* ━━━ Glass Sphere ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

interface GlassSphereProps {
  size?: number
  tint?: string
  highlightOffset?: string
  className?: string
  animation?: string
  duration?: string
  glowColor?: string
  style?: CSSProperties
}

export function GlassSphere({
  size = 240,
  tint = '91,164,201',
  highlightOffset = '32% 28%',
  className = '',
  animation = 'float-1',
  duration = '24s',
  glowColor = '91,164,201',
  style = {},
}: GlassSphereProps) {
  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: `
          radial-gradient(circle at ${highlightOffset}, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.1) 30%, transparent 60%),
          radial-gradient(circle at 50% 50%, rgba(${tint},0.06) 0%, rgba(${tint},0.02) 60%, transparent 100%)
        `,
        border: '1px solid rgba(180,191,206,0.1)',
        boxShadow: `
          inset 0 -20px 40px rgba(${tint},0.04),
          inset 0 2px 20px rgba(255,255,255,0.15),
          0 20px 60px rgba(${glowColor},0.06),
          0 4px 16px rgba(${glowColor},0.03)
        `,
        animation: `${animation} ${duration} ease-in-out infinite`,
        ...style,
      }}
    />
  )
}

/* ━━━ Glass Disc ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

interface GlassDiscProps {
  diameter?: number
  thickness?: number
  rx?: number
  ry?: number
  opacity?: number
  tint?: string
  className?: string
  animation?: string
  duration?: string
  style?: CSSProperties
}

export function GlassDisc({
  diameter = 320,
  thickness = 6,
  rx = 65,
  ry = 0,
  opacity = 0.25,
  tint = '235,239,248',
  className = '',
  animation = 'float-2',
  duration = '26s',
  style = {},
}: GlassDiscProps) {
  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
      style={{
        width: diameter,
        height: diameter,
        borderRadius: '50%',
        background: `radial-gradient(ellipse at 40% 35%, rgba(255,255,255,0.3) 0%, rgba(${tint},${opacity}) 50%, rgba(${tint},${opacity * 0.5}) 100%)`,
        border: '1px solid rgba(180,191,206,0.12)',
        boxShadow: `
          0 ${thickness}px 0 rgba(${tint},${opacity * 0.8}),
          0 ${thickness + 1}px 0 rgba(180,191,206,0.08),
          0 12px 40px rgba(91,164,201,0.04)
        `,
        transform: `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg)`,
        animation: `${animation} ${duration} ease-in-out infinite`,
        ...style,
      }}
    />
  )
}

/* ━━━ Glass Ring / Torus ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

interface GlassRingProps {
  diameter?: number
  tube?: number
  rx?: number
  ry?: number
  tint?: string
  opacity?: number
  className?: string
  animation?: string
  duration?: string
  style?: CSSProperties
}

export function GlassRing({
  diameter = 280,
  tube = 24,
  rx = 55,
  ry = -15,
  tint = '91,164,201',
  opacity = 0.12,
  className = '',
  animation = 'float-3',
  duration = '30s',
  style = {},
}: GlassRingProps) {
  return (
    <div
      className={`pointer-events-none select-none`}
      aria-hidden="true"
      style={{
        width: diameter,
        height: diameter,
        transform: `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg)`,
        animation: `${animation} ${duration} ease-in-out infinite`,
        ...style,
      }}
    >
      <div
        className={className}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          border: `${tube}px solid rgba(${tint},${opacity})`,
          boxShadow: `
            inset 0 0 20px rgba(${tint},${opacity * 0.5}),
            0 0 30px rgba(${tint},${opacity * 0.3}),
            inset 0 -4px 12px rgba(255,255,255,0.08)
          `,
          background: 'transparent',
        }}
      />
    </div>
  )
}

/* ━━━ Nested Chambers (3 concentric cubes) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

interface NestedChambersProps {
  outerSize?: number
  className?: string
  style?: CSSProperties
}

function CubeFace({
  size,
  face,
  opacity,
  borderOpacity,
  tint = '235,239,248',
}: {
  size: number
  face: 'front' | 'back' | 'left' | 'right' | 'top' | 'bottom'
  opacity: number
  borderOpacity: number
  tint?: string
}) {
  const half = size / 2
  const transforms: Record<string, string> = {
    front: `translateZ(${half}px)`,
    back: `translateZ(-${half}px) rotateY(180deg)`,
    left: `translateX(-${half}px) rotateY(-90deg)`,
    right: `translateX(${half}px) rotateY(90deg)`,
    top: `translateY(-${half}px) rotateX(90deg)`,
    bottom: `translateY(${half}px) rotateX(-90deg)`,
  }

  return (
    <div
      style={{
        position: 'absolute',
        width: size,
        height: size,
        left: '50%',
        top: '50%',
        marginLeft: -size / 2,
        marginTop: -size / 2,
        background: `rgba(${tint},${opacity})`,
        border: `1px solid rgba(180,191,206,${borderOpacity})`,
        borderRadius: 4,
        transform: transforms[face],
        backfaceVisibility: 'visible',
      }}
    />
  )
}

function Cube({
  size,
  opacity,
  borderOpacity,
  tint,
  animationDuration,
  animationDirection = 'normal',
}: {
  size: number
  opacity: number
  borderOpacity: number
  tint?: string
  animationDuration: string
  animationDirection?: string
}) {
  const faces: Array<'front' | 'back' | 'left' | 'right' | 'top' | 'bottom'> = [
    'front', 'back', 'left', 'right', 'top', 'bottom',
  ]

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        transformStyle: 'preserve-3d',
        animation: `cube-rotate ${animationDuration} linear infinite ${animationDirection}`,
      }}
    >
      {faces.map((face) => (
        <CubeFace key={face} size={size} face={face} opacity={opacity} borderOpacity={borderOpacity} tint={tint} />
      ))}
    </div>
  )
}

export function NestedChambers({ outerSize = 260, className = '', style = {} }: NestedChambersProps) {
  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
      style={{
        width: outerSize + 40,
        height: outerSize + 40,
        perspective: 900,
        perspectiveOrigin: '50% 45%',
        ...style,
      }}
    >
      {/* Outer */}
      <Cube size={outerSize} opacity={0.04} borderOpacity={0.06} animationDuration="60s" />
      {/* Middle */}
      <Cube
        size={outerSize * 0.65}
        opacity={0.06}
        borderOpacity={0.08}
        tint="220,228,240"
        animationDuration="45s"
        animationDirection="reverse"
      />
      {/* Inner */}
      <Cube
        size={outerSize * 0.35}
        opacity={0.1}
        borderOpacity={0.12}
        tint="200,212,228"
        animationDuration="35s"
      />
    </div>
  )
}

/* ━━━ Glass Monolith (tall rectangular slab) ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

interface GlassMonolithProps {
  w?: number
  h?: number
  rx?: number
  ry?: number
  rz?: number
  opacity?: number
  className?: string
  animation?: string
  duration?: string
  style?: CSSProperties
}

export function GlassMonolith({
  w = 180,
  h = 400,
  rx = 8,
  ry = -12,
  rz = 3,
  opacity = 0.12,
  className = '',
  animation = 'float-1',
  duration = '32s',
  style = {},
}: GlassMonolithProps) {
  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
      style={{
        width: w,
        height: h,
        background: `linear-gradient(175deg, rgba(255,255,255,${opacity * 2}) 0%, rgba(235,239,248,${opacity}) 40%, rgba(220,228,240,${opacity * 0.6}) 100%)`,
        border: '1px solid rgba(180,191,206,0.08)',
        borderRadius: 8,
        boxShadow: `
          0 20px 60px rgba(91,164,201,0.04),
          inset 0 1px 0 rgba(255,255,255,0.2),
          inset 0 -1px 0 rgba(180,191,206,0.06)
        `,
        transform: `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`,
        animation: `${animation} ${duration} ease-in-out infinite`,
        ...style,
      }}
    />
  )
}
