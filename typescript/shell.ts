// shell utilities on top of r2pipe

import { R2Papi } from "./index.js";

export class R2PapiShell {
	public rp: R2Papi;

	constructor(papi: R2Papi) {
		this.rp = papi;
	}

	mkdir(file: string, recursive?:boolean): boolean {
		if (recursive === true) {
			this.rp.call (`mkdir -p ${file}`);
		} else {
			this.rp.call (`mkdir ${file}`);
		}
		return true;
	}
	unlink(file: string): boolean {
		this.rp.call (`rm ${file}`);
		return true;
	}

	chdir(path:string) : boolean {
		this.rp.call (`cd ${path}`);
		return true;
	}

	ls(): string[] {
		return this.rp.call(`ls -q`).trim().split('\n')
	}

	fileExists(path: string) : boolean {
		// TODO
		return false;
	}
	/**
	* Opens an URL or application
	* calls `xdg-open` on linux, `start` on windows, `open` on Mac
 	*/
	open(arg: string): void {
		this.rp.call (`open ${arg}`);
	}

	system(cmd: string): number {
		this.rp.call (`!${cmd}`);
		return 0;
	}

	run(path: string): number {
		this.rp.call (`rm ${path}`);
		return 0;
	}
}
