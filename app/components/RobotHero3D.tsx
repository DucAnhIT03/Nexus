'use client';

import React from 'react';

// ============================================================
// ROBOT HERO — Animated image + CSS satellite orbits
// ============================================================

const GLOBAL_CSS = `
@keyframes robotFloat {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-14px) scale(1.01); }
}
@keyframes glowPulse {
  0%, 100% { filter: drop-shadow(0 0 20px rgba(34,211,238,0.3)) drop-shadow(0 0 60px rgba(99,102,241,0.15)); }
  50% { filter: drop-shadow(0 0 40px rgba(34,211,238,0.55)) drop-shadow(0 0 80px rgba(99,102,241,0.3)); }
}
@keyframes orbitSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes orbitSpinReverse {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}
@keyframes satPulse {
  0%, 100% { transform: scale(1); opacity: 0.85; }
  50% { transform: scale(1.5); opacity: 1; }
}
@keyframes scanLine {
  0% { top: -15%; opacity: 0; }
  5% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: 110%; opacity: 0; }
}
@keyframes scanLineReverse {
  0% { top: 110%; opacity: 0; }
  5% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: -15%; opacity: 0; }
}
@keyframes scanGlowPulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}
@keyframes particleDrift {
  0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
  25% { transform: translateY(-18px) translateX(10px); opacity: 0.7; }
  50% { transform: translateY(-30px) translateX(-8px); opacity: 0.4; }
  75% { transform: translateY(-12px) translateX(14px); opacity: 0.8; }
}
.robot-hero-float {
  animation: robotFloat 5s ease-in-out infinite, glowPulse 3s ease-in-out infinite;
}
.orbit-ring {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.orbit-ring .satellite {
  position: absolute;
  border-radius: 50%;
}
`;

// Satellite orbit configuration
const ORBITS = [
  { size: 460, duration: 10, direction: 'normal',  color: '#22d3ee', satSize: 12, borderColor: 'rgba(34,211,238,0.15)', trailColor: 'rgba(34,211,238,0.5)' },
  { size: 370, duration: 8,  direction: 'reverse', color: '#a78bfa', satSize: 10, borderColor: 'rgba(167,139,250,0.12)', trailColor: 'rgba(167,139,250,0.45)' },
  { size: 300, duration: 6,  direction: 'normal',  color: '#60a5fa', satSize: 8,  borderColor: 'rgba(96,165,250,0.10)', trailColor: 'rgba(96,165,250,0.4)' },
  { size: 530, duration: 14, direction: 'reverse', color: '#f0abfc', satSize: 9,  borderColor: 'rgba(240,171,252,0.08)', trailColor: 'rgba(240,171,252,0.35)' },
  { size: 410, duration: 11, direction: 'normal',  color: '#34d399', satSize: 7,  borderColor: 'rgba(52,211,153,0.08)', trailColor: 'rgba(52,211,153,0.35)' },
];

// Particles config
const PARTICLES = [
  { top: '18%', left: '12%', size: 4, delay: 0 },
  { top: '30%', left: '82%', size: 3, delay: 1.2 },
  { top: '62%', left: '8%',  size: 5, delay: 0.6 },
  { top: '72%', left: '88%', size: 3, delay: 2.1 },
  { top: '12%', left: '68%', size: 4, delay: 1.7 },
  { top: '48%', left: '4%',  size: 3, delay: 3.0 },
  { top: '82%', left: '42%', size: 4, delay: 0.9 },
  { top: '22%', left: '92%', size: 3, delay: 2.5 },
  { top: '55%', left: '22%', size: 5, delay: 1.3 },
  { top: '40%', left: '62%', size: 3, delay: 0.4 },
];

