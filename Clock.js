import insert from './lib/Insert.js';
import drawArc from './lib/Draw.js';

export default class Clock {
    constructor(n, d, ctx) {
        this.name = n;
        this.duration = d;
        this.ctx = ctx;
        this.limits = [
            { l: 0.5, c: '#1d1cf4', n: 'Heeeello' , cb: function() {console.log ('fini')}},
            { l: 1.0, c: '#141414', n: 'Default' , cb: function() {console.log ('fini')}},
        ]

        this.ctx.lineWidth = 2;
        this.previousStep = null;
        this.updateId = null;
        drawArc('#000', 0, 2 * Math.PI, this.ctx);
    }

    // Lance l'horloge
    start() {
        this.startTime = Date.now();
        this.finishTime = this.startTime + 60000 * this.duration;
        this.update();
    }
    pause() {
        window.cancelAnimationFrame(this.updateId);
        this.startPause = Date.now();
    }
    continue() {
        let diff = Date.now() - this.startPause;
        this.finishTime += diff;
        this.startTime += diff;
        this.previousStep += diff;
        this.updateId = requestAnimationFrame(() => {
            this.update();
        });
    }
    update() {
        const timestamp = Date.now();
        const p = this.progression(timestamp);
        if (p <= 1) {
            let delay = this.previousStep ? p - this.progression(this.previousStep) : 0;
            this.previousStep = timestamp;
            this.progress(p, delay);
            this.updateId = requestAnimationFrame(() => {
                this.update();
            });
        } else if (p > 1) {
            this.ctx.clearRect(150, 150, 200, 200);
            this.ctx.font = "30px Verdana";
            this.ctx.textAlign = "center";
            this.ctx.fillText('Fini', 250, 262);
        }
    }
    addLimit(t, c, n) {
        return insert({ l: t, c, n }, this.limits);
    }
    editLimit(i, t, c, n) {
        this.limits[i] = { t, c, n };
        return this.limits;
    }
    removeLimit(i) {
        this.limits.splice(i, 1);
        return this.limits;
    }
    draw(r, l, p) {
        if (r > l.l) {
            drawArc(l.c, p, l.l, this.ctx);
        } else {
            drawArc(l.c, p, r, this.ctx);

            this.ctx.fillStyle = l.c;
            this.ctx.font = "30px Verdana";
            this.ctx.textAlign = "center";
            this.ctx.fillText(l.n, 250, 262);
        }
    }

    progression(d) {
        return (d - this.startTime) / (this.finishTime - this.startTime);
    }

    // TODO: Evaluer la progression pour permettre l'ajout d'action lors de l'atteinte des limites
    progress(r, d) {
        this.ctx.lineWidth = 25;
        let previousLimit = 0;
        this.ctx.clearRect(0, 0, 500, 500); // Devrait sortir tout ce qui touche à l'affichage de la logique pour laisser la possibilité de changer l'affichage à l'utilisateur
        for (let l of this.limits) {
            if (r >= l.l && (r - d) < l.l) {
                l.cb();
            }
            if (r < l.l) {
                this.draw(r, l, previousLimit);
                break;
            } else {
                this.draw(r, l, previousLimit);
                previousLimit = l.l;
            }
        }
    }
};