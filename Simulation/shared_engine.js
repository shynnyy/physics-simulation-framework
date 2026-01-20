/**
 * Shared Physics Engine
 * Common calculation and state management for all simulators
 */

class PhysicsEngine {
    constructor() {
        this.logs = [];
        this.maxLogs = 50;
    }

    // Logging system
    log(action, details) {
        const timestamp = new Date().toISOString();
        const logEntry = {
            timestamp,
            action,
            details: JSON.stringify(details)
        };
        
        this.logs.push(logEntry);
        
        if (this.logs.length > this.maxLogs) {
            this.logs.shift();
        }
        
        return logEntry;
    }

    getRecentLogs(count = 10) {
        return this.logs.slice(-count);
    }

    clearLogs() {
        this.logs = [];
    }

    // Projectile Motion Calculations
    calculateProjectile(angle, velocity, gravity) {
        const rad = (angle * Math.PI) / 180;
        const vx = velocity * Math.cos(rad);
        const vy = velocity * Math.sin(rad);
        
        const timeOfFlight = (2 * vy) / gravity;
        const range = vx * timeOfFlight;
        const maxHeight = (vy * vy) / (2 * gravity);
        
        return {
            vx,
            vy,
            timeOfFlight,
            range,
            maxHeight
        };
    }

    getProjectilePosition(vx, vy, gravity, time) {
        const x = vx * time;
        const y = vy * time - 0.5 * gravity * time * time;
        
        return { x, y };
    }

    // Collision Mechanics Calculations
    calculateCollision(mass1, mass2, velocity1, velocity2, coefficient) {
        // Using coefficient of restitution formula
        const v1f = ((mass1 - coefficient * mass2) * velocity1 + (1 + coefficient) * mass2 * velocity2) / (mass1 + mass2);
        const v2f = ((mass2 - coefficient * mass1) * velocity2 + (1 + coefficient) * mass1 * velocity1) / (mass1 + mass2);
        
        const keBefore = 0.5 * mass1 * velocity1 * velocity1 + 0.5 * mass2 * velocity2 * velocity2;
        const keAfter = 0.5 * mass1 * v1f * v1f + 0.5 * mass2 * v2f * v2f;
        const energyLost = keBefore - keAfter;
        
        const momentumBefore = mass1 * velocity1 + mass2 * velocity2;
        const momentumAfter = mass1 * v1f + mass2 * v2f;
        
        return {
            v1f,
            v2f,
            keBefore,
            keAfter,
            energyLost,
            momentumBefore,
            momentumAfter
        };
    }

    checkCollision(pos1, pos2, radius1, radius2) {
        const distance = Math.abs(pos2 - pos1);
        return distance <= (radius1 + radius2);
    }

    // Utility functions
    clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    lerp(start, end, t) {
        return start + (end - start) * t;
    }

    formatNumber(num, decimals = 2) {
        return Number(num).toFixed(decimals);
    }

    formatTime(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', { 
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }
}

// State Manager for simulators
class StateManager {
    constructor() {
        this.state = {};
        this.listeners = {};
    }

    setState(key, value) {
        const oldValue = this.state[key];
        this.state[key] = value;
        
        if (this.listeners[key]) {
            this.listeners[key].forEach(callback => {
                callback(value, oldValue);
            });
        }
    }

    getState(key) {
        return this.state[key];
    }

    subscribe(key, callback) {
        if (!this.listeners[key]) {
            this.listeners[key] = [];
        }
        this.listeners[key].push(callback);
    }

    reset() {
        this.state = {};
    }
}

// Animation Controller
class AnimationController {
    constructor() {
        this.animationId = null;
        this.isRunning = false;
        this.startTime = null;
        this.pauseTime = null;
        this.callbacks = [];
    }

    start(callback) {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.startTime = Date.now();
        
        const animate = () => {
            if (!this.isRunning) return;
            
            const elapsed = (Date.now() - this.startTime) / 1000;
            
            if (callback) {
                const shouldContinue = callback(elapsed);
                if (shouldContinue === false) {
                    this.stop();
                    return;
                }
            }
            
            this.callbacks.forEach(cb => cb(elapsed));
            this.animationId = requestAnimationFrame(animate);
        };
        
        animate();
    }

    stop() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    reset() {
        this.stop();
        this.startTime = null;
        this.pauseTime = null;
    }

    addCallback(callback) {
        this.callbacks.push(callback);
    }

    clearCallbacks() {
        this.callbacks = [];
    }
}

// Canvas Renderer Helper
class CanvasRenderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    drawLine(x1, y1, x2, y2, color = '#475569', width = 2) {
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = width;
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
    }

    drawCircle(x, y, radius, fillColor = '#60a5fa', strokeColor = '#ffffff', strokeWidth = 2) {
        this.ctx.fillStyle = fillColor;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fill();
        
        if (strokeColor) {
            this.ctx.strokeStyle = strokeColor;
            this.ctx.lineWidth = strokeWidth;
            this.ctx.stroke();
        }
    }

    drawPath(points, color = '#60a5fa', width = 2) {
        if (points.length < 2) return;
        
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = width;
        this.ctx.beginPath();
        
        points.forEach((point, i) => {
            if (i === 0) {
                this.ctx.moveTo(point.x, point.y);
            } else {
                this.ctx.lineTo(point.x, point.y);
            }
        });
        
        this.ctx.stroke();
    }

    drawArrow(x1, y1, x2, y2, color = '#60a5fa', width = 3) {
        const headlen = 10;
        const dx = x2 - x1;
        const dy = y2 - y1;
        const angle = Math.atan2(dy, dx);
        
        this.ctx.strokeStyle = color;
        this.ctx.fillStyle = color;
        this.ctx.lineWidth = width;
        
        // Draw line
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
        
        // Draw arrow head
        this.ctx.beginPath();
        this.ctx.moveTo(x2, y2);
        this.ctx.lineTo(x2 - headlen * Math.cos(angle - Math.PI / 6), y2 - headlen * Math.sin(angle - Math.PI / 6));
        this.ctx.lineTo(x2 - headlen * Math.cos(angle + Math.PI / 6), y2 - headlen * Math.sin(angle + Math.PI / 6));
        this.ctx.closePath();
        this.ctx.fill();
    }

    drawText(text, x, y, color = '#ffffff', font = '14px Arial', align = 'left') {
        this.ctx.fillStyle = color;
        this.ctx.font = font;
        this.ctx.textAlign = align;
        this.ctx.fillText(text, x, y);
    }
}

// Export for use in simulators
if (typeof window !== 'undefined') {
    window.PhysicsEngine = PhysicsEngine;
    window.StateManager = StateManager;
    window.AnimationController = AnimationController;
    window.CanvasRenderer = CanvasRenderer;
}