export function RobotHeroCanvas() {
  return (
    <>
      {/* Inject global keyframes */}
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />

      <div style={{
        position: 'relative', width: '100%', height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>

        {/* Background ambient glow */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at 50% 55%, rgba(34,211,238,0.08) 0%, transparent 60%)',
        }} />

        {/* ===== SATELLITE ORBITS ===== */}
        {ORBITS.map((orbit, i) => (
          <div
            key={`orbit-${i}`}
            className="orbit-ring"
            style={{
              width: orbit.size, height: orbit.size,
              top: '50%', left: '50%',
              marginTop: -(orbit.size / 2), marginLeft: -(orbit.size / 2),
              border: `1.5px solid ${orbit.borderColor}`,
              animation: `${orbit.direction === 'reverse' ? 'orbitSpinReverse' : 'orbitSpin'} ${orbit.duration}s linear infinite`,
            }}
          >
            {/* Main satellite dot — placed at the top center of the ring */}
            <div
              className="satellite"
              style={{
                width: orbit.satSize, height: orbit.satSize,
                top: -(orbit.satSize / 2), left: '50%',
                marginLeft: -(orbit.satSize / 2),
                background: orbit.color,
                boxShadow: `0 0 ${orbit.satSize}px ${orbit.color}, 0 0 ${orbit.satSize * 2.5}px ${orbit.color}`,
                animation: `satPulse ${1.5 + i * 0.3}s ease-in-out ${i * 0.4}s infinite`,
              }}
            />
            {/* Trail glow behind satellite */}
            <div style={{
              position: 'absolute',
              width: orbit.satSize * 3, height: orbit.satSize * 0.7,
              top: -(orbit.satSize * 0.35),
              left: `calc(50% - ${orbit.satSize * 2}px)`,
              borderRadius: '50%',
              background: `linear-gradient(90deg, transparent, ${orbit.trailColor})`,
              filter: 'blur(3px)',
            }} />
            {/* Optional second satellite on opposite side */}
            {i % 2 === 0 && (
              <div
                className="satellite"
                style={{
                  width: orbit.satSize * 0.6, height: orbit.satSize * 0.6,
                  bottom: -(orbit.satSize * 0.3), left: '50%',
                  marginLeft: -(orbit.satSize * 0.3),
                  background: orbit.color,
                  opacity: 0.5,
                  boxShadow: `0 0 ${orbit.satSize * 0.6}px ${orbit.color}`,
                  animation: `satPulse ${2 + i * 0.2}s ease-in-out ${i * 0.6}s infinite`,
                }}
              />
            )}
          </div>
        ))}

        {/* Floating particles */}
        {PARTICLES.map((p, i) => (
          <div
            key={`p-${i}`}
            style={{
              position: 'absolute',
              top: p.top, left: p.left,
              width: p.size, height: p.size,
              borderRadius: '50%',
              backgroundColor: '#22d3ee',
              boxShadow: '0 0 6px rgba(34,211,238,0.6)',
              pointerEvents: 'none',
              animation: `particleDrift ${5 + i * 0.5}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}

        {/* Brain glow behind robot */}
        <div style={{
          position: 'absolute', pointerEvents: 'none',
          width: 220, height: 220,
          top: '28%', left: '58%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(34,211,238,0.2) 0%, rgba(99,102,241,0.1) 40%, transparent 70%)',
          borderRadius: '50%',
        }} />

        {/* ===== ROBOT IMAGE ===== */}
        <div className="robot-hero-float" style={{
          position: 'relative', zIndex: 10,
          maxWidth: '95%', maxHeight: '95%',
        }}>
          <img
            src="/images/ai-robot-hero.png"
            alt="AI Robot"
            style={{
              width: '100%', height: '100%',
              objectFit: 'contain',
              maxHeight: 480,
              WebkitMaskImage: 'radial-gradient(ellipse 85% 85% at 50% 45%, black 50%, transparent 80%)',
              maskImage: 'radial-gradient(ellipse 85% 85% at 50% 45%, black 50%, transparent 80%)',
            }}
          />
        </div>

        {/* ===== SCAN BEAM (Primary — top to bottom) ===== */}
        <div style={{
          position: 'absolute', left: 0, right: 0, height: 3,
          pointerEvents: 'none', zIndex: 20,
          background: 'linear-gradient(90deg, transparent 5%, rgba(34,211,238,0.9) 30%, rgba(129,230,255,1) 50%, rgba(34,211,238,0.9) 70%, transparent 95%)',
          boxShadow: '0 0 20px 4px rgba(34,211,238,0.7), 0 0 60px 10px rgba(34,211,238,0.3), 0 0 100px 20px rgba(99,102,241,0.15)',
          animation: 'scanLine 3s ease-in-out infinite',
        }} />

        {/* Wide glow halo behind main scan line */}
        <div style={{
          position: 'absolute', left: '-10%', right: '-10%', height: 60,
          pointerEvents: 'none', zIndex: 19,
          background: 'linear-gradient(180deg, transparent 0%, rgba(34,211,238,0.12) 30%, rgba(34,211,238,0.25) 50%, rgba(34,211,238,0.12) 70%, transparent 100%)',
          filter: 'blur(8px)',
          animation: 'scanLine 3s ease-in-out infinite',
        }} />

        {/* Trailing afterglow */}
        <div style={{
          position: 'absolute', left: '-5%', right: '-5%', height: 120,
          pointerEvents: 'none', zIndex: 18,
          background: 'linear-gradient(180deg, transparent 0%, rgba(99,102,241,0.06) 40%, rgba(34,211,238,0.10) 60%, transparent 100%)',
          filter: 'blur(16px)',
          animation: 'scanLine 3s ease-in-out infinite',
        }} />

        {/* ===== SCAN BEAM (Secondary — bottom to top, delayed) ===== */}
        <div style={{
          position: 'absolute', left: 0, right: 0, height: 2,
          pointerEvents: 'none', zIndex: 20,
          background: 'linear-gradient(90deg, transparent 10%, rgba(167,139,250,0.6) 35%, rgba(200,180,255,0.85) 50%, rgba(167,139,250,0.6) 65%, transparent 90%)',
          boxShadow: '0 0 15px 3px rgba(167,139,250,0.5), 0 0 50px 8px rgba(167,139,250,0.2)',
          animation: 'scanLineReverse 3.5s ease-in-out 1.5s infinite',
        }} />

        {/* Secondary glow halo */}
        <div style={{
          position: 'absolute', left: '-5%', right: '-5%', height: 40,
          pointerEvents: 'none', zIndex: 19,
          background: 'linear-gradient(180deg, transparent 0%, rgba(167,139,250,0.1) 40%, rgba(167,139,250,0.18) 55%, transparent 100%)',
          filter: 'blur(6px)',
          animation: 'scanLineReverse 3.5s ease-in-out 1.5s infinite',
        }} />

        {/* Bottom reflection */}
        <div style={{
          position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
          width: '60%', height: 40, pointerEvents: 'none',
          background: 'radial-gradient(ellipse, rgba(34,211,238,0.12) 0%, transparent 70%)',
          filter: 'blur(8px)',
        }} />

      </div>
    </>
  );
}
