# Type Patterns - Physics Simulation Framework

## Overview
This document defines the reusable and customizable components for each simulation type, enabling efficient scaling of physics education tools.

---

## Type 1: Kinematics & Motion

### Reusable Components
Core kinematic equations (v = v₀ + at, x = x₀ + v₀t + ½at²), frame-based animation loop updating position from velocity and acceleration, trajectory path visualization with coordinate system, time-step integration methods, data logging for position/velocity/time series, control panel UI with play/pause/reset buttons, parameter sliders for initial conditions (v₀, angle, height).

### Customizable Elements
Variable labels (height vs distance, launch angle vs drop height), visualization style (parabolic arc vs vertical line, ball vs rocket sprite), context-specific ranges (ball: 0-30m, rocket: 0-1000m), educational narrative (sports physics vs space travel), graph y-axis labels (altitude, horizontal distance, etc.).

### Scale Example
**Type: Kinematics & Motion.** One physics engine powers: projectile motion, free fall, ball throw, cannon trajectory, cliff drop, rocket launch, car acceleration. Build 1st simulator = 4.5 hours (engine + UI + visuals). Build 2nd = 1.5 hours (change visuals/labels). Build 5th = 25 minutes (swap parameters only).

---

## Type 2: Force & Dynamics

### Reusable Components
Vector force summation algorithm (ΣF = ma), force diagram visualization with arrows, mass-acceleration calculation loop, collision detection framework, multi-object interaction handler, force magnitude/direction display, data export for force vs time, common UI controls for mass/force/angle parameters.

### Customizable Elements
Force types shown (friction + normal vs tension + weight), object representations (block on incline vs hanging mass), scenario complexity (single object vs pulley system), force color coding schemes, educational focus (horizontal forces vs inclined planes), numerical ranges for realistic scenarios.

### Scale Example
**Type: Force & Dynamics.** One dynamics solver handles: block sliding with friction, object on incline, pulley systems, collision responses, Newton's cradle, elevator acceleration. Build 1st = 5 hours (vector math + force visualization). Build 3rd = 1 hour (configure force types). Build 7th = 20 minutes (adjust scenario).

---

## Type 3: Energy & Conservation

### Reusable Components
Energy state calculator (KE = ½mv², PE = mgh), conservation equation validator (E_initial = E_final), work integral computation (W = F·d), energy bar chart visualization, transformation animation (PE → KE conversion), efficiency calculation module, energy flow diagram generator, shared data logger for energy states over time.

### Customizable Elements
Energy types emphasized (gravitational PE vs elastic PE), transformation pathway (linear vs cyclical like pendulum), object context (roller coaster vs falling object), height reference point selection, visualization metaphor (bar chart vs flow diagram vs pie chart), educational narrative focus (mechanical advantage vs efficiency).

### Scale Example
**Type: Energy & Conservation.** One energy framework supports: roller coaster physics, pendulum swing, spring compression, hydroelectric simulation, pile driver, ski slope. Build 1st = 4 hours (energy calculations + visualizations). Build 4th = 45 minutes (specify energy types). Build 8th = 15 minutes (theme swap).

---

## Type 4: Pressure & Fluids

### Reusable Components
Pressure calculation engine (P = F/A, P = ρgh), fluid density database, depth-pressure relationship grapher, buoyancy force calculator (F_b = ρVg), hydraulic force multiplier (Pascal's principle: F₁/A₁ = F₂/A₂), pressure distribution visualizer with color gradients, force vector display on surfaces, common controls for depth/density/area.

### Customizable Elements
Fluid type (water, oil, air, mercury - affects density), container geometry (column, tank, hydraulic cylinder), depth visualization (side view with gradient vs top-down), application context (submarine depth vs hydraulic jack vs dam), pressure units (Pa, atm, psi), force application points (piston, submerged object).

### Scale Example
**Type: Pressure & Fluids.** One pressure engine runs: submarine depth gauge, hydraulic press, dam pressure calculator, buoyancy demonstrator, barometer, diving bell. Build 1st = 3.5 hours (pressure algorithms + fluid visuals). Build 3rd = 1 hour (change fluid/geometry). Build 6th = 30 minutes (parameter tuning).

---

## Summary

Each type pattern follows the principle: **Build the engine once, customize infinitely.** The reusable components represent the invariant physics and software architecture, while customizable elements allow for diverse educational contexts and visual presentations without rebuilding core functionality.