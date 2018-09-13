import { EventBus } from './event';

interface MarkSpec {
    maxContentLength:number;
    minContentLength:number;
    textCount:number;
}

export type MarkSpecNames = keyof MarkSpec;

export class Handler {
    public url:string;
    public timers:{[name:string]:number[]} = {};
    public events:{[name:string]:EventBus<any>} = {};
    public contents:string[] = [];
    public spec:MarkSpec = {
        maxContentLength: 10000,
        minContentLength: 10000,
        textCount: 20,
    };
    public statusEl:HTMLSpanElement = document.createElement('span');
    
    constructor () {
        this.url = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;
        (window as any).handler = this;
    }

    public addTimer (name:string) {
        this.timers[name] = [];
    }

    public genText (wordCount:number) {
        let text = "";
        const alphabet = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,r,s,t,u,v,w,x,y,z".split(",");
        for(let i = 0; i < wordCount; i++) {
            let rand = 0;
            for (let x = 0; x < 7; x++) {
            rand = Math.floor(Math.random() * alphabet.length);
            text += alphabet[rand];
          }
          if (i < wordCount-1)
            text += " ";
          else
            text += ".";
        }
        return text;
    }

    public startGenContents (action?:() => void) {
        const { statusEl } = this;
        statusEl.innerText = 'start';
        const { textCount, maxContentLength, minContentLength } = this.spec;
        let i = 0; 
        const t = setInterval(() => {
            if ( i >= textCount ) {
                end();
                return;
            }
            statusEl.innerText = '' + (i + 1);
            const wordCount = getRandomInt(minContentLength, maxContentLength);
            const text = this.genText(wordCount);
            this.contents.push(text);
            action && action(); 
            i ++;
        }, 300)

        const end = () => {
            clearInterval(t);
            const projs = Object.keys(this.timers);
            let result = '';
            for (let j = 0; j < projs.length; j ++) {
                const proj = projs[j];
                result += `${proj}:${this.timers[proj].join(',\t')}ms\n`;
            }
            statusEl.innerText = result;
        }

        (window as any).stop = end;
    }
}

function getRandomInt (min:number, max:number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}